import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

export interface Stat {
  value: string;
  label: string;
}

export interface Testimonial {
  initials: string;
  quote: string;
  name: string;
  location: string;
}

@Component({
  selector: 'app-social-proof',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './social-proof.component.html',
  styleUrls: ['./social-proof.component.scss'],
})
export class SocialProofComponent {
  stats: Stat[] = [
    { value: '2,400+', label: 'Active users' },
    { value: '¥4.2B',  label: 'Expenses tracked' },
    { value: '38',     label: 'Countries represented' },
  ];

  testimonials: Testimonial[] = [
    {
      initials: 'MR',
      quote: 'Finally an app that doesn\'t make managing money in Japan a headache. I use it every single day.',
      name: 'Marco R.',
      location: 'Italian · Osaka',
    },
    {
      initials: 'SL',
      quote: 'Helped me realize I was overspending on convenience stores by ¥20k a month. Game changer.',
      name: 'Sara L.',
      location: 'Canadian · Tokyo',
    },
  ];
}