import { CanActivateFn } from '@angular/router';
import { Router } from '@angular/router';
import { inject } from '@angular/core';

export const validObjectIdGuard: CanActivateFn = (route, state) => {
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
  const objectIdRegex = /^[0-9a-fA-F]{24}$/;
  return id ? objectIdRegex.test(id) : false;
}
