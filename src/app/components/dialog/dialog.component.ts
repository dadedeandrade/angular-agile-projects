import { Component, Inject, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import {
  MAT_DIALOG_DATA,
  MatDialogRef,
  MatDialogContent,
  MatDialogActions,
} from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatOption, MatSelect } from '@angular/material/select';
import { LocalStorageService } from '../../services/local-storage.service';
import { Project } from '../../types/Project';
@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css'],
  imports: [
    MatFormFieldModule,
    MatCheckboxModule,
    MatInputModule,
    MatButtonModule,
    MatDialogContent,
    MatSelect,
    MatOption,
    MatDialogActions,
    ReactiveFormsModule,
  ],
})
export class DialogComponent implements OnInit {
  myform!: FormGroup;
  isCompletedAtRequired: boolean = false;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private ref: MatDialogRef<DialogComponent>,
    private fb: FormBuilder,
    private localStorageService: LocalStorageService
  ) {}

  ngOnInit(): void {
    this.myform = this.fb.nonNullable.group<Project>({
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
    this.myform.get('status')?.valueChanges.subscribe((status) => {
      const completedAtControl = this.myform.get('completedAt');

      if (status === 'Concluído') {
        completedAtControl?.setValidators(Validators.required);
      } else {
        completedAtControl?.clearValidators();
      }

      completedAtControl?.updateValueAndValidity();
    });
  }

  closeDialog() {
    this.ref.close('Closed using function');
  }

  addNewProject() {
    if (this.myform.valid) {
      this.ref.close(this.myform.value);
      this.localStorageService.addNewProject(this.myform.value);
    }
  }
}
