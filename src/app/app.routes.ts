import { Routes } from '@angular/router';
import { LayoutComponent } from './layout/layout.component';

export enum AppRoutes {
  Branches = 'branches',
  Cars = 'cars',
  Customers = 'customers',
}

export const routes: Routes = [
  {
    path: '',
    redirectTo: AppRoutes.Branches,
    pathMatch: 'full',
  },
  {
    path: '',
    component: LayoutComponent,
    children: [
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
