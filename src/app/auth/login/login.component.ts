import { ChangeDetectorRef, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { AuthLayoutComponent } from '../../home/components/authlayout/authlayout.component';
import { AuthService } from '../auth.service';
import { TranslocoModule } from '@jsverse/transloco';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink, AuthLayoutComponent, TranslocoModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  form: FormGroup;
  showPassword = false;
  isLoading = false;
  successMessage = '';
  errorMessage = '';
  private authService = inject(AuthService);
  private cdr = inject(ChangeDetectorRef);
  constructor(private fb: FormBuilder, private router: Router) {
    this.form = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(3)]],
      password: ['', [Validators.required]],
    });
    const navigation = this.router.getCurrentNavigation();
    if(navigation?.extras.state){
      this.successMessage = navigation.extras.state[
        'successMessage' 
      ] || '';
    }
  }

  get username() { return this.form.get('username')!; }
  get password() { return this.form.get('password')!; }

  onSubmit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    this.isLoading = true;
    this.authService.login(this.form.value).subscribe({
      next: () => {
        this.isLoading = false;
        this.router.navigate(['dashboard']);
      },
      error: (error) => {
        this.isLoading = false;
        this.errorMessage = error.error.message || "Something went wrong";
        this.cdr.detectChanges();
      }
    })
  }
}