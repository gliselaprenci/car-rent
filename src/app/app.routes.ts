import { Routes } from '@angular/router';
import { LayoutComponent } from './layout/layout.component';

export enum AppRoutes {
  Home = '',
  Table = 'table',
  Branches = 'branches',
}

export const routes: Routes = [
  {
    path: AppRoutes.Home,
    component: LayoutComponent,
    children: [
      {
        path: AppRoutes.Home,
        loadComponent: () =>
          import('./home/home.component').then((c) => c.HomeComponent),
      },
      {
        path: AppRoutes.Branches,
        loadComponent: () =>
          import('./branches/branches.component').then((c) => c.BranchesComponent),
      },
    ],
  },
];
