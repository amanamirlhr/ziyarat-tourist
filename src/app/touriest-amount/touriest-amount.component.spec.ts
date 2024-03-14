import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TouriestAmountComponent } from './touriest-amount.component';

describe('TouriestAmountComponent', () => {
  let component: TouriestAmountComponent;
  let fixture: ComponentFixture<TouriestAmountComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [TouriestAmountComponent]
    });
    fixture = TestBed.createComponent(TouriestAmountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
