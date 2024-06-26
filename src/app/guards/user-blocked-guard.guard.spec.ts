import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { userBlockedGuardGuard } from './user-blocked-guard.guard';

describe('userBlockedGuardGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => userBlockedGuardGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
