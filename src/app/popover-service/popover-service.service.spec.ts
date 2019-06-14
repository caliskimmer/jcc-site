import { TestBed, inject } from '@angular/core/testing';

import { PopoverServiceService } from './popover-service.service';

describe('PopoverServiceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PopoverServiceService]
    });
  });

  it('should be created', inject([PopoverServiceService], (service: PopoverServiceService) => {
    expect(service).toBeTruthy();
  }));
});
