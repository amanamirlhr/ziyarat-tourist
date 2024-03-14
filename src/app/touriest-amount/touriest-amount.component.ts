import {AfterViewInit, Component, ViewChild} from '@angular/core';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatGridListModule } from '@angular/material/grid-list';
import { AddEditPopupTouramountComponent } from './add-edit-popup-touramount/add-edit-popup-touramount.component';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';

@Component({
  selector: 'app-touriest-amount',
  standalone: true,
  imports: [CommonModule,MatPaginatorModule,MatDialogModule,MatInputModule,MatButtonModule,MatGridListModule,MatTableModule],
  templateUrl: './touriest-amount.component.html',
  styleUrls: ['./touriest-amount.component.css']
})
export class TouriestAmountComponent {
  displayedColumns: string[] = ['id','title', 'description', 'startDate', 'endDate'];
  dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  constructor(public dialog: MatDialog) {}
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }
    openDialog() {
    this.dialog.open(AddEditPopupTouramountComponent);
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
  title: string;
  description: string;
  startDate: string;
  endDate: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {id:1,description: "An incredible adventure", title: 'Amazing Tour Updated', startDate: "10/20/2020", endDate: '10/30/2020'},
  {id:2,description: "An incredible adventure", title: 'Amazing Tour Updated', startDate: "10/20/2020", endDate: '10/30/2020'},
  {id:3,description: "An incredible adventure", title: 'Amazing Tour Updated', startDate: "10/20/2020", endDate: '10/30/2020'},
  {id:4,description: "An incredible adventure", title: 'Amazing Tour Updated', startDate: "10/20/2020", endDate: '10/30/2020'},
  {id:5,description: "An incredible adventure", title: 'Amazing Tour Updated', startDate: "10/20/2020", endDate: '10/30/2020'},
  {id:6,description: "An incredible adventure", title: 'Amazing Tour Updated', startDate: "10/20/2020", endDate: '10/30/2020'},
];
