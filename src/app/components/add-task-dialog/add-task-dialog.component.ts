import { Component, Inject, OnInit } from '@angular/core';
import {
  FormBuilder,
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
import { Task } from '../../types/Task';

@Component({
  selector: 'app-add-task-dialog',
  templateUrl: './add-task-dialog.component.html',
  styleUrls: ['./add-task-dialog.component.scss'],
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

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<AddTaskDialogComponent>,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.taskForm = this.fb.nonNullable.group<Task>({
      id: 0,
      title: '',
      description: '',
      priority: 'Média',
      status: 'Pendente',
    });
  }

  closeDialog(): void {
    this.dialogRef.close(null);
  }

  addTask(): void {
    if (this.taskForm.valid) {
      this.dialogRef.close(this.taskForm.value);
      console.log(this.taskForm.value);
      
    }
  }
}
