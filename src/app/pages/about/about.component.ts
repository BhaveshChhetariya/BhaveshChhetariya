import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="about-container fade-in">
      <div class="about-content">
        <h2>// About Me</h2>
        <p>This is the main about section. Use the sidebar to navigate to specific personal or professional information.</p>
        <div class="navigation-hint">
          <p>👈 Check out the sidebar for:</p>
          <ul>
            <li><strong>Personal Info</strong> - Bio, interests, education, hobbies</li>
            <li><strong>Professional Info</strong> - Experience, skills, certifications</li>
          </ul>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .about-container {
      padding: 40px;
      text-align: center;
    }
    
    .about-content {
      max-width: 600px;
      margin: 0 auto;
    }
    
    h2 {
      color: #6a9955;
      font-size: 28px;
      margin-bottom: 20px;
    }
    
    p {
      color: var(--vscode-text);
      font-size: 16px;
      line-height: 1.6;
      margin-bottom: 30px;
    }
    
    .navigation-hint {
      background-color: var(--vscode-sidebar-bg);
      border-radius: 8px;
      padding: 20px;
      border: 1px solid var(--vscode-border);
      text-align: left;
      
      ul {
        margin-top: 15px;
        padding-left: 20px;
        
        li {
          color: var(--vscode-text-muted);
          margin-bottom: 8px;
          
          strong {
            color: var(--vscode-accent);
          }
        }
      }
    }
  `]
})
export class AboutComponent {}
