import { BookingService } from './booking-service.service';
import { TestBed } from '@angular/core/testing';

describe('BookingService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: BookingService = TestBed.get(BookingService);
    expect(service).toBeTruthy();
  });
});
