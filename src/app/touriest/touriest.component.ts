import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatPaginator, MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';


@Component({
  selector: 'app-touriest',
  standalone: true,
  imports: [CommonModule, MatFormFieldModule, MatIconModule, MatDialogModule, MatButtonModule, MatGridListModule, MatInputModule, MatTableModule, MatSortModule, MatPaginatorModule],
  templateUrl: './touriest.component.html',
  styleUrls: ['./touriest.component.css']
})
export class TouriestComponent {
  displayedColumns: string[] = ['id', 'name', 'email', 'cnic', 'age', 'address', 'phone'];
  dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  constructor(public dialog: MatDialog) { }
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
export interface PeriodicElement {
  id: number;
  name: string;
  email: string;
  cnic: string;
  age: string;
  address: string;
  phone: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  { id: 1, name: "Asad Abbas", email: 'asad@gmail.com', cnic: "35202-8763982-1", age: '28', address: 'Mugha Pura Lahore Pakistan', phone: '+923170432287' },
  { id: 2, name: "Aman Ali", email: 'aman@gmail.com', cnic: "35202-8763983-1", age: '28', address: 'Mugha Pura Lahore Pakistan', phone: '+923170432287' },
  { id: 3, name: "Qasim", email: 'qasim@gmail.com', cnic: "35202-8763984-1", age: '28', address: 'Mugha Pura Lahore Pakistan', phone: '+923170432287' },
  { id: 4, name: "Ahmad", email: 'ahmad@gmail.com', cnic: "35202-8763985-1", age: '28', address: 'Mugha Pura Lahore Pakistan', phone: '+923170432287' },
  { id: 5, name: "Mahad Fayyaz", email: 'mahad@gmail.com', cnic: "35202-2763982-1", age: '28', address: 'Mugha Pura Lahore Pakistan', phone: '+923170432287' },
  { id: 6, name: "Muzamil Irshad", email: 'muzamil@gmail.com', cnic: "35202-2763982-1", age: '28', address: 'Mugha Pura Lahore Pakistan', phone: '+923170432287' },
  { id: 7, name: "Anas Amir", email: 'anas@gmail.com', cnic: "35202-8763984-1", age: '28', address: 'Mugha Pura Lahore Pakistan', phone: '+923170432287' },
  { id: 8, name: "Amir Sohail", email: 'amir@gmail.com', cnic: "35202-8763282-1", age: '28', address: 'Mugha Pura Lahore Pakistan', phone: '+923170432287' },
  { id: 9, name: "Ayaz Qasir", email: 'ayaz@gmail.com', cnic: "35202-8763932-1", age: '28', address: 'Mugha Pura Lahore Pakistan', phone: '+923170432287' },
  { id: 10, name: "Abdullah", email: 'abdullah@gmail.com', cnic: "35202-8783982-1", age: '28', address: 'Mugha Pura Lahore Pakistan', phone: '+923170432287' },
  { id: 11, name: "Bilal", email: 'bilal@gmail.com', cnic: "35202-8763983-1", age: '28', address: 'Mugha Pura Lahore Pakistan', phone: '+923170432287' },
  { id: 12, name: "Tayyab", email: 'tayyab@gmail.com', cnic: "35202-8763582-1", age: '28', address: 'Mugha Pura Lahore Pakistan', phone: '+923170432287' },
  { id: 13, name: "Imran", email: 'imran@gmail.com', cnic: "35202-8763986-1", age: '28', address: 'Mugha Pura Lahore Pakistan', phone: '+923170432287' },
  { id: 14, name: "Zubair", email: 'zubair@gmail.com', cnic: "35202-8763482-1", age: '28', address: 'Mugha Pura Lahore Pakistan', phone: '+923170432287' },
  { id: 15, name: "Shakeel", email: 'shakeel@gmail.com', cnic: "35202-8763982-1", age: '28', address: 'Mugha Pura Lahore Pakistan', phone: '+923170432287' },
  { id: 16, name: "Anees", email: 'anees@gmail.com', cnic: "35202-8763984-1", age: '28', address: 'Mugha Pura Lahore Pakistan', phone: '+923170432287' },
  { id: 17, name: "Ahad", email: 'ahad@gmail.com', cnic: "35202-8763984-1", age: '28', address: 'Mugha Pura Lahore Pakistan', phone: '+923170432287' },
  { id: 18, name: "Umair", email: 'umair@gmail.com', cnic: "35202-8763482-1", age: '28', address: 'Mugha Pura Lahore Pakistan', phone: '+923170432287' },
  { id: 19, name: "Nafees", email: 'nafees@gmail.com', cnic: "35202-8743982-1", age: '28', address: 'Mugha Pura Lahore Pakistan', phone: '+923170432287' },
  { id: 20, name: "Farooq", email: 'farooq@gmail.com', cnic: "35202-8743982-1", age: '28', address: 'Mugha Pura Lahore Pakistan', phone: '+923170432287' },
  { id: 21, name: "Zohaib Nadeem", email: 'zohaib@gmail.com', cnic: "35202-8563982-1", age: '28', address: 'Mugha Pura Lahore Pakistan', phone: '+923170432287' },
];
