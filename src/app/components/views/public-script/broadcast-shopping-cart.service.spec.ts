import { TestBed, inject } from '@angular/core/testing';

import { BroadcastShoppingCartService } from './broadcast-shopping-cart.service';

describe('BroadcastShoppingCartService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [BroadcastShoppingCartService]
    });
  });

  it('should be created', inject([BroadcastShoppingCartService], (service: BroadcastShoppingCartService) => {
    expect(service).toBeTruthy();
  }));
});
