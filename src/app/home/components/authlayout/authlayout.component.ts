import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-auth-layout',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './authlayout.component.html',
  styleUrls: ['./authlayout.component.scss'],
})
export class AuthLayoutComponent {}