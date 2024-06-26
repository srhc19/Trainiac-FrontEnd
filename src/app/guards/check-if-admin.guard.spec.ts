import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { checkIfAdminGuard } from './check-if-admin.guard';

describe('checkIfAdminGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => checkIfAdminGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
