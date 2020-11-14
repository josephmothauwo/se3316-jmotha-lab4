import { TestBed } from '@angular/core/testing';

import { GetOneScheduleService } from './get-one-schedule.service';

describe('GetOneScheduleService', () => {
  let service: GetOneScheduleService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GetOneScheduleService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
