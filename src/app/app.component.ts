import { Component } from '@angular/core';
import { NavigationEnd, Router, RouterModule, RouterOutlet } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from './components/dialog/dialog.component';
import { MatButtonModule } from '@angular/material/button';
import { filter, distinctUntilChanged } from 'rxjs/operators';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';
import { ResponsiveService } from './services/responsive.service';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    MatToolbarModule,
    MatButtonModule,
    CommonModule,
    MatIcon,
    RouterModule
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

  constructor(
    private dialog: MatDialog,
    private router: Router,
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
      .subscribe((event) => this.updatePageFlags(event.urlAfterRedirects));
  }
  private updatePageFlags(url: string): void {
    this.isHome = url.startsWith('/home');
    this.isProjectPage = url.startsWith('/project');
    this.isTaskPage = url.includes('/task');
  }

  openAddDialogProject() {
    this.openDialog(DialogComponent);
  }

  openDialog(component: any) {
    this.dialog
      .open(component)
      .afterClosed()
      .subscribe((item) => {
        console.log('Dados afterclose', item);
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
