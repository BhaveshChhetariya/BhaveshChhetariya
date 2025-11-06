import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

interface Skill {
  name: string;
  level: number;
  category: string;
}

@Component({
  selector: 'app-skills',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './skills.component.html',
  styleUrls: ['../professional-info.component.scss']
})
export class SkillsComponent {
  skills: Skill[] = [
    // Frontend
    { name: "Angular", level: 95, category: "frontend" },
    { name: "JavaScript", level: 90, category: "frontend" },
    { name: "TypeScript", level: 85, category: "frontend" },
    { name: "HTML/CSS", level: 90, category: "frontend" },
    { name: "Flutter", level: 90, category: "frontend" },
    { name: "React", level: 75, category: "frontend" },
    
    // Backend
    { name: ".NET", level: 90, category: "backend" },
    { name: "Java", level: 80, category: "backend" },
    { name: "REST APIs", level: 90, category: "backend" },
    { name: "Node.js", level: 75, category: "backend" },
    { name: "Firebase", level: 85, category: "backend" },
    
    // Database & Cloud
    { name: "AWS DynamoDB", level: 90, category: "database" },
    { name: "AWS Redshift", level: 85, category: "database" },
    { name: "MySQL", level: 90, category: "database" },
    { name: "OpenSearch", level: 85, category: "database" },
    { name: "SQLite", level: 80, category: "database" },
    
    // Tools & Others
    { name: "AWS", level: 90, category: "tools" },
    { name: "Git", level: 85, category: "tools" },
    { name: "Jira", level: 80, category: "tools" },
    { name: "VS Code", level: 95, category: "tools" },
    { name: "Android Studio", level: 85, category: "tools" },
    { name: "Provider (State Management)", level: 85, category: "tools" },
    { name: "Razorpay Integration", level: 80, category: "tools" },
    { name: "Meta Analytics", level: 75, category: "tools" }
  ];

  skillCategories = [
    { key: 'frontend', name: 'Frontend Development', icon: 'fas fa-laptop-code' },
    { key: 'backend', name: 'Backend Development', icon: 'fas fa-server' },
    { key: 'database', name: 'Database Management', icon: 'fas fa-database' },
    { key: 'tools', name: 'Development Tools', icon: 'fas fa-tools' }
  ];

  services = [
    {
      title: "Full Stack Development",
      icon: "🔧",
      description: "Building complete web applications using Angular, .NET, and modern technologies for MVAS industry."
    },
    {
      title: "Mobile App Development",
      icon: "📱",
      description: "Creating cross-platform mobile applications using Flutter with Firebase integration and payment systems."
    },
    {
      title: "AWS Cloud Integration",
      icon: "☁️",
      description: "Implementing scalable solutions using AWS DynamoDB, Redshift, MySQL, and OpenSearch for data management."
    },
    {
      title: "Technical Integration",
      icon: "⚡",
      description: "Integrating third-party APIs, implementing anti-fraud measures, and optimizing performance monitoring."
    }
  ];

  getSkillsByCategory(category: string): Skill[] {
    return this.skills.filter(skill => skill.category === category);
  }

  getProficiencyLevel(level: number): string {
    if (level >= 90) return 'Expert';
    if (level >= 75) return 'Advanced';
    if (level >= 60) return 'Intermediate';
    return 'Beginner';
  }

  getLineNumbers(): number[] {
    let totalLines = 1; // Opening brace
    totalLines += 2; // skillCategories property
    
    this.skillCategories.forEach(category => {
      const categorySkills = this.getSkillsByCategory(category.key);
      totalLines += 4; // Category object structure
      totalLines += categorySkills.length * 5; // Each skill (5 lines)
      totalLines += 2; // Closing category + empty line
    });
    
    totalLines += 3; // services property
    totalLines += this.services.length * 5; // Each service (5 lines)
    totalLines += 5; // Closing services and main object
    
    return Array.from({ length: totalLines }, (_, i) => i + 1);
  }
}
