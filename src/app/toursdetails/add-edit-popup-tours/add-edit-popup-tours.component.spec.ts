import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditPopupToursComponent } from './add-edit-popup-tours.component';

describe('AddEditPopupToursComponent', () => {
  let component: AddEditPopupToursComponent;
  let fixture: ComponentFixture<AddEditPopupToursComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [AddEditPopupToursComponent]
    });
    fixture = TestBed.createComponent(AddEditPopupToursComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
