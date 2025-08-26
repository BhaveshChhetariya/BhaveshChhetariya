import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-articles',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="articles-container fade-in">
      <h2>// Recent Articles</h2>
      <div class="articles-list">
        <article class="article-item" *ngFor="let article of articles">
          <h3>{{ article.title }}</h3>
          <p>{{ article.excerpt }}</p>
          <div class="article-meta">
            <span class="date">{{ article.date }}</span>
            <span class="read-time">{{ article.readTime }}</span>
          </div>
        </article>
      </div>
    </div>
  `,
  styles: [`
    .articles-container { padding: 20px; }
    h2 { color: #6a9955; margin-bottom: 30px; }
    .articles-list { display: flex; flex-direction: column; gap: 20px; }
    .article-item { background: var(--vscode-sidebar-bg); padding: 20px; border-radius: 8px; border: 1px solid var(--vscode-border); }
    .article-item h3 { color: var(--vscode-text); margin-bottom: 10px; }
    .article-item p { color: var(--vscode-text-muted); margin-bottom: 15px; line-height: 1.6; }
    .article-meta { display: flex; gap: 20px; font-size: 12px; color: var(--vscode-text-muted); }
  `]
})
export class ArticlesComponent {
  articles = [
    {
      title: 'Building Scalable Web Applications',
      excerpt: 'Learn how to architect web applications that can handle growth...',
      date: 'March 15, 2024',
      readTime: '5 min read'
    },
    {
      title: 'Modern JavaScript Best Practices',
      excerpt: 'Explore the latest JavaScript features and how to use them effectively...',
      date: 'February 28, 2024',
      readTime: '8 min read'
    }
  ];
}
