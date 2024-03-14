import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatDialog, MatDialogModule} from '@angular/material/dialog';
import {MatButtonModule} from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {MatNativeDateModule} from '@angular/material/core';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatGridListModule } from '@angular/material/grid-list';

@Component({
  selector: 'app-add-edit-popup-touramount',
  standalone: true,
  imports: [CommonModule,MatButtonModule,MatGridListModule,MatFormFieldModule,MatDatepickerModule, MatNativeDateModule, MatInputModule, MatDialogModule],
  templateUrl: './add-edit-popup-touramount.component.html',
  styleUrls: ['./add-edit-popup-touramount.component.css']
})
export class AddEditPopupTouramountComponent {

}
