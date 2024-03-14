import { Component, EventEmitter, Output, ViewChild } from '@angular/core';
import { CommonModule, NgFor } from '@angular/common';
import {  MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatGridListModule } from '@angular/material/grid-list';
import {  FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { TouristService } from 'src/app/_services/tourist.service';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatSort, MatSortModule } from '@angular/material/sort';
import {MatCheckboxModule} from '@angular/material/checkbox';

@Component({
  selector: 'app-add-existing-popup-touriest',
  standalone: true,
  imports: [CommonModule, MatButtonModule, FormsModule, ReactiveFormsModule,MatTableModule,MatCheckboxModule, MatSortModule, NgFor,MatPaginatorModule, MatSelectModule, MatGridListModule, MatFormFieldModule, MatDatepickerModule, MatNativeDateModule, MatInputModule, MatDialogModule],
  templateUrl: './add-existing-popup-touriest.component.html',
  styleUrls: ['./add-existing-popup-touriest.component.css']
})
export class AddExistingPopupTouriestComponent {
  selectedOptions: string[] = [];
  options: string[] = [];
  completeData: any[] = [];
  selectAll: boolean = false;
  selectMainItem: boolean = false
  @Output() saveSelectedOptions = new EventEmitter<{tbname: string, tbemail: string, tbcnic: string, tbage: string, tbaddress: string, tbphone: string}[]>();

  displayedColumns: string[] = ['id', 'name', 'email', 'cnic', 'age', 'address', 'phone'];
  dataSource = new MatTableDataSource<any>();

  constructor(private _existingUser: TouristService,) { }
  ngOnInit(): void {
    // this.getExistingUserdata();
    // this.getExistingUserList();
    console.log(this.selectedOptions)
    this.getExistingTouristList()
  }
  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }
  getExistingUserdata() {
    this._existingUser.getTouriestName().subscribe((data: any[]) => {
      console.log("this is a get api :", data)
      this.options = data.map((item) => item.name);
      this.completeData = data;
      console.log("this is under completeData",this.completeData)
    });
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
    getExistingTouristList() {
    debugger
    this._existingUser.getTouriestName().subscribe({
      next: (res) => {
        debugger
        this.dataSource = new MatTableDataSource(res);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      },
      error: console.log,
    });
  }
  save() {
    debugger
    const selectedRows = this.options
      .filter((data) => this.selectedOptions.includes(data))
      .map((selectedOption) => {
        console.log("this is under selectedOption", selectedOption);
  
        // Find the corresponding row data for the selected option from dataSource
        const rowData = this.dataSource.data.find((item) => item.name === selectedOption);
  
        // Map the desired properties
        return {
          tbname: rowData.tbname,
          tbemail: rowData.tbemail,
          tbcnic: rowData.tbcnic,
          tbage: rowData.tbage,
          tbaddress: rowData.tbaddress,
          tbphone: rowData.tbphone,
        };
      });
  
    console.log("this is under selectedRows", selectedRows);
  
    // Now you have an array of objects with the desired properties, emit it
    this.saveSelectedOptions.emit(selectedRows);
    console.log("this is saveSelectedOptions", this.saveSelectedOptions);
  }
  
  toggleSelectAll() {
    this.selectAll = !this.selectAll
  }
  disabledSelectAll(){
    this.selectMainItem = !this.selectAll
  }

}
export interface PeriodicElement {
  name: string;
  email: string;
  cnic: string;
  age: string;
  address: string;
  phone: string;
}
// const ELEMENT_DATA: PeriodicElement[] = [
//   { name: "Asad Abbas", email: 'asad@gmail.com', cnic: "35202-8763982-1", age: '28', address: 'Mugha Pura Lahore Pakistan', phone: '+923170432287' },
//   { name: "Aman Ali", email: 'aman@gmail.com', cnic: "35202-8763983-1", age: '28', address: 'Mugha Pura Lahore Pakistan', phone: '+923170432287' },
//   { name: "Qasim", email: 'qasim@gmail.com', cnic: "35202-8763984-1", age: '28', address: 'Mugha Pura Lahore Pakistan', phone: '+923170432287' },
//   { name: "Ahmad", email: 'ahmad@gmail.com', cnic: "35202-8763985-1", age: '28', address: 'Mugha Pura Lahore Pakistan', phone: '+923170432287' },
//   { name: "Mahad Fayyaz", email: 'mahad@gmail.com', cnic: "35202-2763982-1", age: '28', address: 'Mugha Pura Lahore Pakistan', phone: '+923170432287' },
//   { name: "Muzamil Irshad", email: 'muzamil@gmail.com', cnic: "35202-2763982-1", age: '28', address: 'Mugha Pura Lahore Pakistan', phone: '+923170432287' },
//   { name: "Anas Amir", email: 'anas@gmail.com', cnic: "35202-8763984-1", age: '28', address: 'Mugha Pura Lahore Pakistan', phone: '+923170432287' },
//   { name: "Amir Sohail", email: 'amir@gmail.com', cnic: "35202-8763282-1", age: '28', address: 'Mugha Pura Lahore Pakistan', phone: '+923170432287' },
//   { name: "Ayaz Qasir", email: 'ayaz@gmail.com', cnic: "35202-8763932-1", age: '28', address: 'Mugha Pura Lahore Pakistan', phone: '+923170432287' },
//   { name: "Abdullah", email: 'abdullah@gmail.com', cnic: "35202-8783982-1", age: '28', address: 'Mugha Pura Lahore Pakistan', phone: '+923170432287' },
//   { name: "Bilal", email: 'bilal@gmail.com', cnic: "35202-8763983-1", age: '28', address: 'Mugha Pura Lahore Pakistan', phone: '+923170432287' },
//   { name: "Tayyab", email: 'tayyab@gmail.com', cnic: "35202-8763582-1", age: '28', address: 'Mugha Pura Lahore Pakistan', phone: '+923170432287' },
//   { name: "Imran", email: 'imran@gmail.com', cnic: "35202-8763986-1", age: '28', address: 'Mugha Pura Lahore Pakistan', phone: '+923170432287' },
//   { name: "Zubair", email: 'zubair@gmail.com', cnic: "35202-8763482-1", age: '28', address: 'Mugha Pura Lahore Pakistan', phone: '+923170432287' },
//   { name: "Shakeel", email: 'shakeel@gmail.com', cnic: "35202-8763982-1", age: '28', address: 'Mugha Pura Lahore Pakistan', phone: '+923170432287' },
//   { name: "Anees", email: 'anees@gmail.com', cnic: "35202-8763984-1", age: '28', address: 'Mugha Pura Lahore Pakistan', phone: '+923170432287' },
//   { name: "Ahad", email: 'ahad@gmail.com', cnic: "35202-8763984-1", age: '28', address: 'Mugha Pura Lahore Pakistan', phone: '+923170432287' },
//   { name: "Umair", email: 'umair@gmail.com', cnic: "35202-8763482-1", age: '28', address: 'Mugha Pura Lahore Pakistan', phone: '+923170432287' },
//   { name: "Nafees", email: 'nafees@gmail.com', cnic: "35202-8743982-1", age: '28', address: 'Mugha Pura Lahore Pakistan', phone: '+923170432287' },
//   { name: "Farooq", email: 'farooq@gmail.com', cnic: "35202-8743982-1", age: '28', address: 'Mugha Pura Lahore Pakistan', phone: '+923170432287' },
//   { name: "Zohaib Nadeem", email: 'zohaib@gmail.com', cnic: "35202-8563982-1", age: '28', address: 'Mugha Pura Lahore Pakistan', phone: '+923170432287' },
// ];

