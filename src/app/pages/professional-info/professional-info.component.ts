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
        position: "Full Stack Developer",
        company: "TechCorp Solutions",
        duration: "2023 - Present",
        description: [
          "Developing and maintaining web applications using modern",
          "JavaScript frameworks and cloud technologies.",
          "",
          "Collaborating with cross-functional teams to deliver",
          "scalable solutions that meet business requirements.",
          "",
          "Implementing responsive designs and ensuring optimal",
          "performance across different devices and browsers.",
          "",
          "Working with RESTful APIs, databases, and cloud services",
          "to build robust backend systems."
        ],
        technologies: ["Angular", "Node.js", "TypeScript", "MongoDB", "AWS"]
      },
      {
        position: "Junior Software Developer",
        company: "StartupTech Inc.",
        duration: "2022 - 2023",
        description: [
          "Contributed to the development of web applications",
          "using React and modern JavaScript technologies.",
          "",
          "Participated in code reviews and followed best practices",
          "for clean, maintainable code development.",
          "",
          "Worked closely with senior developers to learn",
          "industry standards and development methodologies."
        ],
        technologies: ["React", "JavaScript", "CSS", "Git", "Firebase"]
      },
      {
        position: "Software Development Intern",
        company: "Digital Solutions Ltd.",
        duration: "2021 - 2022",
        description: [
          "Gained hands-on experience in software development",
          "lifecycle and agile methodologies.",
          "",
          "Assisted in building user interfaces and implementing",
          "basic functionality for web applications.",
          "",
          "Learned version control, testing practices, and",
          "collaborative development workflows."
        ],
        technologies: ["HTML", "CSS", "JavaScript", "Bootstrap", "Git"]
      }
    ],
    skills: [
      // Frontend
      { name: "JavaScript", level: 85, category: "frontend" },
      { name: "TypeScript", level: 80, category: "frontend" },
      { name: "Angular", level: 90, category: "frontend" },
      { name: "React", level: 75, category: "frontend" },
      { name: "HTML/CSS", level: 90, category: "frontend" },
      { name: "SCSS/Sass", level: 85, category: "frontend" },
      { name: "Bootstrap", level: 80, category: "frontend" },
      
      // Backend
      { name: "Node.js", level: 80, category: "backend" },
      { name: "Express.js", level: 75, category: "backend" },
      { name: "Python", level: 70, category: "backend" },
      { name: "REST APIs", level: 85, category: "backend" },
      { name: "GraphQL", level: 60, category: "backend" },
      
      // Database
      { name: "MongoDB", level: 80, category: "database" },
      { name: "PostgreSQL", level: 70, category: "database" },
      { name: "MySQL", level: 75, category: "database" },
      { name: "Firebase", level: 85, category: "database" },
      
      // Tools & Others
      { name: "Git", level: 90, category: "tools" },
      { name: "Docker", level: 65, category: "tools" },
      { name: "AWS", level: 70, category: "tools" },
      { name: "VS Code", level: 95, category: "tools" },
      { name: "Postman", level: 85, category: "tools" },
      { name: "Figma", level: 75, category: "tools" }
    ],
    certifications: [
      {
        name: "AWS Cloud Practitioner",
        issuer: "Amazon Web Services",
        date: "2023",
        credentialId: "AWS-CP-2023-001"
      },
      {
        name: "Angular Certified Developer",
        issuer: "Angular Team",
        date: "2023",
        credentialId: "ANG-DEV-2023-456"
      },
      {
        name: "MongoDB Basics Certification",
        issuer: "MongoDB University",
        date: "2022"
      },
      {
        name: "JavaScript Algorithms and Data Structures",
        issuer: "freeCodeCamp",
        date: "2022"
      }
    ],
    achievements: [
      "🚀 Successfully delivered 5+ web applications from concept to production",
      "📈 Improved application performance by 30% through code optimization",
      "👥 Collaborated effectively in agile development teams",
      "🎯 Maintained 95%+ code coverage through comprehensive testing",
      "💡 Implemented responsive designs for mobile-first applications",
      "🔧 Contributed to open-source projects and community initiatives",
      "📚 Continuously learning and adapting to new technologies",
      "🏆 Recognized for problem-solving skills and attention to detail"
    ]
  };

  skillCategories = [
    { key: 'frontend', name: 'Frontend', icon: 'fas fa-laptop-code' },
    { key: 'backend', name: 'Backend', icon: 'fas fa-server' },
    { key: 'database', name: 'Database', icon: 'fas fa-database' },
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

  getExperienceLines(): number[] {
    let totalLines = 4; // Base lines for comments and array declaration
    this.professionalInfo.experience.forEach(exp => {
      totalLines += 7 + exp.description.length; // Each experience entry
    });
    totalLines += 1; // Closing bracket
    return Array.from({ length: totalLines }, (_, i) => i + 1);
  }

  getSkillColor(level: number): string {
    if (level >= 90) return 'var(--vscode-success)';
    if (level >= 75) return 'var(--vscode-accent)';
    if (level >= 60) return 'var(--vscode-warning)';
    return 'var(--vscode-text-muted)';
  }

  getSectionFileName(): string {
    const fileNames: { [key: string]: string } = {
      'experience': 'experience.js',
      'skills': 'skills.json',
      'certifications': 'certifications.yml',
      'achievements': 'achievements.md'
    };
    return fileNames[this.activeSection] || 'professional-info';
  }
}
