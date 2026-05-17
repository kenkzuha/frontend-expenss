import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, AbstractControl, ValidationErrors } from '@angular/forms';
import { AuthLayoutComponent } from '../../shared/components/auth-layout/auth-layout.component';

function passwordStrength(control: AbstractControl): ValidationErrors | null {
  const val: string = control.value ?? '';
  if (val.length < 8) return null;
  const hasUpper = /[A-Z]/.test(val);
  const hasDigit = /[0-9]/.test(val);
  return hasUpper && hasDigit ? null : { weak: true };
}

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink, AuthLayoutComponent],
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent {
  form: FormGroup;
  showPassword = false;
  isLoading = false;
  agreedToTerms = false;

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(3), Validators.pattern(/^\S+$/)]],
      email:    ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8), passwordStrength]],
    });
  }

  get username() { return this.form.get('username')!; }
  get email()    { return this.form.get('email')!; }
  get password() { return this.form.get('password')!; }

  get passwordStrengthLevel(): 'weak' | 'medium' | 'strong' {
    const val: string = this.password.value ?? '';
    if (val.length < 8) return 'weak';
    const score = [/[A-Z]/, /[0-9]/, /[^A-Za-z0-9]/].filter(r => r.test(val)).length;
    return score >= 2 ? 'strong' : 'medium';
  }

  onSubmit(): void {
    if (this.form.invalid || !this.agreedToTerms) {
      this.form.markAllAsTouched();
      return;
    }
    this.isLoading = true;
    // TODO: hook up to your auth service
    console.log('Signup payload:', this.form.value);
  }
}