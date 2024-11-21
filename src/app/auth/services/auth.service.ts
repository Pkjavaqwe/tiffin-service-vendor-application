import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Login, UserLoginResponse } from '../models/user';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }
  baseUrlLogin = environment.loginUrl + '/auth/login';
  authenticateLogin(loginCredentials: Login): Observable<UserLoginResponse> {
    console.log(environment.loginUrl + '/auth/login');
    const data = this.http.post<UserLoginResponse>(this.baseUrlLogin, loginCredentials);
    return data;
  }
}
