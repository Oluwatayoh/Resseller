import { TestBed } from '@angular/core/testing';

import { CustomerDeviceTransactionsService } from './customer-device-transactions.service';

describe('CustomerDeviceTransactionsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CustomerDeviceTransactionsService = TestBed.get(CustomerDeviceTransactionsService);
    expect(service).toBeTruthy();
  });
});
