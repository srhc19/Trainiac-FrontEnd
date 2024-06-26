import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { catchError, map, of } from 'rxjs';
import { userService } from '../ngrx/userauth/user.services';
import { ToastrService } from 'ngx-toastr';
import { GetuserdataService } from '../services/getuserdata.service';

export const userBlockedGuardGuard: CanActivateFn = (route, state) => {
  const authService = inject(userService);
  const router = inject(Router);
  const toastr = inject(ToastrService);
  const GetUserdataService = inject(GetuserdataService);
  const user_id = GetUserdataService.getUserid();
  return authService.isUserBlocked(user_id).pipe(
    map((isBlocked) => {
      if (isBlocked.isUserBlocked) {
        router.navigate(['']);
        toastr.error('your account has been blocked by admin');
        return false;
      }
      return true;
    }),
    catchError(() => {
      router.navigate(['']);
      return of(false);
    })
  );
};
