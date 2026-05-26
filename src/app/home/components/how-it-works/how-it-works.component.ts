import { Component } from '@angular/core';
import { CommonModule, DecimalPipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { TranslocoModule } from '@jsverse/transloco';

export interface Step {
  number: string;
  titleKey: string;
  descKey: string;
}

export interface Feature {
  icon: string;
  titleKey: string;
  descKey: string;
}

@Component({
  selector: 'app-how-it-works',
  standalone: true,
  imports: [CommonModule, DecimalPipe, RouterLink, TranslocoModule],
  templateUrl: './how-it-works.component.html',
  styleUrls: ['./how-it-works.component.scss'],
})
export class HowItWorksComponent {
  steps: Step[] = [
    {
      number: '01',
      titleKey: 'howItWorks.step1Title',
      descKey: 'howItWorks.step1Desc',
    },
    {
      number: '02',
      titleKey: 'howItWorks.step2Title',
      descKey: 'howItWorks.step2Desc',
    },
    {
      number: '03',
      titleKey: 'howItWorks.step3Title',
      descKey: 'howItWorks.step3Desc',
    },
    {
      number: '04',
      titleKey: 'howItWorks.step4Title',
      descKey: 'howItWorks.step4Desc',
    },
  ];

  mockBars = [
    { height: 55, labelKey: 'howItWorks.jan', active: false },
    { height: 72, labelKey: 'howItWorks.feb', active: false },
    { height: 68, labelKey: 'howItWorks.mar', active: false },
    { height: 48, labelKey: 'howItWorks.apr', active: false },
    { height: 62, labelKey: 'howItWorks.may', active: true  },
  ];

  mockTx = [
    { nameKey: 'howItWorks.monthlyRent',  amount: -65000 },
    { nameKey: 'howItWorks.groceryRun',   amount: -4280  },
    { nameKey: 'howItWorks.osakaMetro',   amount: -980   },
    { nameKey: 'howItWorks.partTimePay',  amount: 85000  },
  ];

  features: Feature[] = [
    {
      icon: 'chart',
      titleKey: 'howItWorks.feature1Title',
      descKey: 'howItWorks.feature1Desc',
    },
    {
      icon: 'target',
      titleKey: 'howItWorks.feature2Title',
      descKey: 'howItWorks.feature2Desc',
    },
    {
      icon: 'receipt',
      titleKey: 'howItWorks.feature3Title',
      descKey: 'howItWorks.feature3Desc',
    },
    {
      icon: 'analytics',
      titleKey: 'howItWorks.feature4Title',
      descKey: 'howItWorks.feature4Desc',
    },
    {
      icon: 'currency',
      titleKey: 'howItWorks.feature5Title',
      descKey: 'howItWorks.feature5Desc',
    },
    {
      icon: 'bell',
      titleKey: 'howItWorks.feature6Title',
      descKey: 'howItWorks.feature6Desc',
    },
  ];
}