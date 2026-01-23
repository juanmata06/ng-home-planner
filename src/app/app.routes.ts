import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    // canMatch: [authGuard],
    loadComponent: () => import('@layouts/private-area/private-area'),
    children: [
      {
        path: 'dashboard',
        loadComponent: () => import('@features/dashboard/components/dashboard/dashboard'),
        title: 'Dashboard',
      },
      {
        path: '**',
        redirectTo: 'dashboard',
      },
    ],
  },
  // TODO:
  //   { path: '', redirectTo: 'auth/login', pathMatch: 'full' },
  //   { path: '**', redirectTo: 'auth' },
  { path: '**', redirectTo: '' },
];
