import { Component } from '@angular/core';
import { MatListModule } from '@angular/material/list';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { ProjectListComponent } from '../../components/project-list/project-list.component';

@Component({
  selector: 'app-home-page',
  imports: [
    MatListModule,
    RouterModule,
    CommonModule,
    MatIconModule,
    MatSidenavModule,
    RouterModule,
    ProjectListComponent,
  ],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.css',
})
export class HomePageComponent {}
