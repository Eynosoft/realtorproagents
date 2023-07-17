import { TestBed } from '@angular/core/testing';

import { ContactsService } from './contacts.service';

describe('ContactsService', () => {
  let service: ContactsService;

  beforeEach(() => {
    TestBed.configureTestingModule({ teardown: { destroyAfterEach: false } });
    service = TestBed.inject(ContactsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
