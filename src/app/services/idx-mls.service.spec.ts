import { TestBed } from '@angular/core/testing';

import { IdxMlsService } from './idx-mls.service';

describe('IdxMlsService', () => {
  let service: IdxMlsService;

  beforeEach(() => {
    TestBed.configureTestingModule({ teardown: { destroyAfterEach: false } });
    service = TestBed.inject(IdxMlsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
