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
    this.#httpClient.post('/rentals/createRentals', rentalEntity).subscribe({
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

  updateRental(id: number, rentalEntity: RentalEntity) {
    this.#httpClient
      .put(`/rentals/updateRentals/${id}`, rentalEntity)
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
      .delete(`/rentals/deleteRentals/${rentalEntity.rental_id}`)
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
