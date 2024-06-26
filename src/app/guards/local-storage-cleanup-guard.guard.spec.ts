import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { localStorageCleanupGuardGuard } from './local-storage-cleanup-guard.guard';

describe('localStorageCleanupGuardGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => localStorageCleanupGuardGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
