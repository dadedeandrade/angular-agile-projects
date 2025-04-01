import { Component, OnInit } from '@angular/core';
import { MatListModule } from '@angular/material/list';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';

import { ProjectService } from '../../services/project.service';
import { Project } from '../../types/Project';
import { LocalStorageService } from '../../services/local-storage.service';

@Component({
  selector: 'project-list',
  imports: [
    MatListModule,
    RouterModule,
    CommonModule,
    MatIconModule,
    MatButtonModule,
    MatToolbarModule,
    MatSidenavModule,
  ],
  templateUrl: './project-list.component.html',
  styleUrl: './project-list.component.css',
})
export class ProjectListComponent implements OnInit {
  projects: Project[] = [];

  constructor(
    private projectService: ProjectService,
    localStorageService: LocalStorageService
  ) {
    this.projects = localStorageService.getProjects();
  }

  ngOnInit(): void {}

  removeProject(project: Project) {
    console.log('Removendo [projeto]...');
    this.projects = this.projectService.remove(this.projects, project);
  }
}
