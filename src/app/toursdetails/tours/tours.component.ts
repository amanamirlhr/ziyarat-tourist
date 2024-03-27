import { AfterViewInit, ChangeDetectionStrategy, Component, ViewChild } from '@angular/core';
import { MatPaginator, MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { AddEditPopupToursComponent } from '../add-edit-popup-tours/add-edit-popup-tours.component';
import { MatIconModule } from '@angular/material/icon';
import { TourService } from 'src/app/_services/tour.service';

interface Tour {
  tourId: number;
  title: string;
  description: string;
  startDate: string;
  endDate: string;
}

@Component({
  selector: 'app-tours',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [CommonModule, MatFormFieldModule,MatIconModule, MatDialogModule, MatButtonModule, MatGridListModule, MatInputModule, MatTableModule, MatSortModule, MatPaginatorModule],
  templateUrl: './tours.component.html',
  styleUrls: ['./tours.component.css']
})
export class ToursComponent {
  displayedColumns: string[] = ['tourId','title', 'description','country', 'startDate', 'endDate', 'action'];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  constructor(public dialog: MatDialog,private _tourService: TourService,) {}
  ngOnInit(): void {
    this.getTourList();
  }
    openDialog() {
      const dialogRefOpen = this.dialog.open(AddEditPopupToursComponent,{
      width: '700px',
    });
    dialogRefOpen.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          this.getTourList();
        }
      },
    });
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  getTourList() {
    debugger
    this._tourService.getAllTour().subscribe({
      next: (res) => {
        if (res && Array.isArray(res.data)) {
          const tourData: Tour[] = res.data;
          tourData.forEach(row => {
            row.startDate = new Date(row.startDate).toISOString();
            row.endDate = new Date(row.endDate).toISOString();
          });

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
  openEditForm(data: any) {
    const dialogRef = this.dialog.open(AddEditPopupToursComponent,{
      data,
    });

    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          this.getTourList();
        }
      },
    });
  }

}
