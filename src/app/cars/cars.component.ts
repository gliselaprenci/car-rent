import { Component, inject, OnInit, Signal } from '@angular/core';
import { BranchesFormComponent } from '../branches/branches-form/branches-form.component';
import { CarsFormComponent } from './cars-form/cars-form.component';
import { CarsService } from './cars.service';
import { CarEntity } from './cars.types';

@Component({
  selector: 'app-cars',
  standalone: true,
  imports: [BranchesFormComponent, CarsFormComponent],
  templateUrl: './cars.component.html',
  styleUrl: './cars.component.scss',
})
export class CarsComponent implements OnInit {
  #carsService: CarsService = inject(CarsService);
  cars: Signal<CarEntity[]> = this.#carsService.getCars();

  ngOnInit(): void {
    this.#carsService.fetchCars();
  }
}
