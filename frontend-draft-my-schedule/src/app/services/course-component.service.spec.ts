import { TestBed } from '@angular/core/testing';

import { CourseComponentService } from './course-component.service';

describe('CourseComponentService', () => {
  let service: CourseComponentService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CourseComponentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
