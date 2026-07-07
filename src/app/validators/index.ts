import { AbstractControl } from '@angular/forms';
import { delay, map, of } from 'rxjs';

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

// export async function emailIsUniqueValidator(control: AbstractControl) {
//   await new Promise((r) => setTimeout(r, 3000));
//
//   if (control.value !== 'test@test.com') {
//     return null;
//   }
//
//   return { notUnique: true };
// }

// export function emailIsUniqueValidator(control: AbstractControl) {
//   return of(control.value).pipe(
//     delay(3000),
//     map((value) => {
//       if (value !== 'test@test.com') {
//         return null;
//       }
//
//       return { notUnique: true };
//     }),
//   );
// }
