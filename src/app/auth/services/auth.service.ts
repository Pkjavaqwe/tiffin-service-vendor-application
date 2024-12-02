import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Login, UserByToken, UserLoginResponse } from '../models/user';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { RetailerRegister, Retailers } from '../models/types';
import { JwtHelperService } from '@auth0/angular-jwt';
import { CloudinaryResponse } from '../../layout/product/models/tiffin';
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

  getUserTypeByToken(): Observable<UserByToken> {
    const baseUrlUserType = environment.apiEndpoint + '/auth/getuserbytoken';
    const userData = this.http.get<UserByToken>(baseUrlUserType);
    return userData;
  }
  isAccessTokenExpired(): boolean {
    const token = sessionStorage.getItem('token');
    if (!token) return true;
    const isTokenExpired = this.jwtHelper.isTokenExpired(token);
    return isTokenExpired;
  }

  uploadImage(file: File): Observable<CloudinaryResponse> {
    const baseUrlOrgImage = environment.apiEndpoint + '/auth/uploaduserimage'
    let formData = new FormData();
    formData.append('recfile', file)
    const observableData = this.http.post<CloudinaryResponse>(
      baseUrlOrgImage,
      formData
    );
    return observableData;
  }

  updateProfile(id:string, formadata:Retailers){
    const obs=this.http.put(`${environment.apiEndpoint}/auth/updateprofile/${id}`,formadata)
    console.log("in update profile service");
    return obs;
    
  }
}
