import { TestBed } from '@angular/core/testing';

import { WeeklyMonthlyOrdersService } from './weekly-monthly-orders.service';

describe('WeeklyMonthlyOrdersService', () => {
  let service: WeeklyMonthlyOrdersService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WeeklyMonthlyOrdersService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
