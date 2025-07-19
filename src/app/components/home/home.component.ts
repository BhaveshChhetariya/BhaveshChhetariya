import { Component, OnInit, AfterViewInit, ElementRef, ViewChild, OnDestroy } from '@angular/core';
import { ScrollService } from '../../services/scroll.service';
import { Router } from '@angular/router';
import { SocialLinksService, SocialLink } from '../../services/social-links.service';

// Import Rive properly
import * as rive from '@rive-app/canvas';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('heroRiveCanvas') heroRiveCanvas!: ElementRef;
  private heroRive: any;
  private animationFrameId: number | null = null;
  
  socialLinks: SocialLink[] = [];
  techStack = [
    { name: 'Angular', icon: 'fab fa-angular' },
    { name: 'React', icon: 'fab fa-react' },
    { name: 'Node.js', icon: 'fab fa-node-js' },
    { name: 'MongoDB', icon: 'fas fa-database' },
    { name: 'AWS', icon: 'fab fa-aws' }
  ];

  constructor(
    private scrollService: ScrollService,
    private router: Router,
    private socialLinksService: SocialLinksService
  ) { }

  ngOnInit(): void {
    // Get social links
    this.socialLinks = this.socialLinksService.socialLinks;
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
        let time = 0;
        
        const particles: any[] = [];
        
        // Create particles
        for (let i = 0; i < 30; i++) {
          particles.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            size: Math.random() * 5 + 2,
            speedX: Math.random() * 2 - 1,
            speedY: Math.random() * 2 - 1,
            hue: Math.random() * 60 + 200
          });
        }
        
        const animate = () => {
          time += 0.01;
          hue = (hue + 0.5) % 360;
          
          // Clear canvas
          ctx.clearRect(0, 0, canvas.width, canvas.height);
          
          // Draw a colorful gradient background
          const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
          gradient.addColorStop(0, `hsl(${hue}, 80%, 60%)`);
          gradient.addColorStop(1, `hsl(${hue + 60}, 80%, 60%)`);
          ctx.fillStyle = gradient;
          ctx.fillRect(0, 0, canvas.width, canvas.height);
          
          // Draw particles
          particles.forEach(particle => {
            // Update position
            particle.x += particle.speedX;
            particle.y += particle.speedY;
            
            // Bounce off edges
            if (particle.x < 0 || particle.x > canvas.width) particle.speedX *= -1;
            if (particle.y < 0 || particle.y > canvas.height) particle.speedY *= -1;
            
            // Draw particle
            ctx.beginPath();
            ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
            ctx.fillStyle = `hsla(${particle.hue}, 100%, 70%, 0.7)`;
            ctx.fill();
          });
          
          // Draw main circle
          const centerX = canvas.width / 2;
          const centerY = canvas.height / 2;
          
          // Draw orbit circles
          for (let i = 0; i < 3; i++) {
            const orbitRadius = 80 + i * 40;
            const orbitSpeed = 0.5 - i * 0.1;
            const x = centerX + Math.cos(time * orbitSpeed) * orbitRadius;
            const y = centerY + Math.sin(time * orbitSpeed) * orbitRadius;
            
            ctx.beginPath();
            ctx.arc(x, y, 10 - i * 2, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(255, 255, 255, ${0.8 - i * 0.2})`;
            ctx.fill();
            
            // Draw orbit path (faint)
            ctx.beginPath();
            ctx.arc(centerX, centerY, orbitRadius, 0, Math.PI * 2);
            ctx.strokeStyle = `rgba(255, 255, 255, 0.1)`;
            ctx.stroke();
          }
          
          // Draw center circle
          ctx.beginPath();
          ctx.arc(centerX, centerY, 20, 0, Math.PI * 2);
          ctx.fillStyle = 'rgba(255, 255, 255, 0.9)';
          ctx.fill();
          
          // Continue animation
          this.animationFrameId = requestAnimationFrame(animate);
        };
        
        animate();
      }
    } catch (error) {
      console.error('Error initializing animation:', error);
    }
  }
  
  ngOnDestroy(): void {
    // Cancel animation frame when component is destroyed
    if (this.animationFrameId) {
      cancelAnimationFrame(this.animationFrameId);
    }
  }

  scrollToSection(sectionId: string): void {
    const element = document.getElementById(sectionId);
    if (element) {
      this.scrollService.scrollTo(element, {
        offset: -100
      });
    }
  }
}
