import {
  Component,
  effect,
  EventEmitter,
  inject,
  Input,
  OnChanges,
  Output,
  Signal,
  SimpleChanges,
} from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CarEntity, CarStatus } from '../cars.types';
import { ImageDisplayComponent } from '../../common/image-display/image-display.component';
import { ImageEntity } from '../../common/image-display/image-display.types';
import { NgIf } from '@angular/common';
import { UntilDestroy } from '@ngneat/until-destroy';
import { ImageService } from '../../common/image-display/image.service';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { faX } from '@fortawesome/free-solid-svg-icons';
import { BranchesService } from '../../branches/branches.service';
import { BranchEntity } from '../../branches/branches.types';
import { ToastrService } from 'ngx-toastr';
import { UtilityService } from '../../utility/utility.service';
import { CarsService } from '../cars.service';

@UntilDestroy()
@Component({
  selector: 'app-cars-form',
  standalone: true,
  imports: [ReactiveFormsModule, ImageDisplayComponent, NgIf, FaIconComponent],
  templateUrl: './cars-form.component.html',
  styleUrl: './cars-form.component.scss',
})
export class CarsFormComponent implements OnChanges {
  @Input() carEntity: CarEntity;
  @Output() clearCarEntity: EventEmitter<any> = new EventEmitter<any>();
  #formBuilder: FormBuilder = inject(FormBuilder);
  #branchesService: BranchesService = inject(BranchesService);
  #carsService: CarsService = inject(CarsService);
  #imageService: ImageService = inject(ImageService);
  #toastrService: ToastrService = inject(ToastrService);
  #utilityService: UtilityService = inject(UtilityService);
  branches: Signal<BranchEntity[]> = this.#branchesService.getBranches();
  selectedBranchId: Signal<number> =
    this.#branchesService.getSelectedBranchId();
  imageEntity: Signal<ImageEntity> = this.#imageService.getUploadedImage();

  carForm: FormGroup = this.#formBuilder.group({
    brand: ['', [Validators.required]],
    model: ['', [Validators.required]],
    year: ['', [Validators.required]],
    color: ['', [Validators.required]],
    status: ['', [Validators.required]],
    rental_per_day: ['', [Validators.required]],
    branch_id: ['', [Validators.required]],
    image_id: ['', [Validators.required]],
  });

  constructor() {
    effect(() => {
      if (this.imageEntity()) {
        this.carForm.get('image_id').setValue(this.imageEntity().id);
      }
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (!!changes?.carEntity?.currentValue) {
      this.carForm.addControl('car_id', new FormControl(''));
      this.carForm.get('car_id').disable();
      this.carForm.patchValue(this.carEntity);

      const branchIdControl: AbstractControl = this.carForm.get('branch_id');
      branchIdControl.setValue(this.selectedBranchId());
      branchIdControl.disable();
      this.carForm.get('image_id').setValue(this.carEntity.image.id);
      this.#imageService.setUploadedImage(this.carEntity.image);
    } else {
      this.carForm.get('branch_id').enable();
      this.carForm.removeControl('car_id');
    }
  }

  resetCarEntity() {
    this.clearCarEntity.emit();
    this.carForm.reset();
    this.carForm.get('branch_id').enable();
    this.#imageService.setUploadedImage(null);
    this.resetImage();
  }

  handleCarFormSubmit() {
    const hasErrors: boolean = Object.keys(this.carForm.controls)?.some(
      (key: string) => {
        if (this.carForm.controls[key].errors) {
          this.#toastrService.error(
            `Error creating Car \n ${this.#utilityService.generateErrorMessageFromObject(key, this.carForm.controls[key].errors)}`,
          );

          return true;
        }
      },
    );

    if (hasErrors) return;

    const carEntity: CarEntity = {
      brand: this.carForm.get('brand').value,
      model: this.carForm.get('model').value,
      year: this.carForm.get('year').value,
      color: this.carForm.get('color').value,
      status: this.carForm.get('status').value,
      rental_per_day: this.carForm.get('rental_per_day').value,
      branch_id: this.carForm.get('branch_id').value,
      image: {
        id: this.carForm.get('image_id').value,
      },
    };

    if (this.carEntity) {
      this.#carsService.updateCar(this.carForm.get('car_id').value, carEntity);
    } else {
      this.#carsService.createCar(carEntity);
    }

    this.#branchesService.selectBranchId(this.carForm.get('branch_id').value);
    this.resetCarEntity();
  }

  fileChangeEvent(e: Event) {
    const target = e.target as HTMLInputElement;
    const file = target?.files?.[0];

    if (!file) return;
    const formData = new FormData();
    formData.append('image', file);
    this.#imageService.uploadImage(formData);
  }

  resetImage(): void {
    this.#imageService.clearUploadedImage();
  }

  get status(): AbstractControl {
    return this.carForm.get('status');
  }

  protected readonly CarStatus = CarStatus;
  protected readonly faX = faX;
}
