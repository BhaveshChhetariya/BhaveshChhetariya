import { Component, OnInit, AfterViewInit, ElementRef, ViewChild } from '@angular/core';
import { ScrollService } from '../../services/scroll.service';
import { Router } from '@angular/router';

// Import Rive properly
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
    // We don't need to initialize here as it's already done in AppComponent
    // this.scrollService.init();
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
      // Create a simple animation as a fallback since we don't have the actual Rive file
      const canvas = this.heroRiveCanvas.nativeElement;
      const ctx = canvas.getContext('2d');
      
      if (ctx) {
        // Simple animation as fallback
        let hue = 0;
        const animate = () => {
          hue = (hue + 1) % 360;
          ctx.clearRect(0, 0, canvas.width, canvas.height);
          
          // Draw a colorful gradient background
          const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
          gradient.addColorStop(0, `hsl(${hue}, 100%, 60%)`);
          gradient.addColorStop(1, `hsl(${hue + 60}, 100%, 60%)`);
          ctx.fillStyle = gradient;
          ctx.fillRect(0, 0, canvas.width, canvas.height);
          
          // Draw some animated shapes
          ctx.fillStyle = 'rgba(255, 255, 255, 0.7)';
          ctx.beginPath();
          ctx.arc(
            canvas.width / 2 + Math.sin(Date.now() / 1000) * 50, 
            canvas.height / 2 + Math.cos(Date.now() / 1000) * 50, 
            50, 0, Math.PI * 2
          );
          ctx.fill();
          
          requestAnimationFrame(animate);
        };
        
        animate();
        console.log('Fallback animation started (Rive file not found)');
      }
      
      // Try to load Rive animation if available
      // Commented out until we have a valid Rive file
      /*
      this.heroRive = new rive.Rive({
        src: 'assets/animations/hero-animation.riv',
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
      */
    } catch (error) {
      console.error('Error initializing animation:', error);
    }
  }

  scrollToSection(sectionId: string): void {
    const element = document.getElementById(sectionId);
    if (element) {
      this.scrollService.scrollTo(element);
    }
  }
}
