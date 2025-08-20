import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-sessions',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="sessions-container fade-in">
      <h2>// Tech Sessions & Workshops</h2>
      <div class="sessions-grid">
        <div class="session-card" *ngFor="let session of sessions">
          <div class="session-image">
            <img [src]="session.image" [alt]="session.title">
          </div>
          <div class="session-info">
            <h3>{{ session.title }}</h3>
            <p>{{ session.description }}</p>
            <button class="view-project" (click)="openSession(session.url)">view-session</button>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .sessions-container { padding: 20px; }
    h2 { color: #6a9955; margin-bottom: 30px; }
    .sessions-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(350px, 1fr)); gap: 20px; }
    .session-card { background: var(--vscode-sidebar-bg); border-radius: 12px; overflow: hidden; border: 1px solid var(--vscode-border); }
    .session-image { height: 200px; overflow: hidden; }
    .session-image img { width: 100%; height: 100%; object-fit: cover; }
    .session-info { padding: 20px; }
    .session-info h3 { color: var(--vscode-text); margin-bottom: 10px; }
    .session-info p { color: var(--vscode-text-muted); margin-bottom: 15px; }
    .view-project { background: var(--vscode-accent); color: white; border: none; padding: 10px 20px; border-radius: 6px; cursor: pointer; }
  `]
})
export class SessionsComponent {
  sessions = [
    {
      title: 'Modern Web Development',
      description: 'Deep dive into modern web technologies and best practices',
      image: 'https://via.placeholder.com/400x250/9B59B6/FFFFFF?text=Web+Dev',
      url: 'https://example.com/session1'
    },
    {
      title: 'API Design Patterns',
      description: 'Best practices for designing scalable and maintainable APIs',
      image: 'https://via.placeholder.com/400x250/3498DB/FFFFFF?text=API+Design',
      url: 'https://example.com/session2'
    }
  ];

  openSession(url: string) {
    window.open(url, '_blank');
  }
}
