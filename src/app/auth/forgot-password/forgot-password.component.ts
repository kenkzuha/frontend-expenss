import { ChangeDetectorRef, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { AuthLayoutComponent } from '../../home/components/authlayout/authlayout.component';
import { AuthService } from '../auth.service';
import { TranslocoModule, TranslocoService } from '@jsverse/transloco';
import { getErrorKey } from '../auth-error.util';

@Component({
  selector: 'app-forgot-password',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink, AuthLayoutComponent, TranslocoModule],
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss'],
})
export class ForgotPasswordComponent {
  form: FormGroup;
  isLoading = false;
  successMessage = '';
  errorMessage = '';

  private transloco = inject(TranslocoService);
  private cdr = inject(ChangeDetectorRef);

  constructor(private fb: FormBuilder, private authService: AuthService) {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
    });
  }

  get email() { return this.form.get('email')!; }

  onSubmit(): void {
    this.successMessage = '';
    this.errorMessage = '';

    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.isLoading = true;
    this.authService.forgotPassword(this.email.value).subscribe({
      next: (res: any) => {
        this.isLoading = false;
        this.successMessage = res.message;
        this.form.reset();
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
