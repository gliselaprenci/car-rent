import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CarEntity } from '../cars/cars.types';
import { CustomerEntity } from '../customers/customer.types';
import { ToastrService } from 'ngx-toastr';
import { CarsService } from '../cars/cars.service';

@Injectable({
  providedIn: 'root',
})
export class CarRentalService {
  #httpClient: HttpClient = inject(HttpClient);
  #carsService: CarsService = inject(CarsService);
  #toastrService: ToastrService = inject(ToastrService);

  createReservation(carEntity: CarEntity, customer: CustomerEntity, dates) {
    console.log('customer', customer);
    this.#httpClient
      .post(
        `/reservations/createReservation/car/${carEntity.car_id}/user/${customer.costumer_id}`,
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
        }
      });
  }
}
