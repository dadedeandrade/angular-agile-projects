import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { ResponsiveService } from '../../services/responsive.service';
import { Subscription } from 'rxjs';
import { CommonModule } from '@angular/common';
import { StatusChipComponent } from '../status-chip/status-chip.component';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { TaskCardComponent } from '../task-card/task-card.component';
import { ProjectService } from '../../services/project.service';

@Component({
  selector: 'project-detail',
  templateUrl: 'project-detail.component.html',
  styleUrl: 'project-detail.component.css',
  imports: [
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatSidenavModule,
    MatListModule,
    CommonModule,
    StatusChipComponent,
    MatCardModule,
    MatChipsModule,
    TaskCardComponent,
  ],
})
export class ProjectDetailComponent {
  selectedProject;
  subscription!: Subscription;
  isMobile: boolean = false;

  constructor(
    private route: ActivatedRoute,
    projectDataService: ProjectService,
    private responsiveService: ResponsiveService
  ) {
    const projectId = this.route.snapshot.params['projectId'];
    this.selectedProject = projectDataService.getProjectById(projectId);
  }
  ngOnInit() {
    this.subscription = this.responsiveService.isMobile$.subscribe(
      (isMobile) => {
        this.isMobile = isMobile;
      }
    );
  }
}
