import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Component, Inject } from '@angular/core';

import {
  MAT_BOTTOM_SHEET_DATA,
  MatBottomSheetRef,
} from '@angular/material/bottom-sheet';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatOption, MatSelect } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';

import { ProjectService } from '../../services/project.service';

import { Project } from '../../types/Project';
import completedDateValidator from '../../helpers/complete-date-validator';

@Component({
  selector: 'edit-project-bottomsheet',
  templateUrl: 'edit-project-bottomsheet.html',
  styleUrls: ['./edit-project-bottomsheet.css'],
  imports: [
    MatListModule,
    MatFormFieldModule,
    MatSelect,
    MatOption,
    CommonModule,
    MatInputModule,
    MatButtonModule,
    ReactiveFormsModule,
  ],
})
export class EditProjectBottomSheet {
  projectForm!: FormGroup;

  constructor(
    private bottomSheetRef: MatBottomSheetRef<EditProjectBottomSheet>,
    private projectService: ProjectService,
    @Inject(MAT_BOTTOM_SHEET_DATA) public projectToEdit: Project
  ) {
    this.bottomSheetRef.disableClose = true;
  }

  ngOnInit(): void {
    this.projectForm = new FormGroup({
      name: new FormControl(this.projectToEdit.name, Validators.required),
      description: new FormControl(this.projectToEdit.description),
      status: new FormControl(this.projectToEdit.status),
      createdAt: new FormControl(this.projectToEdit.createdAt),
      completedAt: new FormControl(this.projectToEdit.completedAt),
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

  handleEditProjectButton(event: Event) {
    event.preventDefault();

    if (this.projectForm.valid) {
      const updatedProject: Project = {
        ...this.projectToEdit,
        ...this.projectForm.value,
      };

      if (updatedProject.status !== 'Concluído') {
        updatedProject.completedAt = null;
      }

      this.projectService.editProject(updatedProject);
      this.bottomSheetRef.dismiss();
    }
  }

  handleCancelEditProjectButton(event: Event): void {
    event.preventDefault();
    this.projectForm.reset();
    this.bottomSheetRef.dismiss();
  }
}
