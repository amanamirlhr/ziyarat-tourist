import {AfterViewInit, Component, ViewChild} from '@angular/core';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { AddEditPopupCountriesComponent } from './add-edit-popup-countries/add-edit-popup-countries.component';
import { CountryService } from '../_services/country.service';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-countries',
  standalone: true,
  imports: [CommonModule,MatPaginatorModule,MatDialogModule,MatInputModule,MatButtonModule,MatGridListModule,MatTableModule],
  templateUrl: './countries.component.html',
  styleUrls: ['./countries.component.css']
})
export class CountriesComponent {
  displayedColumns: string[] = ['id', 'name', 'isActive'];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  constructor(public dialog: MatDialog,private _getCountries: CountryService ) {}
  ngOnInit(): void {
    this.getCountryList();
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
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
  getCountryList() {
    debugger
    this._getCountries.getCountries().subscribe({
      next: (res) => {
        debugger
        if (res && Array.isArray(res)) {
          const tourData: Countries[] = res;
          this.dataSource = new MatTableDataSource(tourData);
          this.dataSource.sort = this.sort;
          this.dataSource.paginator = this.paginator;
        } else {
          console.error("API response does not contain an array under 'data':", res);
        }
      },
      error: console.log,
    });
  }
  getRowIndex(row: any): number {
    return this.dataSource.filteredData.indexOf(row) + 1;
  }
}
export interface Countries {
  id: number;
  name: string;
  isActive: boolean;
}

// const ELEMENT_DATA: PeriodicElement[] = [
//   {id:1,name: "An incredible adventure", isActive: true},
//   {id:2,name: "An incredible adventure", isActive: true},
//   {id:3,name: "An incredible adventure", isActive: false},
//   {id:4,name: "An incredible adventure", isActive: true},
//   {id:5,name: "An incredible adventure", isActive: false},
//   {id:6,name: "An incredible adventure", isActive: false},
// ];

