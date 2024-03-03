import { Component, inject, Signal } from '@angular/core';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { LayoutService } from '../layout.service';
import { environment } from '../../../environments/environment';
import { BranchSelectComponent } from '../../branches/branch-select/branch-select.component';
import { RentalSelectComponent } from '../../rentals/rental-select/rental-select.component';
import { RentalsService } from '../../rentals/rentals.service';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AppRoutes } from '../../app.routes';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    FaIconComponent,
    BranchSelectComponent,
    RentalSelectComponent,
    FormsModule,
  ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
})
export class NavbarComponent {
  #router: Router = inject(Router);
  #layoutService: LayoutService = inject(LayoutService);
  #rentalsService: RentalsService = inject(RentalsService);
  selectedRentalId: Signal<number> = this.#rentalsService.getSelectedRentalId();
  sidebarOpen: Signal<boolean> = this.#layoutService.sidebarOpen;
  isAdmin: Signal<boolean> = this.#layoutService.isAdmin;

  adminSwitch(): void {
    this.#layoutService.isAdmin = !this.isAdmin();

    if (this.isAdmin()) {
      this.#router.navigate([AppRoutes.Admin + '/' + AppRoutes.Rentals]).then();
    } else {
      this.#router.navigate([AppRoutes.User + '/' + AppRoutes.CarRentals]).then();
    }
  }

  protected readonly environment = environment;
}
