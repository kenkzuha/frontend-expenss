import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { SignupDto } from './auth.dto';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:3000/auth';

  signup(userData: SignupDto) {
    return this.http.post(`${this.apiUrl}/signup`, userData);
  }
}