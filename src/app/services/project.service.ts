import { Injectable } from '@angular/core';
import { Project } from '../types/Project';
import { BehaviorSubject } from 'rxjs';
import { Task } from '../types/Task';
import {
  generateUniqueId,
  generateUniqueIdForTasks,
} from '../helpers/id-generator';

interface ProjectState {
  projects: Project[];
}

@Injectable({
  providedIn: 'root',
})
export class ProjectService {
  private storageKey = 'projects';
  private projectsSubject = new BehaviorSubject<ProjectState>(
    this.loadProjects()
  );

  constructor() {}

  private loadProjects(): ProjectState {
    const data = localStorage.getItem(this.storageKey);
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

  updateProjects(projects: Project[]): void {
    localStorage.setItem(this.storageKey, JSON.stringify({ projects }));
    this.projectsSubject.next({ projects });
  }

  addNewProject(newProject: Project): void {
    const projects = this.getProjects();
    const projectWithId: Project = {
      ...newProject,
      id: generateUniqueId(projects),
    };
    projects.push(projectWithId);
    this.updateProjects(projects);
  }

  addTaskToProject(projectId: number, task: Task) {
    const projects = this.getProjects();
    const selectedProjectForTheTask = projects.find((el) => el.id == projectId);
    if (!selectedProjectForTheTask) {
      return alert(`deu ruim no addTaskToProject`);
    }
    const taskWithId: Task = {
      ...task,
      id: generateUniqueIdForTasks(selectedProjectForTheTask),
    };

    console.log(taskWithId);

    selectedProjectForTheTask.tasks.push(taskWithId);
    this.saveNewTask(selectedProjectForTheTask);
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
    this.updateProjects(projects);
  }

  removeTask(projectId: number, taskId: number): void {
    const projects = this.getProjects();
    const project = projects.find((el) => el.id === projectId);

    console.log(projectId);

    console.log(project);
    console.log(projects);

    if (project) {
      project.tasks = project.tasks.filter((task) => task.id !== taskId);
      this.updateProjects(projects);
    } else {
      alert(`deu ruim no removeTask.`);
    }
  }
}
