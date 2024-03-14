import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditPopupCountriesComponent } from './add-edit-popup-countries.component';

describe('AddEditPopupCountriesComponent', () => {
  let component: AddEditPopupCountriesComponent;
  let fixture: ComponentFixture<AddEditPopupCountriesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [AddEditPopupCountriesComponent]
    });
    fixture = TestBed.createComponent(AddEditPopupCountriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
