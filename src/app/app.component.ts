import { Component, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { RentalsService } from './rentals/rentals.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  #rentalsService: RentalsService = inject(RentalsService);

  ngOnInit(): void {
    this.#rentalsService.fetchRentals();
  }
}
