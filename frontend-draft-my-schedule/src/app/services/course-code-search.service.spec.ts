import { TestBed } from '@angular/core/testing';

import { CourseCodeSearchService } from './course-code-search.service';

describe('CourseCodeSearchService', () => {
  let service: CourseCodeSearchService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CourseCodeSearchService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
