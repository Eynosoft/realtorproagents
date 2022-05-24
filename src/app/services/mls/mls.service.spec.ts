import { TestBed } from '@angular/core/testing';

import { MlsService } from './mls.service';

describe('MlsService', () => {
  let service: MlsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MlsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
