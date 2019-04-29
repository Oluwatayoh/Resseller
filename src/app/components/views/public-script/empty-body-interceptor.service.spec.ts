import { TestBed, inject } from '@angular/core/testing';

import { EmptyBodyInterceptorService } from './empty-body-interceptor.service';

describe('EmptyBodyInterceptorService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [EmptyBodyInterceptorService]
    });
  });

  it('should be created', inject([EmptyBodyInterceptorService], (service: EmptyBodyInterceptorService) => {
    expect(service).toBeTruthy();
  }));
});
