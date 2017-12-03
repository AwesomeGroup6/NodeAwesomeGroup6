import { TestBed, inject } from '@angular/core/testing';

import { AuthModuleService } from './auth-module.service';

describe('AuthModuleService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AuthModuleService]
    });
  });

  it('should be created', inject([AuthModuleService], (service: AuthModuleService) => {
    expect(service).toBeTruthy();
  }));
});
