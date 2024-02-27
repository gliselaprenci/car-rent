import { Component, inject, Signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SidebarComponent } from './sidebar/sidebar.component';
import { NavbarComponent } from './navbar/navbar.component';
import { NgClass } from '@angular/common';
import { LayoutService } from './layout.service';
import { FooterComponent } from './footer/footer.component';
import { faAngleLeft, faAngleRight } from '@fortawesome/free-solid-svg-icons';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [
    RouterOutlet,
    SidebarComponent,
    NavbarComponent,
    NgClass,
    FooterComponent,
    FaIconComponent,
  ],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss',
})
export class LayoutComponent {
  #layoutService: LayoutService = inject(LayoutService);
  sidebarOpen: Signal<boolean> = this.#layoutService.sidebarOpen;

  toggleSidebar(): void {
    this.#layoutService.sidebarOpen = !this.sidebarOpen();
  }

  protected readonly faAngleRight = faAngleRight;
  protected readonly faAngleLeft = faAngleLeft;
}
