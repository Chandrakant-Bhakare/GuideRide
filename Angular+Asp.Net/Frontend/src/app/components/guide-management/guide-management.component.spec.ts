import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GuideManagementComponent } from './guide-management.component';

describe('GuideManagementComponent', () => {
  let component: GuideManagementComponent;
  let fixture: ComponentFixture<GuideManagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GuideManagementComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GuideManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
