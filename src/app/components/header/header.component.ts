import { Component, OnInit, OnDestroy, HostListener } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { filter, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { ScrollService } from '../../services/scroll.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {
  isScrolled = false;
  isMobileMenuOpen = false;
  activeSection = 'home';
  private destroy$ = new Subject<void>();

  constructor(
    private router: Router,
    private scrollService: ScrollService
  ) { }

  ngOnInit(): void {
    // Track route changes to update active link
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd),
      takeUntil(this.destroy$)
    ).subscribe((event: any) => {
      const path = event.url.split('/')[1] || 'home';
      this.activeSection = path;
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  @HostListener('window:scroll')
  onWindowScroll() {
    this.isScrolled = window.scrollY > 50;
  }

  toggleMobileMenu() {
    this.isMobileMenuOpen = !this.isMobileMenuOpen;
    
    // Prevent body scrolling when menu is open
    if (this.isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  }

  closeMobileMenu() {
    if (this.isMobileMenuOpen) {
      this.isMobileMenuOpen = false;
      document.body.style.overflow = '';
    }
  }

  scrollToSection(sectionId: string) {
    this.activeSection = sectionId;
    this.closeMobileMenu();
    
    // If we're on the home page, scroll to the section
    if (this.router.url === '/' || this.router.url === '/home') {
      this.scrollToElement(sectionId);
    } else {
      // Navigate to home and then scroll to section
      this.router.navigate(['/']).then(() => {
        // Wait for navigation to complete
        setTimeout(() => {
          this.scrollToElement(sectionId);
        }, 300);
      });
    }
  }
  
  private scrollToElement(elementId: string): void {
    const element = document.getElementById(elementId);
    if (element) {
      // Use the scroll service for smooth scrolling
      this.scrollService.scrollTo(element, {
        offset: -80, // Adjust offset to account for header height
        duration: 1.2,
        easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t))
      });
    } else {
      console.warn(`Element with id "${elementId}" not found`);
    }
  }
}
