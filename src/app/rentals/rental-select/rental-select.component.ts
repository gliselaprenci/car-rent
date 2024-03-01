import { Component, inject, Signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RentalsService } from '../rentals.service';
import { RentalEntity } from '../rentals.types';

@Component({
  selector: 'app-rental-select',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './rental-select.component.html',
  styleUrl: './rental-select.component.scss',
})
export class RentalSelectComponent {
  #rentalsService: RentalsService = inject(RentalsService);
  rentals: Signal<RentalEntity[]> = this.#rentalsService.getRentals();
  selectedRental: Signal<number> = this.#rentalsService.getSelectedRentalId();

  handleRentalChange(rentalId: number) {
    this.#rentalsService.selectRentalId(rentalId);
  }
}
