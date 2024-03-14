import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditPopupExpensesComponent } from './add-edit-popup-expenses.component';

describe('AddEditPopupExpensesComponent', () => {
  let component: AddEditPopupExpensesComponent;
  let fixture: ComponentFixture<AddEditPopupExpensesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [AddEditPopupExpensesComponent]
    });
    fixture = TestBed.createComponent(AddEditPopupExpensesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
