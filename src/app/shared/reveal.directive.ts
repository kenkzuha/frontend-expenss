import { Directive, ElementRef, Input, OnInit } from '@angular/core';

@Directive({
  selector: '[appReveal]',
  standalone: true,
})
export class RevealDirective implements OnInit {
  @Input() revealDelay = 0;

  constructor(private el: ElementRef) {}

  ngOnInit() {
    const el: HTMLElement = this.el.nativeElement;
    el.style.opacity = '0';
    el.style.transform = 'translateY(32px)';
    el.style.transition = `opacity 0.7s cubic-bezier(0.16,1,0.3,1) ${this.revealDelay}ms, transform 0.7s cubic-bezier(0.16,1,0.3,1) ${this.revealDelay}ms`;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            el.style.opacity = '1';
            el.style.transform = 'translateY(0)';
            observer.unobserve(el);
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -48px 0px' }
    );

    observer.observe(el);
  }
}
