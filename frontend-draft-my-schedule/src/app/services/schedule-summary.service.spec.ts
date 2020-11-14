import { TestBed } from '@angular/core/testing';

import { ScheduleSummaryService } from './schedule-summary.service';

describe('ScheduleSummaryService', () => {
  let service: ScheduleSummaryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ScheduleSummaryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
