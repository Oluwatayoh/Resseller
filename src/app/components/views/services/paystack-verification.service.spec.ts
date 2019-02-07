import { TestBed } from '@angular/core/testing';

import { PaystackVerificationService } from './paystack-verification.service';

describe('PaystackVerificationService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PaystackVerificationService = TestBed.get(PaystackVerificationService);
    expect(service).toBeTruthy();
  });
});
