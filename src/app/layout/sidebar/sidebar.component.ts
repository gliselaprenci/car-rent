import { Component, inject, Signal } from '@angular/core';
import { NgClass, NgForOf, NgIf } from '@angular/common';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { environment } from '../../../environments/environment';
import {
  faCar,
  faCircleNodes,
  faLocationDot,
  faUser,
} from '@fortawesome/free-solid-svg-icons';
import { SidebarItem } from './sidebar.types';
import { LayoutService } from '../layout.service';
import { AppRoutes } from '../../app.routes';
import { NavigationEnd, Router, RouterLink } from '@angular/router';
import { UntilDestroy } from '@ngneat/until-destroy';

@UntilDestroy()
@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [NgForOf, FaIconComponent, NgClass, RouterLink, NgIf],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss',
})
export class SidebarComponent {
  #layoutService: LayoutService = inject(LayoutService);
  #router: Router = inject(Router);
  sidebarOpen: Signal<boolean> = this.#layoutService.sidebarOpen;
  activeParentUrl: string | undefined = undefined;
  isAdmin: Signal<boolean> = this.#layoutService.isAdmin;

  constructor() {
    this.#router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.activeParentUrl = event.url?.split('/')[2];
      }
    });
  }

  sidebarItem: SidebarItem[] = [
    {
      id: 1,
      icon: faCircleNodes,
      label: 'Rentals',
      route: AppRoutes.Rentals,
      adminOnly: true,
    },
    {
      id: 2,
      icon: faLocationDot,
      label: 'Branches',
      route: AppRoutes.Branches,
      adminOnly: true,
    },
    {
      id: 3,
      icon: faCar,
      label: 'Cars',
      route: AppRoutes.Cars,
      adminOnly: true,
    },
    {
      id: 4,
      icon: faUser,
      label: 'Customers',
      route: AppRoutes.Customers,
      adminOnly: true,
    },
    {
      id: 5,
      icon: faCar,
      label: 'Car Rentals',
      route: AppRoutes.CarRentals,
      adminOnly: false,
    },
  ];
  protected readonly environment = environment;
}
