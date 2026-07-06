import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
  imports: [FormsModule],
})
export class LoginComponent {

  protected onSubmitForm(formData: NgForm) {
    console.log(formData.status);
    if (formData.invalid) {
      return;
    }

    console.log(formData);
    console.log(formData.value);
    console.log(formData.form.value);
  }
}
