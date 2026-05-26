import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslocoModule } from '@jsverse/transloco';

export interface Transaction {
  icon: string;
  nameKey: string;
  categoryKey: string;
  amount: number;
}

@Component({
  selector: 'app-app-preview',
  standalone: true,
  imports: [CommonModule, TranslocoModule],
  templateUrl: './app-preview.component.html',
  styleUrls: ['./app-preview.component.scss'],
})
export class AppPreviewComponent {
  transactions: Transaction[] = [
    { icon: 'home', nameKey: 'appPreview.monthlyRent', categoryKey: 'appPreview.housing', amount: -65000 },
    { icon: 'cart', nameKey: 'appPreview.groceryRun', categoryKey: 'appPreview.food', amount: -4280 },
    { icon: 'train', nameKey: 'appPreview.osakaMetro', categoryKey: 'appPreview.transport', amount: -980 },
    { icon: 'wallet', nameKey: 'appPreview.partTimePay', categoryKey: 'appPreview.income', amount: 85000 },
  ];

  formatAmount(amount: number): string {
    const abs = Math.abs(amount).toLocaleString('ja-JP');
    return amount < 0 ? `−¥${abs}` : `+¥${abs}`;
  }
}