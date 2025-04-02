import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import {
  MatDialogRef,
  MatDialogContent,
  MatDialogActions,
} from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelect, MatOption } from '@angular/material/select';
import { LocalStorageService } from '../../services/local-storage.service';
import { Project } from '../../types/Project';

@Component({
  selector: 'app-add-project-dialog',
  templateUrl: './add-project-dialog.component.html',
  styleUrls: ['./add-project-dialog.component.css'],
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatDialogContent,
    MatSelect,
    MatOption,
    MatDialogActions,
    ReactiveFormsModule,
  ],
})
export class AddProjectDialogComponent implements OnInit {
  projectForm!: FormGroup;
  
  constructor(
    private dialogRef: MatDialogRef<AddProjectDialogComponent>,
    private fb: FormBuilder,
    private localStorageService: LocalStorageService
  ) {}

  ngOnInit(): void {
    this.projectForm = this.fb.nonNullable.group<Project>({
      id: 1,
      name: '',
      description: '',
      status: 'Em andamento',
      createdAt: new Date().toISOString().split('T')[0],
      completedAt: null,
      tasks: [],
    });
    this.setupConditionalValidation();
  }

  private setupConditionalValidation(): void {
    this.projectForm.get('status')?.valueChanges.subscribe((status) => {
      const completedAtControl = this.projectForm.get('completedAt');
      if (status === 'Concluído') {
        completedAtControl?.setValidators(Validators.required);
      } else {
        completedAtControl?.clearValidators();
      }
      completedAtControl?.updateValueAndValidity();
    });
  }

  closeDialog() {
    this.dialogRef.close();
  }

  addNewProject() {
    if (this.projectForm.valid) {
      this.localStorageService.addNewProject(this.projectForm.value);
      this.dialogRef.close(this.projectForm.value);
    }
  }
}
