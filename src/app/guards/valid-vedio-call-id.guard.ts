import { CanActivateFn } from '@angular/router';
import { Router } from '@angular/router';
import { inject } from '@angular/core';

export const validVedioCallIdGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const id = route.paramMap.get('id');
  if (isValidObjectId(id)) {
    return true;
  } else {
    router.navigate(['/not-found']);
    return false;
  }
};
function isValidObjectId(id: string | null): boolean {
  const idRegex = /^[a-zA-Z0-9]+$/;
  if (id) {
    return idRegex.test(id) && id.length === 5;
  }
  return false;
}
