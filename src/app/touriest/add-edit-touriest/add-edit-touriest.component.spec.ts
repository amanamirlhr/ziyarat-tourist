import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditTouriestComponent } from './add-edit-touriest.component';

describe('AddEditTouriestComponent', () => {
  let component: AddEditTouriestComponent;
  let fixture: ComponentFixture<AddEditTouriestComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [AddEditTouriestComponent]
    });
    fixture = TestBed.createComponent(AddEditTouriestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
