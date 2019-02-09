import { TestBed, inject } from '@angular/core/testing';

import { BroadcastImageUploadService } from './broadcast-image-upload.service';

describe('BroadcastImageUploadService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [BroadcastImageUploadService]
    });
  });

  it('should be created', inject([BroadcastImageUploadService], (service: BroadcastImageUploadService) => {
    expect(service).toBeTruthy();
  }));
});
