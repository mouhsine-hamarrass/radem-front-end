import { TestBed, inject } from '@angular/core/testing';

import { EnableAccountService } from './enable-account.service';

describe('EnableAccountService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [EnableAccountService]
    });
  });

  it('should be created', inject([EnableAccountService], (service: EnableAccountService) => {
    expect(service).toBeTruthy();
  }));
});
