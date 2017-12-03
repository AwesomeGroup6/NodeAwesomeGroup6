import { TestBed, inject } from '@angular/core/testing';

import { AuthGateService } from './auth-gate.service';

describe('AuthGateService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AuthGateService]
    });
  });

  it('should be created', inject([AuthGateService], (service: AuthGateService) => {
    expect(service).toBeTruthy();
  }));
});
