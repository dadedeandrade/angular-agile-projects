import { Project } from '../types/Project';

export function generateUniqueId(projects: Project[]): number {
  return projects.length > 0 ? Math.max(...projects.map((p) => p.id)) + 1 : 1;
}

export function generateUniqueIdForTasks(project: Project): number {
  return project.tasks.length > 0
    ? Math.max(...project.tasks.map((p) => p.id)) + 1
    : 1;
}
