import { Routes } from '@angular/router';
import { LoginPageComponent } from './components/login-page/login-page.component';
import { ProjectListComponent } from './components/project-list/project-list.component';
import { SignupPageComponent } from './components/signup-page/signup-page.component';
import { ProjectDetailComponent } from './components/project-detail/project-detail.component';

export const routes: Routes = [
  { path: '', component: ProjectListComponent },
  { path: 'login', component: LoginPageComponent },
  { path: 'signup', component: SignupPageComponent },
  { path: 'project/:id', component: ProjectDetailComponent },
//   { path: 'project/:projectId/task/:taskId', component: TaskDetailComponent },
  { path: '**', redirectTo: '' },
];
