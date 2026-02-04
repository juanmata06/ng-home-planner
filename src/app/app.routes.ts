import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    // canMatch: [authGuard],
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
        redirectTo: 'register',
      },
    ],
  },
  // {
  //   path: '',
  //   // canMatch: [authGuard],
  //   loadComponent: () => import('@layouts/private-area/private-area'),
  //   children: [
  //     {
  //       path: 'dashboard',
  //       loadComponent: () => import('@features/dashboard/dashboard-page/dashboard-page'),
  //       title: 'Dashboard',
  //     },
  //     {
  //       path: '**',
  //       redirectTo: 'dashboard',
  //     },
  //   ],
  // },
  // TODO:
  //   { path: '', redirectTo: 'auth/login', pathMatch: 'full' },
  //   { path: '**', redirectTo: 'auth' },
  { path: '**', redirectTo: '' },
];
