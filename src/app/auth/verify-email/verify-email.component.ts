import { ChangeDetectorRef, Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { AuthService } from '../auth.service';
import { TranslocoModule, TranslocoService } from '@jsverse/transloco';
import { AuthLayoutComponent } from '../../home/components/authlayout/authlayout.component';
import { getErrorKey } from '../auth-error.util';

@Component({
  selector: 'app-verify-email',
  standalone: true,
  imports: [CommonModule, RouterLink, TranslocoModule, AuthLayoutComponent],
  templateUrl: './verify-email.component.html',
  styleUrls: ['./verify-email.component.scss'],
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
