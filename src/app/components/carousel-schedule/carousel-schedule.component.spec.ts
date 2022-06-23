import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarouselScheduleComponent } from './carousel-schedule.component';

describe('CarouselScheduleComponent', () => {
  let component: CarouselScheduleComponent;
  let fixture: ComponentFixture<CarouselScheduleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CarouselScheduleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CarouselScheduleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
