import { Directive, ElementRef, Input, OnInit } from '@angular/core';

@Directive({
  selector: 'img[appLazyLoad]'
})
export class LazyImageDirective implements OnInit {
  @Input() src: string = '';

  constructor(private el: ElementRef) {}

  ngOnInit() {
    const img = this.el.nativeElement;
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          img.src = this.src;
          observer.unobserve(img);
        }
      });
    }, { rootMargin: '200px 0px' });

    observer.observe(img);
    
    // Add loading="lazy" attribute for native lazy loading
    img.setAttribute('loading', 'lazy');
    
    // Add a placeholder blur effect
    img.style.filter = 'blur(5px)';
    img.style.transition = 'filter 0.3s ease-out';
    
    // Remove blur when image is loaded
    img.onload = () => {
      img.style.filter = 'blur(0)';
    };
  }
}
