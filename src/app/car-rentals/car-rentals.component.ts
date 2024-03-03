import { Component, inject, Signal } from '@angular/core';
import { CarsFormComponent } from '../cars/cars-form/cars-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CarsService } from '../cars/cars.service';
import { CarEntity, CarStatus } from '../cars/cars.types';
import { ImageDisplayComponent } from '../common/image-display/image-display.component';
import { CustomerEntity } from '../customers/customer.types';
import { CustomersService } from '../customers/customers.service';
import { CarRentalService } from './car-rental.service';
import { CarRentalDates } from './car-rentals.types';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-car-rentals',
  standalone: true,
  imports: [
    CarsFormComponent,
    ReactiveFormsModule,
    ImageDisplayComponent,
    FormsModule,
  ],
  templateUrl: './car-rentals.component.html',
  styleUrl: './car-rentals.component.scss',
})
export class CarRentalsComponent {
  #carsService: CarsService = inject(CarsService);
  #customersService: CustomersService = inject(CustomersService);
  #carRentalService: CarRentalService = inject(CarRentalService);
  #toastrService: ToastrService = inject(ToastrService);
  cars: Signal<CarEntity[]> = this.#carsService.getCars();
  randomCustomer: Signal<CustomerEntity> =
    this.#customersService.getRandomCustomer();
  startDate: string;
  endDate: string;
  hasDateErrors: boolean;

  rentCar(carEntity: CarEntity): void {
    if (this.hasDateErrors) {
      this.#toastrService.error('Dates have errors');
      return;
    }

    const dates: CarRentalDates = {
      start_date: this.startDate,
      end_date: this.endDate,
    };

    this.#carRentalService.createReservation(
      carEntity,
      this.randomCustomer(),
      dates,
    );
  }

  startDateChange(startDate: string): void {
    this.startDate = startDate;
    this.isEndDateBeforeStartDate(this.startDate, this.endDate);
  }

  endDateChange(endDate: string): void {
    this.endDate = endDate;
    this.isEndDateBeforeStartDate(this.startDate, this.endDate);
  }

  isEndDateBeforeStartDate(start_date: string, end_date: string): void {
    if (!start_date || !end_date) {
      this.hasDateErrors = false;
      return;
    }

    const startDate: Date = new Date(start_date);
    const endDate: Date = new Date(end_date);

    this.hasDateErrors = endDate <= startDate;
  }

  protected readonly CarStatus = CarStatus;
}
