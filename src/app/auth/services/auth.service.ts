import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Login, RefreshTokenResponse, UserByToken, UserLoginResponse } from '../models/user';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { RetailerRegister, Retailers } from '../models/types';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  jwtHelper = new JwtHelperService();

  constructor(private http: HttpClient, private router: Router) { }
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

  getUserTypeByToken(): Observable<UserByToken> {
    const baseUrlUserType = environment.apiEndpoint + '/auth/getuserbytoken';
    const userData = this.http.get<UserByToken>(baseUrlUserType);
    return userData;
  }
  saveTokens(accessToken: string, refreshToken: string): void {
    sessionStorage.setItem('token', accessToken);
    sessionStorage.setItem('refreshToken', refreshToken);
  }
  clearTokens(): void {
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('refreshToken');
  }
  isAccessTokenExpired(): boolean {
    const token = sessionStorage.getItem('token');
    if (!token) return true;
    console.log('all response of reffresh token', this.jwtHelper.decodeToken(token));

    const isTokenExpired = this.jwtHelper.isTokenExpired(token);
    return isTokenExpired;
  }
  refreshTokens(): Observable<RefreshTokenResponse> {
    const refreshTokenOld = sessionStorage.getItem('refreshToken')
    const refreshTokenUrl = environment.apiEndpoint + '/auth/refreshtoken';
    return this.http.post<RefreshTokenResponse>(refreshTokenUrl, { refreshToken: refreshTokenOld });
  }
  logout() {
    this.clearTokens();
    // this.snackbar.showError('Logged out successfully');
    this.router.navigate(['/']);
  }
  /*
      return this.http
        .post(refreshTokenUrl, { refreshToken })
        .then((response: any) => {
          const { token: accessToken, refreshToken: newRefreshToken } = response;
          this.saveTokens(accessToken, newRefreshToken);
        })
        .catch((error: HttpErrorResponse) => {
          console.error('Refresh token failed', error);
          this.clearTokens();
          this.router.navigate(['/login']);
        });
        */
}

