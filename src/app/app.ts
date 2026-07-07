import { Component, signal } from '@angular/core';
import { LoginComponent } from './auth/login-reactive-form/login.component';
import { SignupComponent } from './auth/signup/signup.component';

@Component({
  selector: 'app-root',
  imports: [LoginComponent, SignupComponent],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {}
