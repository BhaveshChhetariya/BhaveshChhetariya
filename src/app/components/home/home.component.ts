import { Component, OnInit, AfterViewInit, ElementRef, ViewChild } from '@angular/core';
import { ScrollService } from '../../services/scroll.service';
import { Router } from '@angular/router';

// Import Rive properly to avoid declaration issues
import * as rive from '@rive-app/canvas';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, AfterViewInit {
  @ViewChild('heroRiveCanvas') heroRiveCanvas!: ElementRef;
  private heroRive: any;

  constructor(
    private scrollService: ScrollService,
    private router: Router
  ) { }

  ngOnInit(): void {
    // Initialize smooth scrolling
    this.scrollService.init();
  }

  ngAfterViewInit(): void {
    // Initialize Rive animation
    setTimeout(() => {
      this.initRiveAnimation();
    }, 100);
  }

  private initRiveAnimation(): void {
    if (!this.heroRiveCanvas) {
      console.error('Hero Rive canvas element not found');
      return;
    }
    
    try {
      this.heroRive = new rive.Rive({
        src: 'assets/animations/hero-animation.riv', // Update with your actual Rive file path
        canvas: this.heroRiveCanvas.nativeElement,
        autoplay: true,
        stateMachines: 'State Machine 1',
        fit: rive.Fit.Cover,
        onLoad: () => {
          console.log('Hero Rive animation loaded successfully');
        },
        onError: (err: any) => {
          console.error('Rive animation error:', err);
        }
      });
    } catch (error) {
      console.error('Error initializing Rive animation:', error);
    }
  }

  scrollToSection(sectionId: string): void {
    const element = document.getElementById(sectionId);
    if (element) {
      this.scrollService.scrollTo(element);
    }
  }
}
