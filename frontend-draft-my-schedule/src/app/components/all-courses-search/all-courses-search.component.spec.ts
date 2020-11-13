import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllCoursesSearchComponent } from './all-courses-search.component';

describe('AllCoursesSearchComponent', () => {
  let component: AllCoursesSearchComponent;
  let fixture: ComponentFixture<AllCoursesSearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AllCoursesSearchComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AllCoursesSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
