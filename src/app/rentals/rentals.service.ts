import { inject, Injectable, Signal, signal, WritableSignal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RentalEntity } from './rentals.types';

@Injectable({
  providedIn: 'root'
})
export class RentalsService {
  #httpClient: HttpClient = inject(HttpClient);
  #rentals: WritableSignal<RentalEntity[]> = signal<RentalEntity[]>(null);
  #selectedRentalId: WritableSignal<number> = signal<number>(null);

  fetchRentals() {
    this.#httpClient.get('/rentals/getAllRentals').subscribe({
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

  getRentals(): Signal<RentalEntity[]> {
    return this.#rentals.asReadonly();
  }

  selectRentalId(rentalId: number) {
    this.#selectedRentalId.set(rentalId);
  }

  getSelectedRentalId(): Signal<number> {
    return this.#selectedRentalId.asReadonly();
  }
}
