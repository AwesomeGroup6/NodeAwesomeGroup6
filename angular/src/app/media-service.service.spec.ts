import { TestBed, inject } from '@angular/core/testing';

import { MediaServiceService } from './media-service.service';

describe('MediaServiceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MediaServiceService]
    });
  });

  it('should be created', inject([MediaServiceService], (service: MediaServiceService) => {
    expect(service).toBeTruthy();
  }));
});
