import { TestBed } from '@angular/core/testing';

import { LogOutGuard } from './log-out.guard';

describe('LogOutGuard', () => {
  let guard: LogOutGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(LogOutGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
