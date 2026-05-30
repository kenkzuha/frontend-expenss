import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslocoModule } from '@jsverse/transloco';
import { RevealDirective } from '../../../shared/reveal.directive';

export interface Stat {
  value: string;
  labelKey: string;
}

export interface Testimonial {
  initials: string;
  quoteKey: string;
  nameKey: string;
  locationKey: string;
}

@Component({
  selector: 'app-social-proof',
  standalone: true,
  imports: [CommonModule, TranslocoModule, RevealDirective],
  templateUrl: './social-proof.component.html',
  styleUrls: ['./social-proof.component.scss'],
})
export class SocialProofComponent {
  stats: Stat[] = [
    { value: '2,400+', labelKey: 'socialProof.activeUsersLabel' },
    { value: '¥4.2B',  labelKey: 'socialProof.trackedLabel' },
    { value: '38',     labelKey: 'socialProof.countriesLabel' },
  ];

  testimonials: Testimonial[] = [
    {
      initials: 'MR',
      quoteKey: 'socialProof.testimonial1Quote',
      nameKey: 'socialProof.testimonial1Name',
      locationKey: 'socialProof.testimonial1Location',
    },
    {
      initials: 'SL',
      quoteKey: 'socialProof.testimonial2Quote',
      nameKey: 'socialProof.testimonial2Name',
      locationKey: 'socialProof.testimonial2Location',
    },
  ];
}