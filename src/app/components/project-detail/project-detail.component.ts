import { Component } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { Project } from '../../types/Project';
import { ProjectService } from '../../services/project.service';
import { CommonModule, JsonPipe } from '@angular/common';

@Component({
  selector: 'app-project-detail',
  imports: [RouterModule, CommonModule, JsonPipe],
  templateUrl: './project-detail.component.html',
  styleUrl: './project-detail.component.css',
})
export class ProjectDetailComponent {
  selectedProject?: Project;

  constructor(
    private projectService: ProjectService,
    private route: ActivatedRoute
  ) {
    this.getProject();
  }

  NgOnInit(): void {}

  getProject() {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.projectService
      .getItem(id)
      .subscribe((project) => (this.selectedProject = project));
  }
}
