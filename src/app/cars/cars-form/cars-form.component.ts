import { Component, inject, Input, OnInit } from '@angular/core';
import { BranchEntity } from '../../branches/branches.types';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup, ReactiveFormsModule,
  Validators
} from '@angular/forms';
import { CarEntity, CarStatus } from '../cars.types';

@Component({
  selector: 'app-cars-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './cars-form.component.html',
  styleUrl: './cars-form.component.scss',
})
export class CarsFormComponent implements OnInit {
  @Input() carEntity: CarEntity;
  #formBuilder: FormBuilder = inject(FormBuilder);

  carForm: FormGroup = this.#formBuilder.group({
    brand: ['', [Validators.required]],
    model: ['', [Validators.required]],
    year: ['', [Validators.required]],
    color: ['', [Validators.required]],
    status: ['', [Validators.required]],
    rental_per_day: ['', [Validators.required]],
  });

  ngOnInit() {
    if (this.carEntity) {
      this.carForm.addControl('id', new FormControl(''));
    }
  }

  get status(): AbstractControl {
    return this.carForm.get('status');
  }

  protected readonly CarStatus = CarStatus;
}
