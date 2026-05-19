import { Component } from '@angular/core';
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-cta',
  standalone: true,
  templateUrl: './cta.component.html',
  styleUrls: ['./cta.component.scss'],
  imports: [RouterLink],
})
export class CtaComponent {}