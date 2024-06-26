import { CanActivateFn } from '@angular/router';

export const localStorageCleanupGuardGuard: CanActivateFn = (route, state) => {
  localStorage.removeItem('AccessToken');
  localStorage.removeItem('RefreshToken');
  localStorage.removeItem('user_id');
  localStorage.removeItem('user_email');
  localStorage.removeItem('user_name');
  return true;
};
