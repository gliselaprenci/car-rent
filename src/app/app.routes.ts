import { Routes } from '@angular/router';
import { LayoutComponent } from './layout/layout.component';

export enum AppRoutes {
  Rentals = 'rentals',
  Branches = 'branches',
  Cars = 'cars',
  Customers = 'customers',
}

export const routes: Routes = [
  {
    path: '',
    redirectTo: AppRoutes.Rentals,
    pathMatch: 'full',
  },
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: AppRoutes.Rentals,
        loadComponent: () =>
          import('./rentals/rentals.component').then((c) => c.RentalsComponent),
      },
      {
        path: AppRoutes.Branches,
        loadComponent: () =>
          import('./branches/branches.component').then((c) => c.BranchesComponent),
      },
      {
        path: AppRoutes.Cars,
        loadComponent: () =>
          import('./cars/cars.component').then((c) => c.CarsComponent),
      },
      {
        path: AppRoutes.Customers,
        loadComponent: () =>
          import('./customers/customers.component').then((c) => c.CustomersComponent),
      },
    ],
  },
];
