import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { filter, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { ScrollService } from './services/scroll.service';
import { ThemeService } from './services/theme.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'Bhavesh Chhetariya - Portfolio';
  private destroy$ = new Subject<void>();

  constructor(
    private router: Router,
    private scrollService: ScrollService,
    private themeService: ThemeService
  ) {}

  ngOnInit() {
    // Initialize theme service (this will apply the saved theme)
    // The theme service constructor handles the initialization
    
    // Initialize scroll service
    this.scrollService.init();
    
    // Scroll to top on route change
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd),
      takeUntil(this.destroy$)
    ).subscribe(() => {
      window.scrollTo(0, 0);
    });
  }
  
  ngOnDestroy() {
    // Clean up subscriptions
    this.destroy$.next();
    this.destroy$.complete();
    
    // Clean up scroll service
    this.scrollService.destroy();
  }
}
