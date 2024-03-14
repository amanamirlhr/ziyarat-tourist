import { Component } from '@angular/core';
import { CommonModule, NgFor } from '@angular/common';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatGridListModule } from '@angular/material/grid-list';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { AddExistingPopupTouriestComponent } from '../add-existing-popup-touriest/add-existing-popup-touriest.component';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { TouristService } from 'src/app/_services/tourist.service';

@Component({
  selector: 'app-add-edit-touriest',
  standalone: true,
  imports: [CommonModule, MatButtonModule, FormsModule, MatIconModule, MatPaginatorModule, MatTableModule, ReactiveFormsModule, NgFor, MatSelectModule, MatGridListModule, MatFormFieldModule, MatDatepickerModule, MatNativeDateModule, MatInputModule, MatDialogModule],
  templateUrl: './add-edit-touriest.component.html',
  styleUrls: ['./add-edit-touriest.component.css']
})
export class AddEditTouriestComponent {

  // displayedColumns: string[] = ['userId', 'firstName', 'lastName', 'email', 'password', 'phone', 'address'];

  name: string = '';
  email: string = '';
  cnic: string = '';
  age: string = '';
  address: string = '';
  phone: string = '';
  isEditMode: boolean = false;
  empform = new FormGroup({

    name: new FormControl('', Validators.compose([Validators.required, Validators.minLength(3)])),
    email: new FormControl('', Validators.compose([Validators.required, Validators.email])),
    cnic: new FormControl('', Validators.compose([Validators.required, Validators.maxLength(13)])),
    age: new FormControl('', Validators.compose([Validators.required])),
    address: new FormControl('', Validators.compose([Validators.required])),
    phone: new FormControl('', Validators.compose([Validators.required, Validators.maxLength(11)])),

  });
  dataSource: MatTableDataSource<{ tbname: string, tbemail: string, tbcnic: string, tbage: string, tbaddress: string, tbphone: string }>;
  selectedRow!: { tbname: string, tbemail: string, tbcnic: string, tbage: string, tbaddress: string, tbphone: string } | null;

  constructor(public dialog: MatDialog, private _existingUser: TouristService,) {
    this.dataSource = new MatTableDataSource<{ tbname: string, tbemail: string, tbcnic: string, tbage: string, tbaddress: string, tbphone: string }>([]);
  }

  openDialog() {
    const dialogRef = this.dialog.open(AddExistingPopupTouriestComponent);
    dialogRef.componentInstance.saveSelectedOptions.subscribe((selectedOptions: string[]) => {
      console.log("this is a selected option:", selectedOptions);
  
      // Fetch data for selectedOptions from the service
      selectedOptions.forEach(() => {
        this._existingUser.getTouriestName().subscribe({
          next: (optionData: any) => {
            // Add the fetched data to dataSource.data
            this.dataSource.data.push({
              tbname: optionData.name,
              tbemail: optionData.email,
              tbcnic: optionData.cnic,
              tbage: optionData.age,
              tbaddress: optionData.address,
              tbphone: optionData.phone,
            });
        
            // Refresh the MatTableDataSource
            this.dataSource.data = [...this.dataSource.data];
            console.log("this is datasource",this.dataSource.data)
          },
          error: (error: any) => {
            // Handle error if needed
            console.error('Error fetching data:', error);
          },
          complete: () => {
            // Handle completion if needed
          },
        });
      });
    });
  }

  deleteRow(row: { tbname: string, tbemail: string, tbcnic: string, tbage: string, tbaddress: string, tbphone: string }) {
    const index = this.dataSource.data.indexOf(row);
    if (index >= 0) {
      this.dataSource.data.splice(index, 1);
      this.dataSource._updateChangeSubscription(); // Notify the data source about the change
    }
  }
  addOrUpdateData() {
    if (this.isEditMode) {
      if (this.selectedRow) {
        // Update the selected row with the edited data
        this.selectedRow.tbname = this.name;
        this.selectedRow.tbemail = this.email;
        this.selectedRow.tbcnic = this.cnic;
        this.selectedRow.tbage = this.age;
        this.selectedRow.tbaddress = this.address;
        this.selectedRow.tbphone = this.phone;

        // Clear the input fields and reset the selected row
        this.clearFields();
        this.isEditMode = false;
      }
    } else {
      if (this.name && this.email && this.cnic && this.age && this.address && this.phone) {
        // Push data to the MatTableDataSource
        this.dataSource.data.push({ tbname: this.name, tbemail: this.email, tbcnic: this.cnic, tbage: this.age, tbaddress: this.address, tbphone: this.phone });

        // Refresh the MatTableDataSource
        this.dataSource.data = [...this.dataSource.data];

        // Clear input fields
        this.name = '';
        this.email = '';
        this.cnic = '';
        this.age = '';
        this.address = '';
        this.phone = '';
      }
    }
  }
  editRow(row: { tbname: string, tbemail: string, tbcnic: string, tbage: string, tbaddress: string, tbphone: string }) {
    // Copy data from the selected row to the input fields
    this.name = row.tbname;
    this.email = row.tbemail;
    this.cnic = row.tbcnic;
    this.age = row.tbage;
    this.address = row.tbaddress;
    this.phone = row.tbphone;

    // Store the selected row for later use
    this.selectedRow = row;
    this.isEditMode = true;
  }

  clearFields() {
    this.name = '';
    this.email = '';
    this.cnic = '';
    this.age = '';
    this.address = '';
    this.phone = '';
    this.selectedRow = null;
  }
}