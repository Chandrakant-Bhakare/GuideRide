import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GuideAvailabilityComponent } from './guide-availability.component';

describe('GuideAvailabilityComponent', () => {
  let component: GuideAvailabilityComponent;
  let fixture: ComponentFixture<GuideAvailabilityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GuideAvailabilityComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GuideAvailabilityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
