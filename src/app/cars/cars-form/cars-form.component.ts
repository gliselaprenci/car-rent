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
    productionYear: ['', [Validators.required]],
    colour: ['', [Validators.required]],
    status: ['', [Validators.required]],
    rentalPerDay: ['', [Validators.required]],
    branchId: ['', [Validators.required]],
    imageId: ['', [Validators.required]],
  });

  constructor() {
    effect(() => {
      if (this.imageEntity()) {
        this.carForm.get('imageId').setValue(this.imageEntity().imageId);
      }
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (!!changes?.carEntity?.currentValue) {
      this.carForm.addControl('carId', new FormControl(''));
      this.carForm.get('carId').disable();
      this.carForm.patchValue(this.carEntity);

      const branchIdControl: AbstractControl = this.carForm.get('branchId');
      branchIdControl.setValue(this.selectedBranchId());
      branchIdControl.disable();
      this.carForm.get('imageId').setValue(this.carEntity.image.imageId);
      this.#imageService.setUploadedImage(this.carEntity.image);
    } else {
      this.carForm.get('branchId').enable();
      this.carForm.removeControl('carId');
    }
  }

  resetCarEntity() {
    this.clearCarEntity.emit();
    this.carForm.reset();
    this.carForm.get('branchId').enable();
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
      productionYear: this.carForm.get('productionYear').value,
      colour: this.carForm.get('colour').value,
      status: this.carForm.get('status').value,
      rentalPerDay: this.carForm.get('rentalPerDay').value,
      branchId: this.carForm.get('branchId').value,
      image: {
        imageId: this.carForm.get('imageId').value,
      },
    };

    if (this.carEntity) {
      this.#carsService.updateCar(this.carForm.get('carId').value, carEntity);
    } else {
      this.#carsService.createCar(carEntity);
    }

    this.#branchesService.selectBranchId(this.carForm.get('branchId').value);
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
