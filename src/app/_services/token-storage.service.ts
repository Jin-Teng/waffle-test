import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

const TOKEN_KEY = 'auth-token'; // jwt
const USER_KEY = 'auth-user'; // phone, role

/**
 * save user status: jwt and user role
 */
@Injectable({
  providedIn: 'root'
})
export class TokenStorageService {
  public isLoggedIn$: BehaviorSubject<boolean>;

  constructor() { 
    this.isLoggedIn$ = new BehaviorSubject(!!this.getToken());
  }

  signOut(): void {
    this.isLoggedIn$.next(false);

    window.sessionStorage.clear();
  }

  public saveToken(token: string): void {
    this.isLoggedIn$.next(true);

    window.sessionStorage.removeItem(TOKEN_KEY);
    window.sessionStorage.setItem(TOKEN_KEY, token);
  }

  public getToken(): string {
    return sessionStorage.getItem(TOKEN_KEY);
  }

  public saveUser(user): void {
    window.sessionStorage.removeItem(USER_KEY);
    window.sessionStorage.setItem(USER_KEY, JSON.stringify(user));
  }

  public getUser(): any {
    return JSON.parse(sessionStorage.getItem(USER_KEY));
  }
}
