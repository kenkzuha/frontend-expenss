import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeroComponent } from './components/hero/hero.component';
import { SocialProofComponent } from './components/social-proof/social-proof.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FooterComponent } from './components/footer/footer.component';
import { FeaturesComponent } from './components/features/features.component';
import { CtaComponent } from './components/cta/cta.component';
import { AppPreviewComponent } from './components/app-preview/app-preview.component';


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    HeroComponent,
    SocialProofComponent,
    NavbarComponent,
    FooterComponent,
    FeaturesComponent,
    CtaComponent,
    AppPreviewComponent
  ],
  templateUrl: './home.component.html',
})
export class HomeComponent {}