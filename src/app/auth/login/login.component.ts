import { afterNextRender, Component, DestroyRef, inject, viewChild } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { debounceTime } from 'rxjs';

type FormType = {
  email: string;
  password: string;
}

@Component({
  selector: 'app-login',
  standalone: true,
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
  imports: [FormsModule],
})
export class LoginComponent {
  private form = viewChild.required<NgForm>('form');
  private destroyRef = inject(DestroyRef);

  constructor() {
    afterNextRender(() =>{
      const subscription = this.form()
        .valueChanges
        ?.pipe(debounceTime(500))
        .subscribe({
          next: (value: FormType) => {
            console.log(value);
            window.localStorage.setItem('saved-login-form', JSON.stringify({ email: value.email }));
          },
        });

      this.destroyRef.onDestroy(() => subscription?.unsubscribe());
    })
  }


  protected onSubmitForm(formData: NgForm) {
    console.log(formData.status);
    if (formData.invalid) {
      return;
    }

    console.log(formData);
    console.log(formData.value);
    console.log(formData.form.value);

    formData.resetForm();
  }
}
