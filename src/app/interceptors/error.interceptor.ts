import { HttpInterceptorFn } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';
import { LogoutService } from '../services/logout.service';
import { inject } from '@angular/core';
import { AuthServiceService } from '../services/auth-service.service';
import { ToastrService } from 'ngx-toastr';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthServiceService);
  const toasr = inject(ToastrService);
  // const authService = inject(LogoutService);
  return next(req).pipe(
    catchError((error) => {
      if ([400].includes(error.status)) {
        toasr.error(error.message);
      }

      if ([500, 404].includes(error.status)) {
        authService.logout();
      }
      const e = error.error.message || error.statusText;
      console.error(e);
      return throwError(() => error);
    })
  );
};
