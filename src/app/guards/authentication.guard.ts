import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthServiceService } from '../services/auth-service.service';
import { Observable, catchError, map, of } from 'rxjs';

export const authenticationGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const authService = inject(AuthServiceService);
  // const AccessToken = localStorage.getItem('AccessToken');
  // debugger;
  if (authService.isAuthenticated()) {
    return true;
  } else if (authService.getRefreshToken()) {
    return new Observable<boolean>((observer) => {
      authService
        .refreshAccessToken()
        .pipe(
          map(() => {
            observer.next(true);
            observer.complete();
          }),
          catchError(() => {
            router.navigate(['']);
            observer.next(false);
            observer.complete();
            return of(false);
          })
        )
        .subscribe();
    });
  } else {
    router.navigate(['']);
    return false;
  }
};
