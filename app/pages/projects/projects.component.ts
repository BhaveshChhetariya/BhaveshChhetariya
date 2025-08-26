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
      title: 'Portfolio Website',
      description: 'A responsive portfolio website built with Angular 17, featuring VS Code theme and interactive elements.',
      image: 'https://via.placeholder.com/400x250/4A90E2/FFFFFF?text=Portfolio',
      technologies: ['Angular', 'TypeScript', 'SCSS', 'HTML5'],
      category: 'web',
      demoUrl: 'https://portfolio-demo.com',
      githubUrl: 'https://github.com/username/portfolio'
    },
    {
      id: 2,
      title: 'Task Manager Application',
      description: 'A full-stack task management app with user authentication, real-time updates, and responsive design.',
      image: 'https://via.placeholder.com/400x250/E74C3C/FFFFFF?text=Task+Manager',
      technologies: ['React', 'Node.js', 'MongoDB', 'Socket.io'],
      category: 'web',
      demoUrl: 'https://taskmanager-demo.com',
      githubUrl: 'https://github.com/username/task-manager'
    },
    {
      id: 3,
      title: 'Weather Dashboard',
      description: 'A weather application that displays current conditions and forecasts with beautiful visualizations.',
      image: 'https://via.placeholder.com/400x250/27AE60/FFFFFF?text=Weather+App',
      technologies: ['JavaScript', 'HTML5', 'CSS3', 'Weather API'],
      category: 'web',
      demoUrl: 'https://weather-dashboard-demo.com',
      githubUrl: 'https://github.com/username/weather-dashboard'
    },
    {
      id: 4,
      title: 'RESTful API Service',
      description: 'A robust REST API built with Node.js and Express, featuring authentication, validation, and documentation.',
      image: 'https://via.placeholder.com/400x250/8E44AD/FFFFFF?text=REST+API',
      technologies: ['Node.js', 'Express', 'MongoDB', 'JWT', 'Swagger'],
      category: 'api',
      githubUrl: 'https://github.com/username/rest-api'
    },
    {
      id: 5,
      title: 'E-Learning Platform',
      description: 'An online learning platform with course management, video streaming, and progress tracking.',
      image: 'https://via.placeholder.com/400x250/F39C12/FFFFFF?text=E-Learning',
      technologies: ['Angular', 'Firebase', 'TypeScript', 'Material UI'],
      category: 'web',
      demoUrl: 'https://elearning-demo.com',
      githubUrl: 'https://github.com/username/elearning-platform'
    },
    {
      id: 6,
      title: 'Mobile Expense Tracker',
      description: 'A mobile app for tracking personal expenses with categories, budgets, and financial insights.',
      image: 'https://via.placeholder.com/400x250/16A085/FFFFFF?text=Expense+Tracker',
      technologies: ['React Native', 'Redux', 'SQLite', 'Chart.js'],
      category: 'mobile',
      githubUrl: 'https://github.com/username/expense-tracker'
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

  openDemo(url: string) {
    window.open(url, '_blank');
  }

  openGithub(url: string) {
    window.open(url, '_blank');
  }

  getProjectCount(category: string): number {
    if (category === 'all') {
      return this.projects.length;
    }
    return this.projects.filter(project => project.category === category).length;
  }

  getCategoryName(category: string): string {
    const categoryMap: { [key: string]: string } = {
      'web': 'Web App',
      'mobile': 'Mobile App',
      'api': 'API Service',
      'all': 'All Projects'
    };
    return categoryMap[category] || category;
  }
}
