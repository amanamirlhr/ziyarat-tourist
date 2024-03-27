import { Component, EventEmitter, Output, ViewChild } from '@angular/core';
import { CommonModule, NgFor } from '@angular/common';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatGridListModule } from '@angular/material/grid-list';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { TouristService } from 'src/app/_services/tourist.service';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { SelectionModel } from '@angular/cdk/collections';

@Component({
  selector: 'app-add-existing-popup-touriest',
  standalone: true,
  imports: [CommonModule, MatButtonModule, FormsModule, ReactiveFormsModule, MatTableModule, MatCheckboxModule, MatSortModule, NgFor, MatPaginatorModule, MatSelectModule, MatGridListModule, MatFormFieldModule, MatDatepickerModule, MatNativeDateModule, MatInputModule, MatDialogModule],
  templateUrl: './add-existing-popup-touriest.component.html',
  styleUrls: ['./add-existing-popup-touriest.component.css']
})
export class AddExistingPopupTouriestComponent {
  selectedOptions: string[] = [];
  options: string[] = [];
  completeData: any[] = [];
  selectAll: boolean = false;
  selectMainItem: boolean = false
  @Output() saveSelectedOptions = new EventEmitter<{ tbname: string, tbemail: string, tbcnic: string, tbage: string, tbaddress: string, tbphone: string }[]>();

  displayedColumns: string[] = ['select', 'id', 'name', 'email', 'cnic', 'age', 'address', 'phone'];
  dataSource = new MatTableDataSource<any>();

  constructor(private _existingUser: TouristService,private dialogRef: MatDialogRef<AddExistingPopupTouriestComponent>) { }
  ngOnInit(): void {
    console.log(this.selectedOptions)
    this.getExistingTouristList()
  }
  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }
  selection = new SelectionModel<PeriodicElement>(true, []);

  getExistingUserdata() {
    this._existingUser.getTouriestName().subscribe((data: any[]) => {
      console.log("this is a get api :", data)
      this.options = data.map((item) => ({ ...item }));
      this.completeData = data;
      console.log("this is under completeData", this.completeData)
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
    
    this._existingUser.getTouriestName().subscribe({
      next: (res) => {
        
        this.dataSource = new MatTableDataSource(res);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      },
      error: console.log,
    });
  }
  getRowIndex(row: any): number {
    return this.dataSource.filteredData.indexOf(row) + 1;
  }
  save() {
    const selectedRows = this.dataSource.data.filter(row => this.selection.isSelected(row)).map((selectedOption) => {
      
      return {
        tbname: selectedOption.name,
        tbemail: selectedOption.email,
        tbcnic: selectedOption.cnic,
        tbage: selectedOption.age,
        tbaddress: selectedOption.address,
        tbphone: selectedOption.phone,
      };
    });
    this.saveSelectedOptions.emit(selectedRows);
    this.dialogRef.close();
  }


  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  masterToggle() {
    this.isAllSelected() ?
        this.selection.clear() :
        this.dataSource.data.forEach(row => this.selection.select(row));
  }

  checkboxLabel(row?: PeriodicElement): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.position + 1}`;
  }

}
export interface PeriodicElement {
  position: number;
  name: string;
  email: string;
  cnic: string;
  age: string;
  address: string;
  phone: string;
}