import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Data } from '../_shared/data';

const API_URL = 'http://localhost:3000/users/';

/**
 * send http request to /users
 * retrun Observable<Data>
 */
@Injectable({
    providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  userLogin(credentials): Observable<Data> {
    return this.http.get<Data>(API_URL + 'login');
  }

  userLogout(): Observable<Data> {
    return this.http.get<Data>(API_URL + 'logout');
  }

  getUserProfile(): Observable<Data> {
    return this.http.get<Data>(API_URL + 'profile');
  }

}
