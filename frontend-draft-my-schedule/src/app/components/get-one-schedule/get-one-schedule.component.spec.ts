import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GetOneScheduleComponent } from './get-one-schedule.component';

describe('GetOneScheduleComponent', () => {
  let component: GetOneScheduleComponent;
  let fixture: ComponentFixture<GetOneScheduleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GetOneScheduleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GetOneScheduleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
