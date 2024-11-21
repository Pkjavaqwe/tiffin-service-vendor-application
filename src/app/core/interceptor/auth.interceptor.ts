import { HttpInterceptorFn } from '@angular/common/http';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  console.log('inside interceptor');
  const token = sessionStorage.getItem('token');
  console.log('token', token);
  if (token) {
    console.log('in if of interceptor');
    const clonedRequest = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log(clonedRequest);
    return next(clonedRequest);
  } else {
    return next(req);
  }
};
