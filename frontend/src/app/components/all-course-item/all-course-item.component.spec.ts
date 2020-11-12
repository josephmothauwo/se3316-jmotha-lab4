import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllCourseItemComponent } from './all-course-item.component';

describe('AllCourseItemComponent', () => {
  let component: AllCourseItemComponent;
  let fixture: ComponentFixture<AllCourseItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AllCourseItemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AllCourseItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
