import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Login, UserLoginResponse } from '../models/user';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { RetailerRegister, Retailers } from '../models/types';
import { JwtHelperService } from '@auth0/angular-jwt';
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  jwtHelper = new JwtHelperService();

  constructor(private http: HttpClient) { }
  baseUrlLogin = environment.apiEndpoint + '/auth/login';
  authenticateLogin(loginCredentials: Login): Observable<UserLoginResponse> {
    console.log(environment.apiEndpoint + '/auth/login');
    const data = this.http.post<UserLoginResponse>(this.baseUrlLogin, loginCredentials);
    return data;
  }

  baseUrlRegistration = environment.apiEndpoint + '/auth/register';
  register(
    formData: Retailers
  ): Observable<UserLoginResponse> {

    console.log("inside register service", formData);
    return this.http.post<UserLoginResponse>(this.baseUrlRegistration, formData);
  }
  isAuthenticated(): boolean {
    const setToken = sessionStorage.getItem('token');
    if (setToken) {
      return true;
    }
    return false;
  }
  isAccessTokenExpired(): boolean {
    const token = sessionStorage.getItem('token');
    if (!token) return true;
    const isTokenExpired = this.jwtHelper.isTokenExpired(token);
    return isTokenExpired;
  }
}
