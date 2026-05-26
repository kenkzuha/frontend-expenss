import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { TranslocoModule, TranslocoService } from '@jsverse/transloco';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterLink, TranslocoModule],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent {
  private translocoService = inject(TranslocoService);
  currentLang = this.translocoService.getActiveLang();
  langOpen = false;

  languages = [
    { code: 'en', flag: '🇺🇸', label: 'EN' },
    { code: 'ja', flag: '🇯🇵', label: 'JA' },
    { code: 'id', flag: '🇮🇩', label: 'ID' },
  ];

  get currentFlag(): string {
    return this.languages.find(l => l.code === this.currentLang)?.flag || '🇺🇸';
  }

  switchLang(code: string): void {
    this.translocoService.setActiveLang(code);
    this.currentLang = code;
    this.langOpen = false;
  }

  toggleLangMenu(): void {
    this.langOpen = !this.langOpen;
  }
}