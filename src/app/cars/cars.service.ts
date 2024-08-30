import {
  effect,
  inject,
  Injectable,
  Signal,
  signal,
  WritableSignal,
} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CarEntity } from './cars.types';
import { BranchesService } from '../branches/branches.service';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root',
})
export class CarsService {
  #httpClient: HttpClient = inject(HttpClient);
  #branchesService: BranchesService = inject(BranchesService);
  #toastrService: ToastrService = inject(ToastrService);
  #cars: WritableSignal<CarEntity[]> = signal<CarEntity[]>(null);
  branchId: Signal<number> = this.#branchesService.getSelectedBranchId();

  constructor() {
    effect(() => {
      if (!this.branchId()) {
        this.#toastrService.error('Select branch on the top left corner');
        return;
      }

      this.fetchCars();
    });
  }

  fetchCars() {
    if (!this.branchId()) {
      this.#toastrService.error('Select branch on the top left corner');
      return;
    }

    this.#httpClient
      .get(`/cars/getCarsByBranchId/${this.branchId()}`)
      .subscribe({
        next: (data) => {
          this.#cars.set(data as CarEntity[]);
        },
        error: (error) => {
          this.#toastrService.error(error.message);
        },
        complete: () => {
          console.log('Request completed');
        },
      });
  }

  createCar(carEntity: CarEntity) {
    this.#httpClient
      .post(`/cars/createCar/${carEntity.branchId}`, carEntity)
      .subscribe({
        next: () => {
          this.#toastrService.success('Car created successfully');
        },
        error: (error) => {
          this.#toastrService.error(error.message);
        },
        complete: () => {
          this.fetchCars();
        },
      });
  }

  updateCar(carId: number, carEntity: CarEntity) {
    this.#httpClient.put(`/cars/updateCar/${carId}`, carEntity).subscribe({
      next: () => {
        this.#toastrService.success('Car updated successfully');
      },
      error: (error) => {
        this.#toastrService.error(error.message);
      },
      complete: () => {
        this.fetchCars();
      },
    });
  }

  getCars(): Signal<CarEntity[]> {
    return this.#cars.asReadonly();
  }
}
