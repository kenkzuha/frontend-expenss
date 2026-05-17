import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

export interface Feature {
  icon: string;
  title: string;
  description: string;
}

@Component({
  selector: 'app-features',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './features.component.html',
  styleUrls: ['./features.component.scss'],
})
export class FeaturesComponent {
  features: Feature[] = [
    {
      icon: 'chart',
      title: 'Clear spending breakdown',
      description: 'See exactly where your money goes each month, split by category and date.',
    },
    {
      icon: 'yen',
      title: 'Yen-first tracking',
      description: 'Log expenses in JPY natively. No awkward conversions every single time.',
    },
    {
      icon: 'target',
      title: 'Monthly budget goals',
      description: 'Set a budget, track your pace, and get notified before you overspend.',
    },
    {
      icon: 'receipt',
      title: 'Quick expense logging',
      description: 'Add an expense in seconds. Just amount, category, and you\'re done.',
    },
  ];
}