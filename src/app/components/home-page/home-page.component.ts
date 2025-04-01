import { Component } from '@angular/core';
import { MatListModule } from '@angular/material/list';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { DialogComponent } from '../dialog/dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { ProjectListComponent } from "../project-list/project-list.component";

@Component({
  selector: 'app-home-page',
  imports: [
    MatListModule,
    RouterModule,
    CommonModule,
    MatIconModule,
    MatButtonModule,
    MatToolbarModule,
    MatSidenavModule,
    RouterModule,
    ProjectListComponent
],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.css',
})
export class HomePageComponent {
  constructor(private dialog: MatDialog) {}

  openAddDialogProject() {
    this.openDialog(DialogComponent);
  }

  openDialog(component: any) {
    let dialog = this.dialog.open(component);
    dialog.afterClosed().subscribe((item) => {
      console.log('Dados afterclose', item);
    });
  }
}
