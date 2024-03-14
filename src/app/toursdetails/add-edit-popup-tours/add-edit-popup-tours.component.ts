import { Component, Inject, OnInit } from '@angular/core';
import { CommonModule, NgFor } from '@angular/common';
import { MAT_DIALOG_DATA, MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatGridListModule } from '@angular/material/grid-list';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { HttpClient } from '@angular/common/http';
import { CountryService } from '../../_services/country.service';
import { UserService } from 'src/app/_services/user.service';
import { TourService } from 'src/app/_services/tour.service';


@Component({
  selector: 'app-add-edit-popup-tours',
  standalone: true,
  imports: [CommonModule, MatButtonModule, FormsModule, ReactiveFormsModule, NgFor, MatSelectModule, MatGridListModule, MatFormFieldModule, MatDatepickerModule, MatNativeDateModule, MatInputModule, MatDialogModule],
  templateUrl: './add-edit-popup-tours.component.html',
  styleUrls: ['./add-edit-popup-tours.component.css']
})
export class AddEditPopupToursComponent implements OnInit {
  selectedOptions: string[] = [];
  options: string[] = [];
  title: string = '';
  description: string = '';
  selectcountry: string = '';
  startDate: string = '';
  endDate: string = '';
  // empform: FormGroup;
  empform = new FormGroup({

    title: new FormControl('', Validators.compose([Validators.required])),
    description: new FormControl('', Validators.compose([Validators.required])),
    selectcountry: new FormControl('', Validators.compose([Validators.required])),
    startDate: new FormControl('', Validators.compose([Validators.required])),
    endDate: new FormControl('', Validators.compose([Validators.required])),

  });
  constructor(    private _fb: FormBuilder,
    private _getCountryService: CountryService, private _posTour: TourService, private _dialogRef: MatDialogRef<AddEditPopupToursComponent>, @Inject(MAT_DIALOG_DATA) public data: any,) {
    // this.empform = this._fb.group({
    //   title: '',
    //   ladescriptionstName: '',
    //   selectcountry: '',
    //   startdate: '',
    //   enddate: ''
    // });
   }

  ngOnInit(): void {
    this.getEmployeeList();
    this.empform.patchValue(this.data);
  }

  // dateStart = new FormControl(new Date());
  // dateEnd = new FormControl(new Date());
  getEmployeeList() {
    debugger;
    this._getCountryService.getCountries().subscribe((data: any[]) => {
      debugger
      this.options = data.map((item) => item.name);
    });
  }
  onFormSubmit() {
    if (this.empform.valid) {
        this._posTour.postTour(this.empform.value).subscribe({
          next: (val: any) => {
            this._dialogRef.close(true);
          },
          error: (err: any) => {
            console.error(err);
          },
        });
      }
  }
}
function provideNativeDateAdapter(): import("@angular/core").Provider {
  throw new Error('Function not implemented.');
}

