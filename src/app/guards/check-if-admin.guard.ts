import { CanActivateFn, Router } from '@angular/router';
import { userService } from '../ngrx/userauth/user.services';
import { inject } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { catchError, map, of } from 'rxjs';
import { jwtDecode } from 'jwt-decode';

export const checkIfAdminGuard: CanActivateFn = (route, state) => {
  const authService = inject(userService);
  const router = inject(Router);
  const toastr = inject(ToastrService);

  const token = localStorage.getItem('AccessToken');
  if (token) {
    try {
      const decodedToken: any = jwtDecode(token);
      const { isAdmin } = decodedToken;

      console.log(isAdmin);
      if (isAdmin) {
        return true;
      } else {
        toastr.error('Access denied. Admins only.');
        router.navigate(['']);
        return false;
      }
    } catch (error) {
      return false;
    }
  }
  return false;
};
