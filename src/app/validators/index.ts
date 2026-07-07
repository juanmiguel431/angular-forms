import { AbstractControl } from '@angular/forms';
import { of } from 'rxjs';

export function mustContainQuestionMarkValidator(control: AbstractControl) {
  if (control.value.includes('?')) {
    return null;
  }

  return { doesNotContainQuestionMark: true };
}

export function emailIsUniqueValidator(control: AbstractControl) {

  if (control.value !== 'test@test.com') {
    return of(null);
  }

  return of({ notUnique: true });
}
