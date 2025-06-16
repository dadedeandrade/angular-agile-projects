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
import { DialogService } from './services/dialog.service';

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
  projectId: number | undefined = undefined;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private responsiveService: ResponsiveService,
    private dialog: MatDialog,
    private dialogService: DialogService
  ) {
    this.dialogService.openProjectDialog$.subscribe(() => {
      this.openAddTaskDialog(this.projectId);
    });
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
        this.projectId = this.route.snapshot.firstChild?.params['projectId'];
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

    window.alert('Projeto desenvolvido em 3 dias para testar habilidades em angular.\nO objetivo é permitir a criação, edição e organização de projetos e tarefas de forma intuitiva e eficiente.')
    window.alert('Tecnologias Utilizadas\n* *Angular*: Framework principal para o desenvolvimento do frontend.\n* *Angular Material*: Para estilização e componentes modernos.\n* *Local Storage*: Persistência de dados sem necessidade de backend.\n* *TypeScript*: Para um código mais seguro e tipado.')
    window.alert('Funcionalidades\n* Criar, editar e excluir projetos.\n* Criar e excluir tarefas.\n* Definir status dos projetos: _Planejado, Em andamento, Concluído_.\n* Cada projeto pode conter múltiplas tarefas.\n* Validações para garantir integridade dos dados.\n* Armazenamento local via LocalStorage.')
  }
}
