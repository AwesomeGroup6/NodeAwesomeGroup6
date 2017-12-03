import { TestBed, inject } from '@angular/core/testing';

import { MediaServiceService } from './login-signup';

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
