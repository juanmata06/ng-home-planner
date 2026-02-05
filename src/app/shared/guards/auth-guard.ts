import { inject } from '@angular/core';
import { Router, type CanActivateChildFn } from '@angular/router';

import { AuthStore } from '@shared/store';

export const authGuard: CanActivateChildFn = (childRoute, state) => {
  const authStore = inject(AuthStore);
  const router = inject(Router);

  console.log('Guard ejecutado:', {
    isLoggedIn: authStore.isLoggedIn(),
    user: authStore.user(),
    token: authStore.token(),
  });

  return authStore.isLoggedIn() ? true : router.createUrlTree(['/login']);
};
