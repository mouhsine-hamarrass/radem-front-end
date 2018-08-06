import { TestBed, inject } from '@angular/core/testing';

import { ContributeurService } from './contributeur.service';

describe('ContributeurService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ContributeurService]
    });
  });

  it('should be created', inject([ContributeurService], (service: ContributeurService) => {
    expect(service).toBeTruthy();
  }));
});
