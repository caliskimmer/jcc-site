import { AdminService } from './admin.service';
import { TestBed } from '@angular/core/testing';

describe('AdminService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AdminService = TestBed.get(AdminService);
    expect(service).toBeTruthy();
  });
});
