import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Project } from '../types/Project';

@Injectable({
  providedIn: 'root',
})

export class ProjectService {

  private apiUrl = 'http://localhost:3001/projects';

  constructor(private http: HttpClient) {}

  remove(projects: Project[], project: Project) {
    return projects.filter((a) => project.name !== a.name);
  }

  getAll(): Observable<Project[]> {
    return this.http.get<Project[]>(this.apiUrl);
  }

  getItem(id: number): Observable<Project> {
    return this.http.get<Project>(`${this.apiUrl}/${id}`);
  }
}
