import { TestBed } from '@angular/core/testing';

import { RenovarTokenGuard } from './renovar-token.guard';

describe('RenovarTokenGuard', () => {
  let guard: RenovarTokenGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(RenovarTokenGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
