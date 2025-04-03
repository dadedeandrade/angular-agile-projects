import { Component, Input } from '@angular/core';
import { Task } from '../../types/Task';
import { MatCardModule } from '@angular/material/card';
import { MatIcon } from '@angular/material/icon';
import { MatChipSet } from '@angular/material/chips';
import { StatusChipComponent } from '../status-chip/status-chip.component';
import { MatButtonModule } from '@angular/material/button';
import { ProjectService } from '../../services/project.service';

@Component({
  selector: 'app-task-card',
  templateUrl: './task-card.component.html',
  styleUrls: ['./task-card.component.css'],
  imports: [
    MatCardModule,
    MatIcon,
    MatChipSet,
    StatusChipComponent,
    MatButtonModule,
    MatCardModule,
  ],
})
export class TaskCardComponent {
  @Input() task!: Task;
  @Input() projectId!: number;

  constructor(private projectService: ProjectService) {}

  handleTaskDeleteClick() {
    if (confirm('Tem certeza que deseja remover esta tarefa?')) {
      this.projectService.removeTask(this.projectId, this.task.id);
    }
  }
}
