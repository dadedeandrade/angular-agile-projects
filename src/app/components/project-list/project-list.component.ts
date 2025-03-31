import { Component, OnInit } from '@angular/core';
import { MatListModule } from '@angular/material/list';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

import { ProjectService } from '../../services/project.service';
import { Project } from '../../types/Project';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '../dialog/dialog.component';

@Component({
  selector: 'app-project-list',
  imports: [MatListModule, RouterModule, CommonModule],
  templateUrl: './project-list.component.html',
  styleUrl: './project-list.component.css',
})
export class ProjectListComponent implements OnInit {
  projects: Project[] = [];

  constructor(
    private projectService: ProjectService,
    private dialog: MatDialog
  ) {
    this.getProjects();
  }

  ngOnInit(): void {}

  removeProject(project: Project) {
    console.log('Removendo [projeto]...');
    this.projects = this.projectService.remove(this.projects, project);
  }

  getProjects(): void {
    this.projectService
      .getAll()
      .subscribe((projects) => (this.projects = projects));
  }

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
