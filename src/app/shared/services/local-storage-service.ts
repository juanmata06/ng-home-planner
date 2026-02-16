import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
  private readonly TOKEN_KEY = 'user_token';

  saveUserToken(token: string): void {
    console.log('LocalStorageService - saveUserToken');
    localStorage.setItem(this.TOKEN_KEY, token);
  }

  getUserToken(): string | null {
    console.log('LocalStorageService - getUserToken');
    return localStorage.getItem(this.TOKEN_KEY);
  }

  deleteUserToken(): void {
    console.log('LocalStorageService - deleteUserToken');
    localStorage.removeItem(this.TOKEN_KEY);
  }

  clearLocalStorage(): void {
    console.log('LocalStorageService - clearLocalStorage');
    localStorage.clear();
  }
}
