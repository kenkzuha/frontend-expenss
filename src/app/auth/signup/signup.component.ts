import { ChangeDetectorRef, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, AbstractControl, ValidationErrors } from '@angular/forms';
import { AuthLayoutComponent } from '../../home/components/authlayout/authlayout.component';
import { AuthService } from '../auth.service';

function passwordStrength(control: AbstractControl): ValidationErrors | null {
  const val: string = control.value ?? '';
  if (val.length < 8) return null;
  const hasUpper = /[A-Z]/.test(val);
  const hasDigit = /[0-9]/.test(val);
  return hasUpper && hasDigit ? null : { weak: true };
}

function passwordsMatch(group: AbstractControl): ValidationErrors | null {
  const pw  = group.get('password')?.value;
  const cpw = group.get('confirmPassword')?.value;
  return pw && cpw && pw !== cpw ? { mismatch: true } : null;
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
  showConfirmPassword = false;
  isLoading = false;
  successMessage = '';
  errorMessage = '';

  constructor(private fb: FormBuilder, private readonly authService: AuthService, private router: Router, private cdr: ChangeDetectorRef) {
    this.form = this.fb.group(
      {
        username:        ['', [Validators.required, Validators.minLength(3), Validators.pattern(/^\S+$/)]],
        email:           ['', [Validators.required, Validators.email]],
        password:        ['', [Validators.required, Validators.minLength(8), passwordStrength]],
        confirmPassword: ['', [Validators.required]],
        agreedToTerms: [false, Validators.requiredTrue]
      },
      { validators: passwordsMatch }
    );
  }

  get username()        { return this.form.get('username')!; }
  get email()           { return this.form.get('email')!; }
  get password()        { return this.form.get('password')!; }
  get confirmPassword() { return this.form.get('confirmPassword')!; }

  get passwordStrengthLevel(): 'weak' | 'medium' | 'strong' {
    const val: string = this.password.value ?? '';
    if (val.length < 8) return 'weak';
    const score = [/[A-Z]/, /[0-9]/, /[^A-Za-z0-9]/].filter(r => r.test(val)).length;
    return score >= 2 ? 'strong' : 'medium';
  }

  get passwordMismatch(): boolean {
    return this.form.hasError('mismatch') && this.confirmPassword.touched;
  }

  onSubmit(): void {
    this.successMessage = '';
    this.errorMessage = '';

    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    this.isLoading = true;
    const { confirmPassword, ...signupData } = this.form.value;

    this.authService.signup(signupData).subscribe({
      next: (res: any) => {
        this.isLoading = false; 
        this.router.navigate(['/login'], {
          state: { successMessage: res.savedUserSuccess || 'Account created successfully! Please log in' }
        });
      },
      error: (error) => {
        this.isLoading = false;
        this.errorMessage = error.error.message || 'Signup Failed. Please Try Again';
        this.cdr.detectChanges();
        console.log(error);
      }
    });
  }
}