import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { validVedioCallIdGuard } from './valid-vedio-call-id.guard';

describe('validVedioCallIdGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => validVedioCallIdGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
