import { Component, inject, Signal } from '@angular/core';
import { BranchesFormComponent } from '../branches/branches-form/branches-form.component';
import { CarsFormComponent } from './cars-form/cars-form.component';
import { CarsService } from './cars.service';
import { CarEntity } from './cars.types';
import { ImageDisplayComponent } from '../common/image-display/image-display.component';

@Component({
  selector: 'app-cars',
  standalone: true,
  imports: [BranchesFormComponent, CarsFormComponent, ImageDisplayComponent],
  templateUrl: './cars.component.html',
  styleUrl: './cars.component.scss',
})
export class CarsComponent {
  #carsService: CarsService = inject(CarsService);
  cars: Signal<CarEntity[]> = this.#carsService.getCars();
  carEntity: CarEntity;

  setCarEntity(carEntity: CarEntity): void {
    this.carEntity = carEntity;
  }

  clearCarEntity(): void {
    this.carEntity = null;
  }
}
