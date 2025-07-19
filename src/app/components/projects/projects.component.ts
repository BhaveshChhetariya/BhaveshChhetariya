import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss']
})
export class ProjectsComponent implements OnInit {
  projects = [
    {
      title: 'E-Commerce Platform',
      description: 'A full-featured e-commerce platform with product management, shopping cart, and payment integration.',
      technologies: ['Angular', 'Node.js', 'Express', 'MongoDB', 'Stripe API'],
      imageUrl: 'assets/images/projects/ecommerce.jpg',
      liveUrl: 'https://example.com/ecommerce',
      githubUrl: 'https://github.com/username/ecommerce'
    },
    {
      title: 'Task Management App',
      description: 'A collaborative task management application with real-time updates and team collaboration features.',
      technologies: ['React', 'Firebase', 'Material UI', 'Redux'],
      imageUrl: 'assets/images/projects/taskapp.jpg',
      liveUrl: 'https://example.com/taskapp',
      githubUrl: 'https://github.com/username/taskapp'
    },
    {
      title: 'Weather Dashboard',
      description: 'An interactive weather dashboard that displays current and forecasted weather data for multiple locations.',
      technologies: ['JavaScript', 'HTML5', 'CSS3', 'Weather API'],
      imageUrl: 'assets/images/projects/weather.jpg',
      liveUrl: 'https://example.com/weather',
      githubUrl: 'https://github.com/username/weather'
    },
    {
      title: 'Portfolio Website',
      description: 'A responsive portfolio website built with Angular to showcase projects and skills.',
      technologies: ['Angular', 'SCSS', 'TypeScript', 'Lenis Scroll'],
      imageUrl: 'assets/images/projects/portfolio.jpg',
      liveUrl: 'https://example.com/portfolio',
      githubUrl: 'https://github.com/username/portfolio'
    }
  ];

  constructor() { }

  ngOnInit(): void {
  }

}
