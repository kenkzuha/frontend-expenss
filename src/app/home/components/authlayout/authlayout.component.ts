import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { TranslocoModule } from '@jsverse/transloco';

@Component({
  selector: 'app-auth-layout',
  standalone: true,
  imports: [CommonModule, RouterLink, TranslocoModule],
  templateUrl: './authlayout.component.html',
  styleUrls: ['./authlayout.component.scss'],
})
export class AuthLayoutComponent {}