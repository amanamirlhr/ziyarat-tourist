import {AfterViewInit, Component, ViewChild} from '@angular/core';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { AddEditPopupCountriesComponent } from './add-edit-popup-countries/add-edit-popup-countries.component';

@Component({
  selector: 'app-countries',
  standalone: true,
  imports: [CommonModule,MatPaginatorModule,MatDialogModule,MatInputModule,MatButtonModule,MatGridListModule,MatTableModule],
  templateUrl: './countries.component.html',
  styleUrls: ['./countries.component.css']
})
export class CountriesComponent {
  displayedColumns: string[] = ['id', 'name', 'isActive'];
  dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  constructor(public dialog: MatDialog) {}
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }
    openDialog() {
    this.dialog.open(AddEditPopupCountriesComponent);
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
  isActive: boolean;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {id:1,name: "An incredible adventure", isActive: true},
  {id:2,name: "An incredible adventure", isActive: true},
  {id:3,name: "An incredible adventure", isActive: false},
  {id:4,name: "An incredible adventure", isActive: true},
  {id:5,name: "An incredible adventure", isActive: false},
  {id:6,name: "An incredible adventure", isActive: false},
];

