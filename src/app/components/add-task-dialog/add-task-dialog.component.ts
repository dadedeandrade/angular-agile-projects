import { Component, Inject, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
} from '@angular/forms';
import {
  MAT_DIALOG_DATA,
  MatDialogRef,
  MatDialogContent,
  MatDialogActions,
} from '@angular/material/dialog';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';

import { ProjectService } from '../../services/project.service';

import { TaskFormGroup } from '../../types/Task';

@Component({
  selector: 'app-add-task-dialog',
  templateUrl: './add-task-dialog.component.html',
  styleUrls: ['./add-task-dialog.component.css'],
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatDialogContent,
    MatDialogActions,
    MatSelectModule,
    ReactiveFormsModule,
  ],
})
export class AddTaskDialogComponent implements OnInit {
  taskForm!: FormGroup;
  projectId!: number;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<AddTaskDialogComponent>,
    private projectDataService: ProjectService 
  ) {
    this.projectId = data.projectId;
  }

  ngOnInit(): void {
    this.taskForm = new FormGroup<TaskFormGroup>({
      id: new FormControl(0),
      title: new FormControl(''),
      description: new FormControl(''),
      priority: new FormControl('Média'),
      status: new FormControl('Pendente'),
    });
  }

  closeDialog(): void {
    this.dialogRef.close(null);
  }

  addTask(): void {
    if (this.taskForm.valid) {
      this.projectDataService.addTaskToProject(this.projectId, this.taskForm.value);
      this.dialogRef.close(this.taskForm.value);
    }
  }
}
