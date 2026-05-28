import { Component, inject, HostListener, ElementRef } from '@angular/core';
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
  private elementRef = inject(ElementRef);
  currentLang = this.translocoService.getActiveLang();
  langOpen = false;

  languages = [
    { code: 'en', label: 'English' },
    { code: 'ja', label: '日本語' },
    { code: 'id', label: 'Indonesian' },
  ];

  switchLang(code: string): void {
    this.translocoService.setActiveLang(code);
    this.currentLang = code;
    this.langOpen = false;
    localStorage.setItem('lang', code);
  }

  toggleLangMenu(): void {
    this.langOpen = !this.langOpen;
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent): void {
    const target = event.target as HTMLElement;
    if (target && !this.elementRef.nativeElement.querySelector('.lang-switcher')?.contains(target)) {
      this.langOpen = false;
    }
  }
}