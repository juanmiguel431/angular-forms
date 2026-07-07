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
  private static key = 'saved-login-form';

  constructor() {
    afterNextRender(() =>{
      const savedForm = window.localStorage.getItem(LoginComponent.key);
      if (savedForm) {
        const data = JSON.parse(savedForm) as { email: string };

        setTimeout(() => {
          this.form().setValue({ email: data.email, password: '' });
        });
      }

      const subscription = this.form()
        .valueChanges
        ?.pipe(debounceTime(500))
        .subscribe({
          next: (value: FormType) => {
            console.log(value);
            window.localStorage.setItem(LoginComponent.key, JSON.stringify({ email: value.email }));
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
