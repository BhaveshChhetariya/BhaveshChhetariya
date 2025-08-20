import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';

interface Experience {
  position: string;
  company: string;
  duration: string;
  description: string[];
  technologies: string[];
}

interface Skill {
  name: string;
  level: number;
  category: string;
}

interface ProfessionalInfo {
  experience: Experience[];
  skills: Skill[];
  certifications: {
    name: string;
    issuer: string;
    date: string;
    credentialId?: string;
  }[];
  achievements: string[];
}

@Component({
  selector: 'app-professional-info',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './professional-info.component.html',
  styleUrls: ['./professional-info.component.scss']
})
export class ProfessionalInfoComponent implements OnInit {
  activeSection = 'experience';
  
  professionalInfo: ProfessionalInfo = {
    experience: [
      {
        position: "Senior Full Stack Developer",
        company: "Tech Solutions Inc.",
        duration: "2022 - Present",
        description: [
          "With over 3 years of development experience, I've",
          "worked both independently and within collaborative teams to",
          "deliver polished, production-grade applications.",
          "",
          "From e-commerce and travel booking to healthcare and social",
          "platforms, I've built solutions that are scalable, user-",
          "friendly, and performance-driven.",
          "",
          "My workflow is rooted in clean architecture, MVVM patterns,",
          "and SOLID principles—leveraging tools like Firebase,",
          "Supabase, and databases to keep logic modular and maintainable.",
          "",
          "I've also explored the basics of machine learning & deep",
          "learning and have built projects like object detection to stay",
          "curious beyond app dev.",
          "",
          "With successful releases on both app stores, I bring a full-",
          "cycle perspective—from idea to publish."
        ],
        technologies: ["React", "Node.js", "TypeScript", "AWS", "MongoDB"]
      },
      {
        position: "Frontend Developer",
        company: "Digital Agency",
        duration: "2021 - 2022",
        description: [
          "Developed responsive web applications using modern",
          "JavaScript frameworks and libraries.",
          "",
          "Collaborated with design teams to implement pixel-perfect",
          "user interfaces and ensure optimal user experience.",
          "",
          "Optimized application performance and implemented",
          "accessibility best practices."
        ],
        technologies: ["Vue.js", "JavaScript", "SCSS", "Webpack", "Git"]
      }
    ],
    skills: [
      // Frontend
      { name: "JavaScript", level: 95, category: "frontend" },
      { name: "TypeScript", level: 90, category: "frontend" },
      { name: "React", level: 92, category: "frontend" },
      { name: "Angular", level: 88, category: "frontend" },
      { name: "Vue.js", level: 85, category: "frontend" },
      { name: "HTML/CSS", level: 95, category: "frontend" },
      { name: "SCSS/Sass", level: 90, category: "frontend" },
      
      // Backend
      { name: "Node.js", level: 88, category: "backend" },
      { name: "Express.js", level: 85, category: "backend" },
      { name: "Python", level: 80, category: "backend" },
      { name: "C#/.NET", level: 75, category: "backend" },
      { name: "REST APIs", level: 90, category: "backend" },
      { name: "GraphQL", level: 70, category: "backend" },
      
      // Database
      { name: "MongoDB", level: 85, category: "database" },
      { name: "PostgreSQL", level: 80, category: "database" },
      { name: "MySQL", level: 75, category: "database" },
      { name: "Firebase", level: 88, category: "database" },
      { name: "Redis", level: 70, category: "database" },
      
      // Mobile
      { name: "Flutter", level: 90, category: "mobile" },
      { name: "Dart", level: 88, category: "mobile" },
      { name: "React Native", level: 75, category: "mobile" },
      
      // Tools & Others
      { name: "Git", level: 92, category: "tools" },
      { name: "Docker", level: 75, category: "tools" },
      { name: "AWS", level: 80, category: "tools" },
      { name: "CI/CD", level: 78, category: "tools" },
      { name: "Figma", level: 85, category: "tools" }
    ],
    certifications: [
      {
        name: "AWS Certified Developer - Associate",
        issuer: "Amazon Web Services",
        date: "2023",
        credentialId: "AWS-DEV-2023-001"
      },
      {
        name: "Google Flutter Certified Developer",
        issuer: "Google",
        date: "2022",
        credentialId: "FLUTTER-2022-456"
      },
      {
        name: "MongoDB Certified Developer",
        issuer: "MongoDB University",
        date: "2022"
      }
    ],
    achievements: [
      "🏆 Led development of award-winning mobile app with 50K+ downloads",
      "🚀 Improved application performance by 40% through optimization",
      "👥 Mentored 5+ junior developers in modern web technologies",
      "📱 Successfully launched 3 mobile apps on both iOS and Android stores",
      "🎯 Achieved 99.9% uptime for critical production applications",
      "💡 Implemented CI/CD pipeline reducing deployment time by 60%",
      "🌟 Received 'Developer of the Year' award in 2023",
      "📊 Built analytics dashboard processing 1M+ daily events"
    ]
  };

  skillCategories = [
    { key: 'frontend', name: 'Frontend', icon: 'fas fa-laptop-code' },
    { key: 'backend', name: 'Backend', icon: 'fas fa-server' },
    { key: 'database', name: 'Database', icon: 'fas fa-database' },
    { key: 'mobile', name: 'Mobile', icon: 'fas fa-mobile-alt' },
    { key: 'tools', name: 'Tools', icon: 'fas fa-tools' }
  ];

  activeSkillCategory = 'frontend';

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    // Check for section query parameter
    this.route.queryParams.subscribe(params => {
      if (params['section']) {
        this.activeSection = params['section'];
      }
    });
  }

  setActiveSection(section: string) {
    this.activeSection = section;
  }

  setActiveSkillCategory(category: string) {
    this.activeSkillCategory = category;
  }

  getSkillsByCategory(category: string): Skill[] {
    return this.professionalInfo.skills.filter(skill => skill.category === category);
  }

  getLineNumbers(content: string[]): number[] {
    return Array.from({ length: content.length + 4 }, (_, i) => i + 1);
  }

  getSkillColor(level: number): string {
    if (level >= 90) return 'var(--vscode-success)';
    if (level >= 75) return 'var(--vscode-accent)';
    if (level >= 60) return 'var(--vscode-warning)';
    return 'var(--vscode-text-muted)';
  }
}
