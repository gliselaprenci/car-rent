import { Component, inject, Signal } from '@angular/core';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { LayoutService } from '../layout.service';
import { environment } from '../../../environments/environment';
import { BranchSelectComponent } from '../../branches/branch-select/branch-select.component';
import { RentalSelectComponent } from '../../rentals/rental-select/rental-select.component';
import { RentalsService } from '../../rentals/rentals.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [FaIconComponent, BranchSelectComponent, RentalSelectComponent],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
})
export class NavbarComponent {
  #layoutService: LayoutService = inject(LayoutService);
  #rentalsService: RentalsService = inject(RentalsService);
  selectedRentalId: Signal<number> = this.#rentalsService.getSelectedRentalId();
  sidebarOpen: Signal<boolean> = this.#layoutService.sidebarOpen;
  protected readonly environment = environment;
}
