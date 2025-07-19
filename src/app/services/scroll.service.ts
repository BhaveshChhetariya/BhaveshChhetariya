import { Injectable, OnDestroy } from '@angular/core';
import Lenis from '@studio-freight/lenis';

@Injectable({
  providedIn: 'root'
})
export class ScrollService implements OnDestroy {
  private lenis: any = null;
  private rafId: number | null = null;
  private isInitialized = false;

  constructor() { }

  init(): void {
    // Prevent multiple initializations
    if (this.isInitialized) {
      console.log('Scroll service already initialized');
      return;
    }
    
    // Destroy any existing instance first
    this.destroy();
    
    // Initialize Lenis for smooth scrolling
    try {
      this.lenis = new Lenis({
        duration: 1.0,
        easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        touchMultiplier: 2,
        infinite: false,
        lerp: 0.1,
      });

      // Connect lenis to the RAF (request animation frame)
      const raf = (time: number) => {
        if (this.lenis) {
          this.lenis.raf(time);
          this.rafId = requestAnimationFrame(raf);
        }
      };

      // Start the animation frame loop
      this.rafId = requestAnimationFrame(raf);

      // Update lenis on window resize
      window.addEventListener('resize', this.handleResize);
      
      this.isInitialized = true;
      console.log('Lenis smooth scrolling initialized');
    } catch (error) {
      console.error('Error initializing Lenis:', error);
    }
  }

  private handleResize = () => {
    if (this.lenis) {
      this.lenis.resize();
    }
  }

  scrollTo(target: string | HTMLElement, options?: any): void {
    // If not initialized, initialize first
    if (!this.isInitialized) {
      this.init();
    }
    
    if (!this.lenis) {
      console.warn('Lenis not initialized, falling back to native scroll');
      this.nativeScrollTo(target);
      return;
    }
    
    try {
      // Default options
      const defaultOptions = {
        offset: -100,
        duration: 1.2,
        easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        immediate: false
      };
      
      // Merge with provided options
      const scrollOptions = { ...defaultOptions, ...options };
      
      // Execute scroll
      this.lenis.scrollTo(target, scrollOptions);
    } catch (error) {
      console.error('Error scrolling with Lenis:', error);
      // Fallback to native scrolling
      this.nativeScrollTo(target);
    }
  }
  
  private nativeScrollTo(target: string | HTMLElement): void {
    if (typeof target === 'string') {
      const element = document.querySelector(target);
      if (element) {
        const headerOffset = 80;
        const elementPosition = element.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
        
        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    } else {
      const headerOffset = 80;
      const elementPosition = target.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
      
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  }

  destroy(): void {
    // Cancel animation frame
    if (this.rafId !== null) {
      cancelAnimationFrame(this.rafId);
      this.rafId = null;
    }
    
    // Remove event listeners
    window.removeEventListener('resize', this.handleResize);
    
    // Destroy Lenis instance
    if (this.lenis) {
      this.lenis.destroy();
      this.lenis = null;
    }
    
    this.isInitialized = false;
  }

  ngOnDestroy(): void {
    this.destroy();
  }
}
