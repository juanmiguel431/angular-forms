import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
  imports: [ReactiveFormsModule],
})
export class LoginComponent {
  protected form = new FormGroup({
    email: new FormControl(''),
    password: new FormControl(''),
  });

  protected onSubmit() {
    console.log(this.form.value);
  }
}
