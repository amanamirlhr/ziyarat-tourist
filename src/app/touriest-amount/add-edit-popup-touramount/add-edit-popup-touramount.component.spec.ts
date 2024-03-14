import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditPopupTouramountComponent } from './add-edit-popup-touramount.component';

describe('AddEditPopupTouramountComponent', () => {
  let component: AddEditPopupTouramountComponent;
  let fixture: ComponentFixture<AddEditPopupTouramountComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [AddEditPopupTouramountComponent]
    });
    fixture = TestBed.createComponent(AddEditPopupTouramountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
