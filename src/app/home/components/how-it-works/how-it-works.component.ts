import { Component } from '@angular/core';
import { CommonModule, DecimalPipe } from '@angular/common';
import { RouterLink } from '@angular/router';

export interface Step {
  number: string;
  title: string;
  description: string;
}

export interface Feature {
  icon: string;
  title: string;
  description: string;
}

@Component({
  selector: 'app-how-it-works',
  standalone: true,
  imports: [CommonModule, DecimalPipe, RouterLink],
  templateUrl: './how-it-works.component.html',
  styleUrls: ['./how-it-works.component.scss'],
})
export class HowItWorksComponent {
  steps: Step[] = [
    {
      number: '01',
      title: 'Create your account',
      description: 'Sign up with a username, email, and password. Free forever — no credit card required.',
    },
    {
      number: '02',
      title: 'Set your monthly budget',
      description: 'Enter your income and spending limits in yen. Expenss tracks your pace in real time.',
    },
    {
      number: '03',
      title: 'Log every expense',
      description: 'Add expenses in seconds. Just the amount and category — your dashboard updates instantly.',
    },
    {
      number: '04',
      title: 'Review and improve',
      description: 'Compare months, spot patterns, and make smarter decisions about your spending.',
    },
  ];

  mockBars = [
    { height: 55, label: 'Jan', active: false },
    { height: 72, label: 'Feb', active: false },
    { height: 68, label: 'Mar', active: false },
    { height: 48, label: 'Apr', active: false },
    { height: 62, label: 'May', active: true  },
  ];

  mockTx = [
    { name: 'Monthly rent',    amount: -65000 },
    { name: 'Grocery run',     amount: -4280  },
    { name: 'Osaka Metro',     amount: -980   },
    { name: 'Part-time pay',   amount: 85000  },
  ];

  features: Feature[] = [
    {
      icon: 'chart',
      title: 'Spending breakdown by category',
      description: 'Rent, food, transport, subscriptions — see exactly where every yen goes at a glance.',
    },
    {
      icon: 'target',
      title: 'Monthly budget tracking',
      description: 'Set a budget goal and track your pace so you never overshoot the month.',
    },
    {
      icon: 'receipt',
      title: 'Quick expense logging',
      description: 'Add any expense in seconds. Amount and category — that\'s all it takes.',
    },
    {
      icon: 'analytics',
      title: 'Monthly reports',
      description: 'Compare spending month to month and catch patterns before they become problems.',
    },
    {
      icon: 'currency',
      title: 'Yen-first tracking',
      description: 'Log in JPY natively. No awkward conversions, no rounding confusion.',
    },
    {
      icon: 'bell',
      title: 'Budget alerts',
      description: 'Get notified when you\'re approaching your limit — before you cross it.',
    },
  ];
}