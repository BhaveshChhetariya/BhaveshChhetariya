import { Component, OnInit, OnDestroy, HostListener, Renderer2, ElementRef, ViewChild } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { filter, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { ScrollService } from '../../services/scroll.service';
import { ThemeService } from '../../services/theme.service';

interface NavItem {
  id: string;
  name: string;
  icon: string;
  description?: string;
}

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {
  @ViewChild('header') headerElement!: ElementRef;
  
  isScrolled = false;
  isMobileMenuOpen = false;
  activeSection = 'home';
  isDarkMode = false;
  scrollProgress = 0;
  private destroy$ = new Subject<void>();
  
  navItems: NavItem[] = [
    { id: 'home', name: 'Home', icon: 'fas fa-home', description: 'Welcome to my portfolio' },
    { id: 'about', name: 'About', icon: 'fas fa-user', description: 'Learn about me' },
    { id: 'experience', name: 'Experience', icon: 'fas fa-briefcase', description: 'My work history' },
    { id: 'skills', name: 'Skills', icon: 'fas fa-code', description: 'Technologies I work with' },
    { id: 'projects', name: 'Projects', icon: 'fas fa-project-diagram', description: 'My recent work' },
    { id: 'contact', name: 'Contact', icon: 'fas fa-envelope', description: 'Get in touch' }
  ];

  socialLinks = [
    { name: 'GitHub', icon: 'fab fa-github', url: 'https://github.com/bhaveshc20' },
    { name: 'LinkedIn', icon: 'fab fa-linkedin', url: 'https://linkedin.com/in/bhaveshc' },
    { name: 'Twitter', icon: 'fab fa-twitter', url: 'https://twitter.com/bhaveshc' }
  ];

  constructor(
    private router: Router,
    private scrollService: ScrollService,
    private renderer: Renderer2,
    private themeService: ThemeService
  ) { }

  ngOnInit(): void {
    // Subscribe to theme changes
    this.themeService.darkMode$.pipe(
      takeUntil(this.destroy$)
    ).subscribe(isDark => {
      this.isDarkMode = isDark;
    });
    
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
    
    // Calculate scroll progress
    const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    this.scrollProgress = (window.scrollY / windowHeight) * 100;
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
    this.themeService.toggleTheme();
  }
  
  scrollToTop() {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
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
