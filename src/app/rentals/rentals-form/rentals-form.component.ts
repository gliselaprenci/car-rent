import {
  Component,
  inject,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { RentalEntity } from '../rentals.types';
import { RentalsService } from '../rentals.service';
import { ToastrService } from 'ngx-toastr';
import { UtilityService } from '../../utility/utility.service';

@Component({
  selector: 'app-rentals-form',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './rentals-form.component.html',
  styleUrl: './rentals-form.component.scss',
})
export class RentalsFormComponent implements OnInit, OnChanges {
  @Input() rentalEntity: RentalEntity;
  #formBuilder: FormBuilder = inject(FormBuilder);
  #rentalsService: RentalsService = inject(RentalsService);
  #toastrService: ToastrService = inject(ToastrService);
  #utilityService: UtilityService = inject(UtilityService);

  rentalForm: FormGroup = this.#formBuilder.group({
    name: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
    owner: ['', [Validators.required]],
  });

  ngOnInit() {
    if (this.rentalEntity) {
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes?.rentalEntity?.currentValue !== null) {
      this.rentalForm.addControl('rental_id', new FormControl(''));
      this.rentalForm.get('rental_id').disable();
      this.rentalForm.patchValue(this.rentalEntity);
    } else {
      this.rentalForm.removeControl('rental_id');
    }
  }

  clearRentalEntity() {
    this.rentalEntity = null;
  }

  handleRentalFormSubmit() {
    const hasErrors: boolean = Object.keys(this.rentalForm.controls)?.some(
      (key: string) => {
        if (this.rentalForm.controls[key].errors) {
          this.#toastrService.error(
            `Error creating Rental \n ${this.#utilityService.generateErrorMessageFromObject(key, this.rentalForm.controls[key].errors)}`,
          );

          return true;
        }
      },
    );

    if (hasErrors) return;

    const rentalEntity: RentalEntity = {
      email: this.rentalForm.get('email').value,
      name: this.rentalForm.get('name').value,
      owner: this.rentalForm.get('owner').value,
    };

    if (this.rentalEntity) {
      this.#rentalsService.updateRental(
        this.rentalForm.get('rental_id').value,
        rentalEntity,
      );
    } else {
      this.#rentalsService.createRental(rentalEntity);
    }

    this.clearRentalEntity();
    this.rentalForm.reset();
  }
}
