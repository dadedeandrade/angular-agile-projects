import { Subscription } from 'rxjs';
import { Component, OnInit, OnDestroy, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import {
  MatBottomSheet,
  MatBottomSheetModule,
} from '@angular/material/bottom-sheet';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { CommonModule } from '@angular/common';
import { MatChipsModule } from '@angular/material/chips';
import { MatButtonModule } from '@angular/material/button';

import { ResponsiveService } from '../../services/responsive.service';
import { ProjectService } from '../../services/project.service';
import { DialogService } from '../../services/dialog.service';

import { EditProjectBottomSheet } from '../edit-project-bottomsheet/edit-project-bottomsheet';
import { StatusChipComponent } from '../status-chip/status-chip.component';
import { TaskCardComponent } from '../task-card/task-card.component';

import { Project } from '../../types/Project';

@Component({
  selector: 'project-detail',
  templateUrl: 'project-detail.component.html',
  styleUrl: 'project-detail.component.css',
  standalone: true,
  imports: [
    MatToolbarModule,
    MatIconModule,
    MatSidenavModule,
    MatListModule,
    MatChipsModule,
    CommonModule,
    StatusChipComponent,
    TaskCardComponent,
    MatBottomSheetModule,
    MatButtonModule,
  ],
})
export class ProjectDetailComponent implements OnInit, OnDestroy {
  selectedProject: Project | undefined = undefined;
  private subscription!: Subscription;
  isMobile: boolean = false;
  private bottomSheet = inject(MatBottomSheet);

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private projectService: ProjectService,
    private responsiveService: ResponsiveService,
    private dialogService: DialogService
  ) {}

  ngOnInit() {
    const projectId = this.route.snapshot.params['projectId'];

    this.subscription = this.projectService.projectsSubject.subscribe(
      (state) => {
        this.selectedProject = state.projects.find((el) => el.id == projectId);

        if (!this.selectedProject) {
          this.router.navigate(['']);
        }
      }
    );

    this.subscription = this.responsiveService.isMobile$.subscribe(
      (isMobile) => (this.isMobile = isMobile)
    );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  handleAddTaskClick() {
    this.dialogService.triggerOpenTaskDialog();
  }

  handleEditProjectClick() {
    this.bottomSheet.open(EditProjectBottomSheet, {
      data: this.selectedProject,
    });
  }
}
