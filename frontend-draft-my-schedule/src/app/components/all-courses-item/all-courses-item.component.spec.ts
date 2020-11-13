import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllCoursesItemComponent } from './all-courses-item.component';

describe('AllCoursesItemComponent', () => {
  let component: AllCoursesItemComponent;
  let fixture: ComponentFixture<AllCoursesItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AllCoursesItemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AllCoursesItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
