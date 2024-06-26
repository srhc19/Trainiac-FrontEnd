import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { validObjectIdGuard } from './valid-object-id.guard';

describe('validObjectIdGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => validObjectIdGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
