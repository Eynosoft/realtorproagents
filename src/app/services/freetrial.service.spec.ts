import { TestBed } from '@angular/core/testing';

import { FreetrialService } from './freetrial.service';

describe('FreetrialService', () => {
  let service: FreetrialService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FreetrialService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
