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
import { StatusChipComponent } from '../status-chip/status-chip.component';
import { ProjectService } from '../../services/project.service';

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

  constructor(private projectDataService: ProjectService) {
    this.projects = projectDataService.getProjects();
  }

  ngOnInit(): void {}

  handleRemoveProjectClick(projectId: number) {
    if (confirm('Tem certeza que deseja remover este projeto?') && projectId) {
      this.projectDataService.removeProject(projectId);
      this.projects = this.projectDataService.getProjects();
    }
  }
}
