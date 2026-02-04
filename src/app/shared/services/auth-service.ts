import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { delay, map, Observable, of } from 'rxjs';

// TODO: use import { environment } from '@environments/environment';
import { UserLogin, UserRegister, User, FakeAPIUser, LoginResponse } from '@shared/interfaces';
import { mapFakeApiUserToUser } from '@shared/mappers';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly apiUrl = 'https://jsonplaceholder.typicode.com';
  private readonly _httpClient = inject(HttpClient);
  private readonly usersUrl = `${this.apiUrl}/users`;

  public getAllUsers(): Observable<User[]> {
    return this._httpClient
      .get<FakeAPIUser[]>(this.usersUrl)
      .pipe(
        map((fakeUsers: FakeAPIUser[]) =>
          fakeUsers
            .filter((fakeUser) => fakeUser.id < 10)
            .map((fakeUser) => mapFakeApiUserToUser(fakeUser)),
        ),
      );
  }

  public registerUser(userRegister: UserRegister): Observable<User> {
    const dummyUser: User = {
      id: Date.now().toString(),
      name: userRegister.name,
      email: userRegister.email,
      userRole: userRegister.userRole || 'User',
    };
    return of(dummyUser).pipe(delay(2000));
  }

  public loginUser(userLogin: UserLogin): Observable<LoginResponse> {
    const dummyUser: User = {
      id: '1',
      name: 'Test User',
      email: userLogin.email,
      userRole: 'User',
    };
    const response: LoginResponse = {
      user: dummyUser,
      token: 'fake-jwt-token-' + Date.now(),
    };
    return of(response).pipe(delay(2000));
  }
}
