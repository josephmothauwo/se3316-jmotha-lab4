import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CourseCodeSearchComponent } from './course-code-search.component';

describe('CourseCodeSearchComponent', () => {
  let component: CourseCodeSearchComponent;
  let fixture: ComponentFixture<CourseCodeSearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CourseCodeSearchComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CourseCodeSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
