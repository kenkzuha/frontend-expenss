import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { LoginDto, SignupDto } from './auth.dto';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:3000/auth';

  signup(userData: SignupDto) {
    return this.http.post(`${this.apiUrl}/signup`, userData);
  }

  login(userData: LoginDto){
    return this.http.post(`${this.apiUrl}/login`, userData);
  }

  logout(){
    return this.http.post(`${this.apiUrl}/logout`, {});
  }

  checkAuth(){
    return this.http.get(`${this.apiUrl}/me`);
  }

  verifyEmail(token: string) {
    return this.http.get(`${this.apiUrl}/verify-email`, { params: { token } });
  }
}