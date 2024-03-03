import { inject, Injectable, Signal, signal, WritableSignal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { ReservationEntity } from './reservations.types';

@Injectable({
  providedIn: 'root',
})
export class ReservationsService {
  #httpClient: HttpClient = inject(HttpClient);
  #toastrService: ToastrService = inject(ToastrService);
  #reservations: WritableSignal<ReservationEntity[]> =
    signal<ReservationEntity[]>(null);

  fetchReservations() {
    this.#httpClient.get('/reservations/getAllReservations').subscribe({
      next: (data) => {
        this.#reservations.set(data as ReservationEntity[]);
      },
      error: (error) => {
        this.#toastrService.error(error.message);
      },
    });
  }

  getReservations(): Signal<ReservationEntity[]> {
    return this.#reservations.asReadonly();
  }
}
