import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TouriestComponent } from './touriest.component';

describe('TouriestComponent', () => {
  let component: TouriestComponent;
  let fixture: ComponentFixture<TouriestComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [TouriestComponent]
    });
    fixture = TestBed.createComponent(TouriestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
