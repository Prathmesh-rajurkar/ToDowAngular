import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  registerForm: FormGroup;

  constructor(private fb: FormBuilder, private auth: AuthService, private router: Router) {
    this.registerForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      role: ['user']  // default role
    });
  }

  onSubmit() {
    if (this.registerForm.invalid) return;

    const formValue = this.registerForm.value;

    // Automatically assign admin role if specific email is used
    if (formValue.email === 'admin@example.com') {
      formValue.role = 'admin';
    }

    const success = this.auth.register(formValue);
    if (success) {
      alert('Registered! Now login.');
      this.router.navigate(['/login']);
    } else {
      alert('User already exists.');
    }
  }
}
