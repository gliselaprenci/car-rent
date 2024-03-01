import { Component, inject, Signal } from '@angular/core';
import { BranchesFormComponent } from '../branches/branches-form/branches-form.component';
import { RentalsFormComponent } from './rentals-form/rentals-form.component';
import { RentalsService } from './rentals.service';
import { RentalEntity } from './rentals.types';

@Component({
  selector: 'app-rentals',
  standalone: true,
  imports: [BranchesFormComponent, RentalsFormComponent],
  templateUrl: './rentals.component.html',
  styleUrl: './rentals.component.scss',
})
export class RentalsComponent {
  #rentalsService: RentalsService = inject(RentalsService);
  rentals: Signal<RentalEntity[]> = this.#rentalsService.getRentals();
  rentalEntity: RentalEntity;

  setRentalEntity(rentalEntity: RentalEntity): void {
    this.rentalEntity = rentalEntity;
  }
}
