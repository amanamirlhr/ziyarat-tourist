import { Component } from '@angular/core';
import { CommonModule, NgFor } from '@angular/common';
import {MatDialog, MatDialogModule} from '@angular/material/dialog';
import {MatButtonModule} from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {MatNativeDateModule} from '@angular/material/core';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatGridListModule } from '@angular/material/grid-list';
import { FormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';

interface isActive {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-add-edit-popup-countries',
  standalone: true,
  imports: [CommonModule,MatButtonModule,MatGridListModule,MatFormFieldModule,MatDatepickerModule, MatSelectModule, NgFor, FormsModule, MatNativeDateModule, MatInputModule, MatDialogModule],
  templateUrl: './add-edit-popup-countries.component.html',
  styleUrls: ['./add-edit-popup-countries.component.css']
})
export class AddEditPopupCountriesComponent {
  isActives: isActive[] = [
    {value: 'True', viewValue: 'True'},
    {value: 'False', viewValue: 'False'},
  ];
}
