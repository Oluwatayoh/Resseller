import { TestBed } from '@angular/core/testing';

import { CustomerBandwidthTransactionsService } from './customer-bandwidth-transactions.service';

describe('CustomerBandwidthTransactionsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CustomerBandwidthTransactionsService = TestBed.get(CustomerBandwidthTransactionsService);
    expect(service).toBeTruthy();
  });
});
