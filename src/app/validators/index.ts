import { AbstractControl } from '@angular/forms';

export function mustContainQuestionMarkValidator(control: AbstractControl) {
  if (control.value.includes('?')) {
    return null;
  }

  return { doesNotContainQuestionMark: true };
}
