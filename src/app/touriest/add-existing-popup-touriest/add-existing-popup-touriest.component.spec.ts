import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddExistingPopupTouriestComponent } from './add-existing-popup-touriest.component';

describe('AddExistingPopupTouriestComponent', () => {
  let component: AddExistingPopupTouriestComponent;
  let fixture: ComponentFixture<AddExistingPopupTouriestComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [AddExistingPopupTouriestComponent]
    });
    fixture = TestBed.createComponent(AddExistingPopupTouriestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
