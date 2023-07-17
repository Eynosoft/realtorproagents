import { TestBed } from '@angular/core/testing';

import { SecureInnerPagesGuard } from './secure-inner-pages.guard';

describe('SecureInnerPagesGuard', () => {
  let guard: SecureInnerPagesGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({ teardown: { destroyAfterEach: false } });
    guard = TestBed.inject(SecureInnerPagesGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
