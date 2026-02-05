import { Routes } from '@angular/router';

import { authGuard } from '@shared/guards/auth-guard';

export const routes: Routes = [
  {
    path: 'private-area',
    canActivateChild: [authGuard],
    loadComponent: () => import('@layouts/private-area/private-area'),
    children: [
      {
        path: 'dashboard',
        loadComponent: () => import('@features/dashboard/dashboard-page/dashboard-page'),
        title: 'Dashboard',
      },
      {
        path: '**',
        redirectTo: 'dashboard',
      },
    ],
  },
  {
    path: 'auth',
    loadComponent: () => import('@layouts/auth-area/auth-area'),
    children: [
      {
        path: 'login',
        loadComponent: () => import('@features/auth/pages/login-page/login-page'),
        title: 'Login',
      },
      {
        path: 'register',
        loadComponent: () => import('@features/auth/pages/register-page/register-page'),
        title: 'Register',
      },
      {
        path: '**',
        redirectTo: 'login',
      },
    ],
  },
  // TODO:
  //   { path: '', redirectTo: 'auth/login', pathMatch: 'full' },
  //   { path: '**', redirectTo: 'auth' },
  { path: '**', redirectTo: 'auth' },
];
