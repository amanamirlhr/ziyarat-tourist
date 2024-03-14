import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TourDashboardComponent } from './tour-dashboard.component';

describe('TourDashboardComponent', () => {
  let component: TourDashboardComponent;
  let fixture: ComponentFixture<TourDashboardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TourDashboardComponent]
    });
    fixture = TestBed.createComponent(TourDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
