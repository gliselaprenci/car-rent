import { Component, inject, Signal } from '@angular/core';
import { BranchesFormComponent } from '../branches/branches-form/branches-form.component';
import { RentalsFormComponent } from './rentals-form/rentals-form.component';
import { RentalsService } from './rentals.service';
import { RentalEntity } from './rentals.types';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { BranchesService } from '../branches/branches.service';

@Component({
  selector: 'app-rentals',
  standalone: true,
  imports: [BranchesFormComponent, RentalsFormComponent, FaIconComponent],
  templateUrl: './rentals.component.html',
  styleUrl: './rentals.component.scss',
})
export class RentalsComponent {
  #rentalsService: RentalsService = inject(RentalsService);
  #branchesService: BranchesService = inject(BranchesService);
  rentals: Signal<RentalEntity[]> = this.#rentalsService.getRentals();
  rentalEntity: RentalEntity;

  setRentalEntity(rentalEntity: RentalEntity): void {
    this.rentalEntity = rentalEntity;
  }

  deleteRental(rentalEntity: RentalEntity): void {
    this.#rentalsService.deleteRental(rentalEntity);
    this.#branchesService.selectBranchId(null);
  }

  protected readonly faTrash = faTrash;
}
