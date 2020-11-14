import { TestBed } from '@angular/core/testing';

import { MakeScheduleService } from './make-schedule.service';

describe('MakeScheduleService', () => {
  let service: MakeScheduleService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MakeScheduleService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
