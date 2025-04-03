import { Injectable } from '@angular/core';
import { Project } from '../types/Project';
import { BehaviorSubject } from 'rxjs';
import { generateUniqueId } from '../helpers/id-generator';
import { Task } from '../types/Task';

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
    this.projectsSubject.next({ projects }); // 🔥 Notify subscribers
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

  addNewTask(projectId: number, task: Task) {
    const projects = this.getProjects();
    const selectedProjectForTheTask = projects.find((el) => el.id == projectId);

    if (selectedProjectForTheTask) {
      selectedProjectForTheTask.tasks.push(task);
      this.saveNewTask(selectedProjectForTheTask);
    } else {
      alert(`deu ruim no addnewtask`);
    }
  }

  saveNewTask(projectWithTheTask: Project): void {
    const projects = this.getProjects();

    const index = projects.findIndex((el) => el.id === projectWithTheTask.id);
    if (index !== -1) {
      projects[index] = projectWithTheTask;
      localStorage.setItem(this.storageKey, JSON.stringify({ projects }));
    } else {
      alert(`deu ruim no saveTask`);
    }
  }

  removeProject(projectId: number): void {
    const projects = this.getProjects().filter(
      (project) => project.id !== projectId
    );
    this.saveProjects(projects);
  }
}
