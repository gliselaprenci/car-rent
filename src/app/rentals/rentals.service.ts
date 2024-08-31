import {
  inject,
  Injectable,
  Signal,
  signal,
  WritableSignal,
} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RentalEntity } from './rentals.types';
import { ToastrService } from 'ngx-toastr';
import {BranchEntity} from "../branches/branches.types";

@Injectable({
  providedIn: 'root',
})
export class RentalsService {
  #httpClient: HttpClient = inject(HttpClient);
  #toastrService: ToastrService = inject(ToastrService);
  #rentals: WritableSignal<RentalEntity[]> = signal<RentalEntity[]>(null);
  #selectedRentalId: WritableSignal<number> = signal<number>(null);

  fetchRentals() {
    this.#httpClient.get('/rentals/getAllRentals').subscribe({
      next: (data: RentalEntity[]) => {
        this.#rentals.set(data);
      },
      error: (error) => {
        this.#toastrService.error(`Error fetching rentals \n ${error.message}`);
      },
    });
  }

  createRental(rentalEntity: RentalEntity) {
    this.#httpClient.post('/rentals/createRental', rentalEntity).subscribe({
      next: () => {
        this.#toastrService.success('Rental created successfully');
      },
      error: (error) => {
        console.error('Error:', error);
      },
      complete: () => {
        this.fetchRentals();
      },
    });
  }

  updateRental(rentalId: number, rentalEntity: RentalEntity) {
    this.#httpClient
      .put(`/rentals/updateRental/${rentalId}`, rentalEntity)
      .subscribe({
        next: () => {
          this.#toastrService.success('Rental updated successfully');
        },
        error: (error) => {
          console.error('Error:', error);
        },
        complete: () => {
          this.fetchRentals();
        },
      });
  }

  deleteRental(rentalEntity: RentalEntity) {
    this.#httpClient
      .delete(`/rentals/deleteRental/${rentalEntity.rentalId}`)
      .subscribe({
        next: () => {
          this.#toastrService.success('Rental deleted successfully');
        },
        error: (error) => {
          console.error('Error:', error);
        },
        complete: () => {
          this.fetchRentals();
        },
      });
  }

  getRentals(): Signal<RentalEntity[]> {
    return this.#rentals.asReadonly();
  }

  selectRentalId(rentalId: number): void {
    this.#selectedRentalId.set(rentalId);
  }

  getSelectedRentalId(): Signal<number> {
    return this.#selectedRentalId.asReadonly();
  }
}
