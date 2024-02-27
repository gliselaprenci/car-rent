import { Component, inject, Signal } from '@angular/core';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { LayoutService } from '../layout.service';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [FaIconComponent],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
})
export class NavbarComponent {
  #layoutService: LayoutService = inject(LayoutService);
  sidebarOpen: Signal<boolean> = this.#layoutService.sidebarOpen;
  protected readonly environment = environment;
}
