import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./home/home.component').then(m => m.HomeComponent),
  },
  {
    path: 'login',
    loadComponent: () =>
      import('./auth/login/login.component').then(m => m.LoginComponent),
  },
  {
    path: 'signup',
    loadComponent: () =>
      import('./auth/signup/signup.component').then(m => m.SignupComponent),
  },
  {
    path: 'how-it-works',
    loadComponent: () =>
      import('./home/components/how-it-works/how-it-works.component').then(m => m.HowItWorksComponent),
  },
  {
    path: '**',
    redirectTo: '',
  },
];