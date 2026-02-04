import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
  private readonly TOKEN_KEY = 'user_token';

  saveUserToken(token: string): void {
    localStorage.setItem(this.TOKEN_KEY, token);
  }

  getUserToken(): string | null {
    return localStorage.getItem(this.TOKEN_KEY);
  }

  deleteUserToken(): void {
    localStorage.removeItem(this.TOKEN_KEY);
  }

  clearLocalStorage(): void {
    localStorage.clear();
  }
}
