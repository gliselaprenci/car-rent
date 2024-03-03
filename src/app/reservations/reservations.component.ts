import { Component, inject } from '@angular/core';
import { BranchesFormComponent } from '../branches/branches-form/branches-form.component';
import { ReservationsService } from './reservations.service';

@Component({
  selector: 'app-reservations',
  standalone: true,
  imports: [BranchesFormComponent],
  templateUrl: './reservations.component.html',
  styleUrl: './reservations.component.scss',
})
export class ReservationsComponent {
  #reservationsService: ReservationsService = inject(ReservationsService);
  reservations = this.#reservationsService.getReservations();

  formatDateToHumanReadable(dateStr: string, locale: string = 'en-US', options?: Intl.DateTimeFormatOptions): string {
    const date = new Date(dateStr);

    const defaultOptions: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: 'long',
      day: '2-digit',
    };

    const dateTimeFormatOptions = { ...defaultOptions, ...options };
    return new Intl.DateTimeFormat(locale, dateTimeFormatOptions).format(date);
  }
}
