import { ChangeDetectorRef, Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, AbstractControl, ValidationErrors } from '@angular/forms';
import { AuthLayoutComponent } from '../../home/components/authlayout/authlayout.component';
import { AuthService } from '../auth.service';
import { TranslocoModule, TranslocoService } from '@jsverse/transloco';
import { getErrorKey } from '../auth-error.util';

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
  selector: 'app-reset-password',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink, AuthLayoutComponent, TranslocoModule],
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss'],
})
export class ResetPasswordComponent implements OnInit {
  form: FormGroup;
  token = '';
  status: 'form' | 'success' | 'error' = 'form';
  isLoading = false;
  showPassword = false;
  showConfirmPassword = false;
  errorMessage = '';

  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private transloco = inject(TranslocoService);
  private cdr = inject(ChangeDetectorRef);

  constructor(private fb: FormBuilder, private authService: AuthService) {
    this.form = this.fb.group(
      {
        password:        ['', [Validators.required, Validators.minLength(8), passwordStrength]],
        confirmPassword: ['', [Validators.required]],
      },
      { validators: passwordsMatch }
    );
  }

  get password()        { return this.form.get('password')!; }
  get confirmPassword() { return this.form.get('confirmPassword')!; }

  get passwordMismatch(): boolean {
    return this.form.hasError('mismatch') && this.confirmPassword.touched;
  }

  get passwordStrengthLevel(): 'weak' | 'medium' | 'strong' {
    const val: string = this.password.value ?? '';
    if (val.length < 8) return 'weak';
    const hasUpper = /[A-Z]/.test(val);
    const hasDigit = /[0-9]/.test(val);
    return hasUpper && hasDigit ? 'strong' : 'medium';
  }

  ngOnInit() {
    this.token = this.route.snapshot.queryParamMap.get('token') ?? '';
    if (!this.token) {
      this.status = 'error';
      this.errorMessage = 'resetPassword.noToken';
      this.cdr.detectChanges();
    }
  }

  onSubmit(): void {
    this.errorMessage = '';
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.isLoading = true;
    this.authService.resetPassword(this.token, this.password.value).subscribe({
      next: () => {
        this.isLoading = false;
        this.status = 'success';
        this.cdr.detectChanges();
      },
      error: (err) => {
        this.isLoading = false;
        this.errorMessage = this.transloco.translate(getErrorKey(err.error?.message));
        this.cdr.detectChanges();
      },
    });
  }
}
