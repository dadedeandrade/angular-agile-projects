import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
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

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private ref: MatDialogRef<DialogComponent>,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.myform = this.fb.group({
      name: [''],
      description: [''],
      status: ['Em andamento'],
      createdAt: [new Date().toISOString().split('T')[0]],
      completedAt: [null],
    });
  }

  closeDialog() {
    this.ref.close('Closed using function');
  }

  saveProject() {
    if (this.myform.valid) {
      console.log(this.myform.value);
      this.ref.close(this.myform.value);
    }
  }
}
