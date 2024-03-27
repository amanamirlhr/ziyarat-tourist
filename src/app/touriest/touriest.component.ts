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
import { TouriestService } from '../_services/touriest.service';


@Component({
  selector: 'app-touriest',
  standalone: true,
  imports: [CommonModule, MatFormFieldModule, MatIconModule, MatDialogModule, MatButtonModule, MatGridListModule, MatInputModule, MatTableModule, MatSortModule, MatPaginatorModule],
  templateUrl: './touriest.component.html',
  styleUrls: ['./touriest.component.css']
})
export class TouriestComponent {
  displayedColumns: string[] = ['id', 'name', 'email', 'cnic', 'age', 'address', 'phone'];
  dataSource!: MatTableDataSource<any>;
  totalRecords: number = 0;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  constructor(public dialog: MatDialog,private _tourService: TouriestService,) { }
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }
  ngOnInit(): void {
    this.getTouristList();
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  getTouristList() {
    debugger
    this._tourService.getAllTouriest().subscribe({
      next: (res) => {
        if (res && Array.isArray(res.data)) {
          debugger
          const touriestData: Touriest[] = res.data;
           this.totalRecords = touriestData.length;
          this.dataSource = new MatTableDataSource(touriestData);
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
export interface Touriest {
  id: number;
  name: string;
  email: string;
  cnic: string;
  age: string;
  address: string;
  phone: string;
}