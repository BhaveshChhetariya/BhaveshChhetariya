import { Injectable, OnDestroy } from '@angular/core';
import Lenis from '@studio-freight/lenis';

@Injectable({
  providedIn: 'root'
})
export class ScrollService implements OnDestroy {
  private lenis: any = null;
  private rafId: number | null = null;

  constructor() { }

  init(): void {
    // Destroy any existing instance first
    this.destroy();
    
    // Initialize Lenis for smooth scrolling
    try {
      this.lenis = new Lenis({
        duration: 1.2,
        easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        direction: 'vertical',
        gestureDirection: 'vertical',
        smooth: true,
        mouseMultiplier: 1,
        smoothTouch: false,
        touchMultiplier: 2,
        infinite: false,
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
    if (!this.lenis) {
      console.warn('Lenis not initialized, falling back to native scroll');
      if (typeof target === 'string') {
        const element = document.querySelector(target);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      } else {
        target.scrollIntoView({ behavior: 'smooth' });
      }
      return;
    }
    
    try {
      this.lenis.scrollTo(target, options);
    } catch (error) {
      console.error('Error scrolling with Lenis:', error);
      // Fallback to native scrolling
      if (typeof target === 'string') {
        const element = document.querySelector(target);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      } else {
        target.scrollIntoView({ behavior: 'smooth' });
      }
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
  }

  ngOnDestroy(): void {
    this.destroy();
  }
}
