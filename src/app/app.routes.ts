import { Routes } from '@angular/router';
import { LoginPageComponent } from './components/login-page/login-page.component';
import { SignupPageComponent } from './components/signup-page/signup-page.component';
import { ProjectDetailComponent } from './components/project-detail/project-detail.component';
import { HomePageComponent } from './components/home-page/home-page.component';

export const routes: Routes = [
  { path: '', component: HomePageComponent },
  { path: 'login', component: LoginPageComponent },
  { path: 'signup', component: SignupPageComponent },
  { path: 'project/:id', component: ProjectDetailComponent },
  //   { path: 'project/:projectId/task/:taskId', component: TaskDetailComponent },
  { path: '**', redirectTo: '' },
];
