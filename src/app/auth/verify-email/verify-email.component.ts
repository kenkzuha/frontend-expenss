import { ChangeDetectorRef, Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { AuthService } from '../auth.service';
import { TranslocoModule, TranslocoService } from '@jsverse/transloco';
import { getErrorKey } from '../auth-error.util';

@Component({
  selector: 'app-verify-email',
  standalone: true,
  imports: [CommonModule, RouterLink, TranslocoModule],
  template: `
    <div class="verify-container" *transloco="let t">
      @if (status === 'loading') {
        <div class="verify-card">
          <div class="spinner"></div>
          <p>{{ t('verifyEmail.verifying') }}</p>
        </div>
      }

      @if (status === 'success') {
        <div class="verify-card success">
          <span class="icon">✅</span>
          <h2>{{ t('verifyEmail.successTitle') }}</h2>
          <p>{{ t('verifyEmail.successDesc') }}</p>
          <a routerLink="/login" class="btn-primary">{{ t('verifyEmail.goToLogin') }}</a>
        </div>
      }

      @if (status === 'error') {
        <div class="verify-card error">
          <span class="icon">❌</span>
          <h2>{{ t('verifyEmail.failedTitle') }}</h2>
          <p>{{ errorMessage }}</p>
          <a routerLink="/signup" class="btn-secondary">{{ t('verifyEmail.backToSignup') }}</a>
        </div>
      }
    </div>
  `,
  styles: [`
    .verify-container {
      display: flex;
      align-items: center;
      justify-content: center;
      min-height: 100vh;
      background: #f9fafb;
    }
    .verify-card {
      text-align: center;
      background: white;
      padding: 48px 40px;
      border-radius: 12px;
      box-shadow: 0 4px 24px rgba(0,0,0,0.08);
      max-width: 400px;
      width: 100%;
    }
    .icon { font-size: 48px; display: block; margin-bottom: 16px; }
    h2 { margin: 0 0 8px; font-size: 24px; color: #111; }
    p { color: #6b7280; margin-bottom: 24px; }
    .btn-primary {
      display: inline-block;
      background: #6366f1;
      color: white;
      padding: 12px 28px;
      border-radius: 8px;
      text-decoration: none;
      font-weight: 600;
    }
    .btn-secondary {
      display: inline-block;
      border: 1px solid #d1d5db;
      color: #374151;
      padding: 12px 28px;
      border-radius: 8px;
      text-decoration: none;
      font-weight: 600;
    }
    .spinner {
      width: 40px; height: 40px;
      border: 3px solid #e5e7eb;
      border-top-color: #6366f1;
      border-radius: 50%;
      animation: spin 0.8s linear infinite;
      margin: 0 auto 16px;
    }
    @keyframes spin { to { transform: rotate(360deg); } }
  `],
})
export class VerifyEmailComponent implements OnInit {
  status: 'loading' | 'success' | 'error' = 'loading';
  errorMessage = '';

  private route = inject(ActivatedRoute);
  private authService = inject(AuthService);
  private cdr = inject(ChangeDetectorRef);
  private transloco = inject(TranslocoService);

  ngOnInit() {
    const token = this.route.snapshot.queryParamMap.get('token');

    if (!token) {
      this.status = 'error';
      this.errorMessage = 'No verification token found in the URL.';
      this.cdr.detectChanges();
      return;
    }

    this.authService.verifyEmail(token).subscribe({
      next: () => {
        this.status = 'success';
        this.cdr.detectChanges();
      },
      error: (err) => {
        this.status = 'error';
        this.errorMessage = this.transloco.translate(getErrorKey(err.error?.message));
        this.cdr.detectChanges();
      },
    });
  }
}
