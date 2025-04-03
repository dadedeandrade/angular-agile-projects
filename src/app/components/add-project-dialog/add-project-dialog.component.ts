import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { provideNativeDateAdapter } from '@angular/material/core';

import {
  MatDialogRef,
  MatDialogContent,
  MatDialogActions,
} from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelect, MatOption } from '@angular/material/select';
import { CommonModule } from '@angular/common';

import { ProjectService } from '../../services/project.service';

import { ProjectFormGroup } from '../../types/Project';
import completedDateValidator from '../../helpers/complete-date-validator';

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
    CommonModule,
  ],
  providers: [provideNativeDateAdapter()],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddProjectDialogComponent implements OnInit {
  projectForm!: FormGroup;

  constructor(
    private dialogRef: MatDialogRef<AddProjectDialogComponent>,
    private projectDataService: ProjectService
  ) {}

  ngOnInit(): void {
    this.projectForm = new FormGroup<ProjectFormGroup>({
      id: new FormControl(1),
      name: new FormControl('', Validators.required),
      description: new FormControl(''),
      status: new FormControl('Em andamento'),
      createdAt: new FormControl(new Date().toISOString().split('T')[0]),
      completedAt: new FormControl(null),
      tasks: new FormControl([]),
    });
    this.setupConditionalValidation();
  }

  private setupConditionalValidation(): void {
    const statusControl = this.projectForm.get('status');
    const completedAtControl = this.projectForm.get('completedAt');
    const createdAtControl = this.projectForm.get('createdAt');

    statusControl?.valueChanges.subscribe((status) => {
      if (status === 'Concluído') {
        completedAtControl?.setValidators([
          Validators.required,
          completedDateValidator(createdAtControl),
        ]);
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
      this.projectDataService.addNewProject(this.projectForm.value);
      this.dialogRef.close(this.projectForm.value);
    }
    this.projectForm.markAllAsTouched();
  }
}
