import { HttpClient, HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from '../../auth/services/auth.service';
import { catchError, switchMap, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { SnackbarService } from '../../shared/snackbar.service';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const http = inject(HttpClient);
  const authService = inject(AuthService)
  const router = inject(Router);
  const snackBar = inject(SnackbarService);

  console.log('inside interceptor');
  const token = sessionStorage.getItem('token');
  console.log('token', token);
  if (token) {
    console.log('in if of interceptor');
    console.log('inside interceptor checking token expiry', authService.isAccessTokenExpired());

    const token = sessionStorage.getItem('token');
    console.log('Access Token:', token);
    const clonedRequest = token
      ? req.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`,
        },
      })
      : req;

    return next(clonedRequest).pipe(
      catchError((error: HttpErrorResponse) => {
        console.log('Interceptor error:', error);
        if (error.status === 401) {
          console.log('Access token expired, trying to refresh...');
          return authService.refreshTokens().pipe(
            switchMap((response: any) => {
              console.log('Refresh token response:', response);
              authService.saveTokens(response.token, response.refreshToken);
              const newRequest = req.clone({
                setHeaders: {
                  Authorization: `Bearer ${response.token}`,
                },
              });

              return next(newRequest);
            }),
            catchError((refreshError) => {
              console.error('Refresh token failed:', refreshError);
              authService.logout();
              snackBar.showError('Session expired. Please login again.');
              return throwError(() => refreshError);
            })
          );
        }
        authService.logout();
        return throwError(() => error);
      })
    );
  }
  return next(req);

};
