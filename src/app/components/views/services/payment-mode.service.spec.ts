import { TestBed, inject } from '@angular/core/testing';

import { PaymentModeService } from './payment-mode.service';

describe('PaymentModeService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PaymentModeService]
    });
  });

  it('should be created', inject([PaymentModeService], (service: PaymentModeService) => {
    expect(service).toBeTruthy();
  }));
});
