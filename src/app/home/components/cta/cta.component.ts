import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslocoModule } from '@jsverse/transloco';
import { RevealDirective } from '../../../shared/reveal.directive';

@Component({
  selector: 'app-cta',
  standalone: true,
  templateUrl: './cta.component.html',
  styleUrls: ['./cta.component.scss'],
  imports: [RouterLink, TranslocoModule, RevealDirective],
})
export class CtaComponent {}