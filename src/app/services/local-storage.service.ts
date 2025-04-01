import { Injectable } from '@angular/core';
import { Project } from '../types/Project';
import { BehaviorSubject } from 'rxjs';

interface Test {
  projects: Project[];
}

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
  private storageKey = 'projects';
  private projectsSubject = new BehaviorSubject<Test>(
    this.getProjectsFromLocalStorage()
  );

  constructor() {}

  private getProjectsFromLocalStorage(): any {
    const data = localStorage.getItem('projects');
    return data ? JSON.parse(data) : { projects: [] };
  }

  getProjects(): Project[] {
    return this.projectsSubject.getValue().projects;
  }

  saveProjects(projects: Project[]): void {
    localStorage.setItem(this.storageKey, JSON.stringify({ projects }));
  }

  addNewProject(newProject: Project): void {
    const projects = this.getProjects();
    projects.push(newProject);
    this.saveProjects(projects);
  }
}
