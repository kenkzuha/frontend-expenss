import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

export interface Transaction {
  icon: string;
  name: string;
  category: string;
  amount: number;
}

@Component({
  selector: 'app-app-preview',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './app-preview.component.html',
  styleUrls: ['./app-preview.component.scss'],
})
export class AppPreviewComponent {
  transactions: Transaction[] = [
    { icon: 'home', name: 'Monthly rent', category: 'Housing', amount: -65000 },
    { icon: 'cart', name: 'Grocery run', category: 'Food', amount: -4280 },
    { icon: 'train', name: 'Osaka Metro', category: 'Transport', amount: -980 },
    { icon: 'wallet', name: 'Part-time pay', category: 'Income', amount: 85000 },
  ];

  formatAmount(amount: number): string {
    const abs = Math.abs(amount).toLocaleString('ja-JP');
    return amount < 0 ? `−¥${abs}` : `+¥${abs}`;
  }
}