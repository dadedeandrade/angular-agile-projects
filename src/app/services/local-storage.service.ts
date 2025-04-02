import { Injectable } from '@angular/core';
import { Project } from '../types/Project';
import { BehaviorSubject } from 'rxjs';
import { generateUniqueId } from '../helpers/id-generator';

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
  getProjectById(id: number): Project | undefined {
    return this.projectsSubject
      .getValue()
      .projects.find((el) => el.id === Number(id));
  }

  saveProjects(projects: Project[]): void {
    localStorage.setItem(this.storageKey, JSON.stringify({ projects }));
  }

  addNewProject(newProject: Project): void {
    const projects = this.getProjects();
    const projectWithId: Project = {
      ...newProject,
      id: generateUniqueId(projects),
    };
    projects.push(projectWithId);
    this.saveProjects(projects);
  }
}
