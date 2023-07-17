import { TestBed } from '@angular/core/testing';

import { LeadsService } from './leads.service';

describe('LeadsService', () => {
  let service: LeadsService;

  beforeEach(() => {
    TestBed.configureTestingModule({ teardown: { destroyAfterEach: false } });
    service = TestBed.inject(LeadsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
