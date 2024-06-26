import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { catchError, switchMap, throwError } from 'rxjs';
import { AuthServiceService } from '../services/auth-service.service';
import { inject } from '@angular/core';

export const authorizationInterceptor: HttpInterceptorFn = (req, next) => {
  const storedToken = localStorage.getItem('AccessToken');
  const authService = inject(AuthServiceService);

  if (storedToken) {
    const authReq = req.clone({
      headers: req.headers.set('Authorization', `Bearer ${storedToken}`),
    });

    return next(authReq).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 401) {
          return authService.refreshAccessToken().pipe(
            switchMap((newToken: string) => {
              const newAuthReq = req.clone({
                headers: req.headers.set('Authorization', `Bearer ${newToken}`),
              });
              return next(newAuthReq);
            }),
            catchError((refreshError) => {
              authService.logout();
              return throwError(refreshError);
            })
          );
        }
        return throwError(error);
      })
    );
  }

  return next(req);
};
