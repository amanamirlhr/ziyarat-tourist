import { Component, ViewChild } from '@angular/core';
import { CommonModule, NgIf } from '@angular/common';
import {MatButtonModule} from '@angular/material/button';
import {MatSelectModule} from '@angular/material/select';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSidenav, MatSidenavModule} from '@angular/material/sidenav';
import {MatIconModule} from '@angular/material/icon';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatListModule} from '@angular/material/list';
import { RouterModule } from '@angular/router';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import {MatMenuTrigger, MatMenuModule} from '@angular/material/menu';
import { UserDialogComponent } from 'src/app/core/user-dialog/user-dialog.component';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';


@Component({
  selector: 'app-main-layout',
  standalone: true,
  imports: [CommonModule,RouterModule,MatListModule,MatDialogModule,MatMenuModule,MatSidenavModule,NgIf,FormsModule,MatInputModule, MatFormFieldModule, MatSelectModule, MatButtonModule,MatToolbarModule, MatIconModule],
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.css'],
})
export class MainLayoutComponent {
  @ViewChild('menuTrigger')
  menuTrigger!: MatMenuTrigger;
  value = '';
  isExpanded = true;
  showSubmenu: boolean = false;
  isShowing = false;
  showSubSubMenu: boolean = false;


  constructor(public dialog: MatDialog) {}

  mouseenter() {
    if (!this.isExpanded) {
      this.isShowing = true;
    }
  }
  openDialog() {
    const dialogRef = this.dialog.open(UserDialogComponent, {restoreFocus: false});

    // Manually restore focus to the menu trigger since the element that
    // opens the dialog won't be in the DOM any more when the dialog closes.
    dialogRef.afterClosed().subscribe(() => this.menuTrigger.focus());
  }

  mouseleave() {
    if (!this.isExpanded) {
      this.isShowing = false;
    }
  }
}
