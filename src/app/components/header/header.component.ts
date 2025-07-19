import { Component, OnInit, OnDestroy, HostListener, Renderer2 } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { filter, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { ScrollService } from '../../services/scroll.service';

interface NavItem {
  id: string;
  name: string;
  icon: string;
}

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {
  isScrolled = false;
  isMobileMenuOpen = false;
  activeSection = 'home';
  isDarkMode = false;
  private destroy$ = new Subject<void>();
  
  navItems: NavItem[] = [
    { id: 'home', name: 'Home', icon: 'fas fa-home' },
    { id: 'about', name: 'About', icon: 'fas fa-user' },
    { id: 'experience', name: 'Experience', icon: 'fas fa-briefcase' },
    { id: 'skills', name: 'Skills', icon: 'fas fa-code' },
    { id: 'projects', name: 'Projects', icon: 'fas fa-project-diagram' },
    { id: 'contact', name: 'Contact', icon: 'fas fa-envelope' }
  ];

  constructor(
    private router: Router,
    private scrollService: ScrollService,
    private renderer: Renderer2
  ) { }

  ngOnInit(): void {
    // Check for saved theme preference
    this.checkThemePreference();
    
    // Track route changes to update active link
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd),
      takeUntil(this.destroy$)
    ).subscribe((event: any) => {
      const path = event.url.split('/')[1] || 'home';
      this.activeSection = path;
    });
    
    // Track scroll position to update active section
    this.setupScrollSpy();
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
      this.renderer.addClass(document.body, 'no-scroll');
    } else {
      this.renderer.removeClass(document.body, 'no-scroll');
    }
  }

  closeMobileMenu() {
    if (this.isMobileMenuOpen) {
      this.isMobileMenuOpen = false;
      this.renderer.removeClass(document.body, 'no-scroll');
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
        offset: -100, // Adjust offset to account for header height
        duration: 1.2,
        easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t))
      });
    } else {
      console.warn(`Element with id "${elementId}" not found`);
    }
  }
  
  toggleTheme() {
    this.isDarkMode = !this.isDarkMode;
    
    if (this.isDarkMode) {
      this.renderer.addClass(document.body, 'dark-theme');
      localStorage.setItem('theme', 'dark');
    } else {
      this.renderer.removeClass(document.body, 'dark-theme');
      localStorage.setItem('theme', 'light');
    }
  }
  
  private checkThemePreference() {
    // Check localStorage
    const savedTheme = localStorage.getItem('theme');
    
    if (savedTheme === 'dark') {
      this.isDarkMode = true;
      this.renderer.addClass(document.body, 'dark-theme');
    } else if (savedTheme === 'light') {
      this.isDarkMode = false;
    } else {
      // Check system preference
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      this.isDarkMode = prefersDark;
      
      if (prefersDark) {
        this.renderer.addClass(document.body, 'dark-theme');
      }
    }
  }
  
  private setupScrollSpy() {
    window.addEventListener('scroll', () => {
      const scrollPosition = window.scrollY + 200; // Add offset for header
      
      // Find all section elements
      const sections = this.navItems.map(item => document.getElementById(item.id)).filter(Boolean);
      
      // Find the current section
      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        if (section) {
          const sectionTop = section.offsetTop;
          
          if (scrollPosition >= sectionTop) {
            if (this.activeSection !== section.id) {
              this.activeSection = section.id;
            }
            break;
          }
        }
      }
    }, { passive: true });
  }
}
