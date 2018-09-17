import { TestBed, inject } from '@angular/core/testing';

import { FeedbacksService } from './feedbacks.service';

describe('FeedbacksService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FeedbacksService]
    });
  });

  it('should be created', inject([FeedbacksService], (service: FeedbacksService) => {
    expect(service).toBeTruthy();
  }));
});
