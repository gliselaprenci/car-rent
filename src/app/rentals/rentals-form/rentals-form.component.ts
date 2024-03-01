import { Component, inject, Input, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup, FormsModule, ReactiveFormsModule,
  Validators
} from '@angular/forms';
import { RentalEntity } from '../rentals.types';

@Component({
  selector: 'app-rentals-form',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './rentals-form.component.html',
  styleUrl: './rentals-form.component.scss',
})
export class RentalsFormComponent implements OnInit {
  @Input() rentalEntity: RentalEntity;
  #formBuilder: FormBuilder = inject(FormBuilder);

  rentalForm: FormGroup = this.#formBuilder.group({
    name: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
    owner: ['', [Validators.required]],
  });

  ngOnInit() {
    if (this.rentalEntity) {
      this.rentalForm.addControl('id', new FormControl(''));
    }
  }
}
