import { Component, OnInit } from '@angular/core';
import { MatListModule } from '@angular/material/list';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

import { ProjectService } from '../../services/project.service';
import { JsonPipe } from '@angular/common';
import { Project } from '../../types/Project';

@Component({
  selector: 'app-project-list',
  imports: [MatListModule, RouterModule, JsonPipe, CommonModule],
  templateUrl: './project-list.component.html',
  styleUrl: './project-list.component.css',
})
export class ProjectListComponent implements OnInit {

  projects: Project[] = [];

  constructor(private projectService: ProjectService) {
    this.getProjects();
  }

  ngOnInit(): void {}

  removeProject(project: Project) {
    console.log('Removendo [projeto]...');
    this.projects = this.projectService.remove(this.projects, project);
  }

  getProjects(): void {
    this.projectService.getAll().subscribe((projects) => (this.projects = projects));
  }
  
}
