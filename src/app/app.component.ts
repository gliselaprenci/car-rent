import { Component, inject, OnInit } from '@angular/core';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { RentalsService } from './rentals/rentals.service';
import { UntilDestroy } from '@ngneat/until-destroy';
import { LayoutService } from './layout/layout.service';
import { ReservationsService } from './reservations/reservations.service';

@UntilDestroy()
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  #rentalsService: RentalsService = inject(RentalsService);
  #reservationsService: ReservationsService = inject(ReservationsService);
  #layoutService: LayoutService = inject(LayoutService);
  #router: Router = inject(Router);

  constructor() {
    this.#router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.#layoutService.isAdmin = event.url?.split('/')[1] === 'admin';
      }
    });
  }

  ngOnInit(): void {
    this.#rentalsService.fetchRentals();
    this.#reservationsService.fetchReservations();
  }
}
