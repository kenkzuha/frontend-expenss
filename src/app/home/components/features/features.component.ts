import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslocoModule } from '@jsverse/transloco';

export interface Feature {
  icon: string;
  titleKey: string;
  descKey: string;
}

@Component({
  selector: 'app-features',
  standalone: true,
  imports: [CommonModule, TranslocoModule],
  templateUrl: './features.component.html',
  styleUrls: ['./features.component.scss'],
})
export class FeaturesComponent {
  features: Feature[] = [
    {
      icon: 'chart',
      titleKey: 'features.spendingBreakdownTitle',
      descKey: 'features.spendingBreakdownDesc',
    },
    {
      icon: 'yen',
      titleKey: 'features.yenTrackingTitle',
      descKey: 'features.yenTrackingDesc',
    },
    {
      icon: 'target',
      titleKey: 'features.budgetGoalsTitle',
      descKey: 'features.budgetGoalsDesc',
    },
    {
      icon: 'receipt',
      titleKey: 'features.quickLoggingTitle',
      descKey: 'features.quickLoggingDesc',
    },
  ];
}