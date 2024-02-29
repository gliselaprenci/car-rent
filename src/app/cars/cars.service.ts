import {
  computed,
  inject,
  Injectable,
  Signal,
  signal,
  WritableSignal
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
  cars: WritableSignal<CarEntity[]> = signal<CarEntity[]>(null);
  branchId: Signal<number> = this.#branchesService.getSelectedBranchId();

  constructor() {
    computed(() => {
      if (!this.branchId()) {
        this.#toastrService.error('Select branch on the top left corner');
        return;
      }

      this.fetchCars();
    })
  }

  fetchCars() {
    if (!this.branchId()) {
      this.#toastrService.error('Select branch on the top left corner');
      return;
    }

    this.#httpClient
      .get(`/cars/getCarByBranchId/${this.branchId()}`)
      .subscribe({
        next: (data) => {
          console.log('Data received:', data);
        },
        error: (error) => {
          console.error('Error:', error);
        },
        complete: () => {
          console.log('Request completed');
        },
      });
  }

  getCars(): Signal<CarEntity[]> {
    return this.cars.asReadonly();
  }
}
