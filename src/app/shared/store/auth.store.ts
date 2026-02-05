import { computed, inject } from '@angular/core';

import { Subject, switchMap, takeUntil } from 'rxjs';
import {
  patchState,
  signalStore,
  withComputed,
  withHooks,
  withMethods,
  withState,
} from '@ngrx/signals';

import { LoginResponse, UserLogin, User, UserRegister } from '@shared/interfaces';
import { AuthService, LocalStorageService } from '@shared/services';
import { Router } from '@angular/router';

type AuthState = {
  user: User | null;
  token: string | null;
  isAuthLoading: boolean;
};

const initialState: AuthState = {
  user: null,
  token: null,
  isAuthLoading: false,
};

export const AuthStore = signalStore(
  { providedIn: 'root' },
  withState<AuthState>(initialState),
  withComputed((state) => ({
    isLoggedIn: computed(() => state.user() && state.token()),
  })),
  withMethods(
    (
      store,
      authService = inject(AuthService),
      localStorageService = inject(LocalStorageService),
      destroy$ = new Subject<void>(),
      router: Router = inject(Router),
    ) => ({
      destroySubject: () => destroy$,
      validateUserLogged(): void {
        console.log("Validating user logged");
        patchState(store, { isAuthLoading: true });
        const token = localStorageService.getUserToken();
        const currentUser = store.user();
        const isUserLogged = store.isLoggedIn();
        if (!token || !isUserLogged || !currentUser) {
          patchState(store, {
            user: null,
            token: null,
            isAuthLoading: false,
          });
          localStorageService.deleteUserToken();
        }
      },
      loginUser: (credentials: UserLogin): void => {
        patchState(store, { isAuthLoading: true });
        authService
          .loginUser(credentials)
          .pipe(takeUntil(destroy$))
          .subscribe((response: LoginResponse) => {
            localStorageService.saveUserToken(response.token);
            patchState(store, {
              user: response.user,
              token: response.token,
              isAuthLoading: false,
            });
            router.navigate(['/private-area/dashboard']);
          });
      },
      registerUser: (credentials: UserRegister): void => {
        patchState(store, { isAuthLoading: true });
        authService
          .registerUser(credentials)
          .pipe(
            switchMap(() =>
              authService.loginUser({
                email: credentials.email,
                password: credentials.password,
              }),
            ),
            takeUntil(destroy$),
          )
          .subscribe((response: LoginResponse) => {
            localStorageService.saveUserToken(response.token);
            patchState(store, {
              user: response.user,
              token: response.token,
              isAuthLoading: false,
            });
            router.navigate(['/private-area/dashboard']);
          });
      },
      logOutUser: (): void => {
        patchState(store, { isAuthLoading: true });
        patchState(store, {
          user: null,
          token: null,
          isAuthLoading: false,
        });
        localStorageService.deleteUserToken();
      },
    }),
  ),
  withHooks({
    onInit(store) {
      store.validateUserLogged();
    },
    onDestroy(store) {
      store.destroySubject().next();
      store.destroySubject().complete();
    },
  }),
);
