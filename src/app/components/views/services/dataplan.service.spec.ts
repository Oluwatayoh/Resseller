import { TestBed } from '@angular/core/testing';

import { DataplanService } from './dataplan.service';

describe('DataplanService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DataplanService = TestBed.get(DataplanService);
    expect(service).toBeTruthy();
  });
});
