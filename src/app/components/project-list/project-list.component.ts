import { Component, OnInit, signal } from '@angular/core';
import { MatListModule } from '@angular/material/list';
import { RouterModule, RouterLink, ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatExpansionModule } from '@angular/material/expansion';

import { Project } from '../../types/Project';
import { LocalStorageService } from '../../services/local-storage.service';
import { StatusChipComponent } from '../status-chip/status-chip.component';

@Component({
  selector: 'project-list',
  imports: [
    MatListModule,
    RouterModule,
    CommonModule,
    RouterLink,
    MatIconModule,
    MatButtonModule,
    MatToolbarModule,
    MatSidenavModule,
    MatCardModule,
    MatChipsModule,
    MatGridListModule,
    StatusChipComponent,
    MatExpansionModule,
  ],
  templateUrl: './project-list.component.html',
  styleUrl: './project-list.component.css',
})
export class ProjectListComponent implements OnInit {
  projects: Project[] = [];
  readonly panelOpenState = signal(false);

  constructor(private localStorageService: LocalStorageService) {
    this.projects = localStorageService.getProjects();
  }

  ngOnInit(): void {}

  removeProject(projectId: number) {
    if (confirm('Tem certeza que deseja remover este projeto?') && projectId) {
      this.localStorageService.removeProject(projectId);
      this.projects = this.localStorageService.getProjects();
    }
  }

  editProject() {
    alert('card');
  }
}
