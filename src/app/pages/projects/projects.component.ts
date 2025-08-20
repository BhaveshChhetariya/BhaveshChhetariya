import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

interface Project {
  id: number;
  title: string;
  description: string;
  image: string;
  technologies: string[];
  category: string;
  demoUrl?: string;
  githubUrl?: string;
}

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss']
})
export class ProjectsComponent {
  activeCategory = 'all';
  
  categories = [
    { key: 'all', name: 'All Projects', icon: 'fas fa-folder' },
    { key: 'web', name: 'Web Apps', icon: 'fas fa-globe' },
    { key: 'mobile', name: 'Mobile Apps', icon: 'fas fa-mobile-alt' },
    { key: 'api', name: 'APIs', icon: 'fas fa-server' }
  ];

  projects: Project[] = [
    {
      id: 1,
      title: 'E-Commerce Platform',
      description: 'A full-stack e-commerce solution with modern UI, payment integration, and admin dashboard.',
      image: 'https://via.placeholder.com/400x250/4A90E2/FFFFFF?text=E-Commerce',
      technologies: ['React', 'Node.js', 'MongoDB', 'Stripe', 'Redux'],
      category: 'web',
      demoUrl: 'https://demo.example.com',
      githubUrl: 'https://github.com/username/ecommerce'
    },
    {
      id: 2,
      title: 'Task Management App',
      description: 'Mobile app for productivity and task tracking with real-time sync and collaboration features.',
      image: 'https://via.placeholder.com/400x250/E74C3C/FFFFFF?text=Task+App',
      technologies: ['Flutter', 'Firebase', 'Dart', 'Provider'],
      category: 'mobile',
      demoUrl: 'https://play.google.com/store/apps/details?id=com.example.tasks',
      githubUrl: 'https://github.com/username/task-app'
    },
    {
      id: 3,
      title: 'REST API Service',
      description: 'Scalable REST API with authentication, real-time features, and comprehensive documentation.',
      image: 'https://via.placeholder.com/400x250/27AE60/FFFFFF?text=REST+API',
      technologies: ['Express.js', 'PostgreSQL', 'Redis', 'JWT', 'Swagger'],
      category: 'api',
      githubUrl: 'https://github.com/username/api-service'
    },
    {
      id: 4,
      title: 'Social Media Dashboard',
      description: 'Analytics dashboard for social media management with data visualization and reporting.',
      image: 'https://via.placeholder.com/400x250/9B59B6/FFFFFF?text=Dashboard',
      technologies: ['Vue.js', 'Chart.js', 'Node.js', 'MySQL'],
      category: 'web',
      demoUrl: 'https://dashboard.example.com',
      githubUrl: 'https://github.com/username/social-dashboard'
    },
    {
      id: 5,
      title: 'Weather App',
      description: 'Beautiful weather application with location-based forecasts and interactive maps.',
      image: 'https://via.placeholder.com/400x250/3498DB/FFFFFF?text=Weather+App',
      technologies: ['React Native', 'OpenWeather API', 'Maps SDK'],
      category: 'mobile',
      demoUrl: 'https://apps.apple.com/app/weather-example',
      githubUrl: 'https://github.com/username/weather-app'
    },
    {
      id: 6,
      title: 'GraphQL API',
      description: 'Modern GraphQL API with real-time subscriptions and advanced caching strategies.',
      image: 'https://via.placeholder.com/400x250/E67E22/FFFFFF?text=GraphQL',
      technologies: ['GraphQL', 'Apollo Server', 'MongoDB', 'Redis'],
      category: 'api',
      githubUrl: 'https://github.com/username/graphql-api'
    }
  ];

  get filteredProjects(): Project[] {
    if (this.activeCategory === 'all') {
      return this.projects;
    }
    return this.projects.filter(project => project.category === this.activeCategory);
  }

  setActiveCategory(category: string) {
    this.activeCategory = category;
  }

  getProjectCount(categoryKey: string): number {
    if (categoryKey === 'all') {
      return this.projects.length;
    }
    return this.projects.filter(p => p.category === categoryKey).length;
  }

  getCategoryName(categoryKey: string): string {
    const category = this.categories.find(c => c.key === categoryKey);
    return category ? category.name : categoryKey;
  }

  openDemo(url: string) {
    window.open(url, '_blank');
  }

  openGithub(url: string) {
    window.open(url, '_blank');
  }
}
