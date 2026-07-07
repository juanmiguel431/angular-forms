import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { emailIsUniqueValidator, mustContainQuestionMarkValidator } from '../../validators';
import { debounceTime } from 'rxjs';

type FormType = {
  email: string;
  password: string;
};

@Component({
  selector: 'app-login',
  standalone: true,
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
  imports: [ReactiveFormsModule],
})
export class LoginComponent implements OnInit {
  protected form = new FormGroup({
    email: new FormControl('', {
      validators: [Validators.required, Validators.email],
      asyncValidators: [emailIsUniqueValidator],
    }),
    password: new FormControl('', {
      validators: [
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(20),
        mustContainQuestionMarkValidator,
      ],
    }),
  });

  private destroyRef = inject(DestroyRef);
  private static key = 'saved-login-form';

  ngOnInit(): void {
    const savedForm = window.localStorage.getItem(LoginComponent.key);
    if (savedForm) {
      const data = JSON.parse(savedForm) as { email: string };
      this.form.setValue({ email: data.email, password: '' });
    }

    const subscription = this.form.valueChanges.pipe(debounceTime(500)).subscribe({
      next: (value) => {
        console.log(value);
        window.localStorage.setItem(LoginComponent.key, JSON.stringify({ email: value.email }));
      },
    });

    this.destroyRef.onDestroy(() => subscription?.unsubscribe());
  }

  protected get formIsInvalid() {
    return (
      this.form.controls.email.touched && this.form.controls.password.touched && this.form.invalid
    );
  }

  protected get emailIsInvalid() {
    return (
      this.form.controls.email.touched &&
      this.form.controls.email.dirty &&
      this.form.controls.email.invalid
    );
  }

  protected get passwordIsInvalid() {
    return (
      this.form.controls.password.touched &&
      this.form.controls.password.dirty &&
      this.form.controls.password.invalid
    );
  }

  protected onSubmit() {
    console.log(this.form.value);
  }
}
