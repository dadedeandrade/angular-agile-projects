import { Component } from '@angular/core';
import {
  ActivatedRoute,
  NavigationEnd,
  Router,
  RouterModule,
  RouterOutlet,
} from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatDialog } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { filter, distinctUntilChanged } from 'rxjs/operators';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';
import { ResponsiveService } from './services/responsive.service';
import { MatIcon } from '@angular/material/icon';
import { AddProjectDialogComponent } from './components/add-project-dialog/add-project-dialog.component';
import { AddTaskDialogComponent } from './components/add-task-dialog/add-task-dialog.component';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    MatToolbarModule,
    MatButtonModule,
    CommonModule,
    MatIcon,
    RouterModule,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  isHome: boolean = false;
  isProjectPage: boolean = false;
  isTaskPage: boolean = false;
  subscription!: Subscription;
  isMobile: boolean = false;
  currentProjectId: number | undefined = undefined;

  constructor(
    private dialog: MatDialog,
    private router: Router,
    private route: ActivatedRoute,
    private responsiveService: ResponsiveService
  ) {
    this.router.events
      .pipe(
        filter(
          (event): event is NavigationEnd => event instanceof NavigationEnd
        ),
        distinctUntilChanged(
          (prev, curr) => prev.urlAfterRedirects === curr.urlAfterRedirects
        )
      )
      .subscribe((event) => {
        const projectId = this.route.snapshot.firstChild?.params['projectId'];
        this.currentProjectId = projectId ? Number(projectId) : undefined;
        this.updatePageFlags(event.urlAfterRedirects);
      });
  }
  private updatePageFlags(url: string): void {
    this.isHome = url.startsWith('/home');
    this.isProjectPage = url.startsWith('/project');
    this.isTaskPage = url.includes('/task');
  }

  openAddProjectDialog() {
    this.dialog.open(AddProjectDialogComponent);
  }

  openAddTaskDialog(projectId: number | undefined) {
    this.dialog.open(AddTaskDialogComponent, {
      data: { projectId },
    });
  }

  ngOnInit() {
    this.subscription = this.responsiveService.isMobile$.subscribe(
      (isMobile) => {
        this.isMobile = isMobile;
      }
    );
  }
}
