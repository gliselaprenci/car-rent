import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CarEntity } from '../cars/cars.types';
import { UserEntity } from '../customers/customer.types';
import { ToastrService } from 'ngx-toastr';
import { CarsService } from '../cars/cars.service';
import { ReservationsService } from '../reservations/reservations.service';

@Injectable({
  providedIn: 'root',
})
export class CarRentalService {
  #httpClient: HttpClient = inject(HttpClient);
  #carsService: CarsService = inject(CarsService);
  #reservationsService: ReservationsService = inject(ReservationsService);
  #toastrService: ToastrService = inject(ToastrService);

  createReservation(carEntity: CarEntity, customer: UserEntity, dates) {
    console.log('customer', customer);
    this.#httpClient
      .post(
        `/reservations/createReservation/${customer.userId}/${carEntity.carId}`,
        dates,
      )
      .subscribe({
        next: () => {
          this.#toastrService.success('Car reserved successfully');
        },
        error: (error) => {
          this.#toastrService.error(error.message);
        },
        complete: () => {
          this.#carsService.fetchCars();
          this.#reservationsService.fetchReservations();
        }
      });
  }
}
