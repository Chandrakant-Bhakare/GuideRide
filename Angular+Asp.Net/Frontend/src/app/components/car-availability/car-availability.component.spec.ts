import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarAvailabilityComponent } from './car-availability.component';

describe('CarAvailabilityComponent', () => {
  let component: CarAvailabilityComponent;
  let fixture: ComponentFixture<CarAvailabilityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CarAvailabilityComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CarAvailabilityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
