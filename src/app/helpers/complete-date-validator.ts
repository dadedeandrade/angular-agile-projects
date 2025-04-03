import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export default function completedDateValidator(
  createdAtControl: AbstractControl | null
): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    if (!createdAtControl) return null;

    const completedAt = control.value;
    const createdAt = createdAtControl.value;

    if (
      completedAt &&
      createdAt &&
      new Date(completedAt) < new Date(createdAt)
    ) {
      return { completedDateInvalid: true };
    }
    return null;
  };
}
