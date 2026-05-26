import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslocoModule } from '@jsverse/transloco';

@Component({
  selector: 'app-cta',
  standalone: true,
  templateUrl: './cta.component.html',
  styleUrls: ['./cta.component.scss'],
  imports: [RouterLink, TranslocoModule],
})
export class CtaComponent {}