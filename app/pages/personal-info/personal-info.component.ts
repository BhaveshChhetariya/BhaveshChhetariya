import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';

interface PersonalInfo {
  bio: string[];
  interests: string[];
  education: {
    degree: string;
    institution: string;
    year: string;
    description: string;
  }[];
  hobbies: string[];
  languages: {
    name: string;
    level: string;
  }[];
}

@Component({
  selector: 'app-personal-info',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './personal-info.component.html',
  styleUrls: ['./personal-info.component.scss']
})
export class PersonalInfoComponent implements OnInit {
  activeSection = 'bio';
  
  personalInfo: PersonalInfo = {
    bio: [
      "I'm a dedicated software developer with a passion for creating",
      "innovative solutions and building scalable applications.",
      "",
      "With expertise in modern web technologies and a strong foundation",
      "in computer science principles, I enjoy tackling complex problems",
      "and delivering high-quality software solutions.",
      "",
      "I believe in continuous learning and staying updated with the",
      "latest industry trends and best practices. 🚀"
    ],
    interests: [
      "💻 Full Stack Development",
      "🌐 Web Technologies & Frameworks",
      "📱 Mobile Application Development",
      "☁️ Cloud Computing & DevOps",
      "🤖 Artificial Intelligence & Machine Learning",
      "🔒 Cybersecurity & Best Practices",
      "📊 Data Analysis & Visualization",
      "🎯 Problem Solving & Algorithm Design"
    ],
    education: [
      {
        degree: "Bachelor of Technology in Computer Science",
        institution: "University of Technology",
        year: "2019-2023",
        description: "Specialized in software engineering, data structures, algorithms, and web development. Maintained excellent academic performance."
      },
      {
        degree: "Professional Certification in Cloud Computing",
        institution: "AWS Training Center",
        year: "2023",
        description: "Comprehensive training in cloud architecture, deployment strategies, and modern DevOps practices."
      }
    ],
    hobbies: [
      "When I'm not coding, you'll find me exploring new technologies,",
      "contributing to open-source projects, or working on personal",
      "development initiatives.",
      "",
      "I also enjoy reading tech blogs, attending developer meetups,",
      "and sharing knowledge with the developer community."
    ],
    languages: [
      { name: "English", level: "Native" },
      { name: "Hindi", level: "Native" },
      { name: "Spanish", level: "Basic" }
    ]
  };

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

  getLineNumbers(content: string[]): number[] {
    return Array.from({ length: content.length }, (_, i) => i + 1);
  }

  getEducationLines(): number[] {
    let totalLines = 4; // Base lines for comments and array declaration
    this.personalInfo.education.forEach(edu => {
      totalLines += 6; // Each education entry has 6 lines
    });
    totalLines += 1; // Closing bracket
    return Array.from({ length: totalLines }, (_, i) => i + 1);
  }

  getLanguageProgress(level: string): string {
    switch (level.toLowerCase()) {
      case 'native':
        return '100%';
      case 'conversational':
        return '75%';
      case 'basic':
        return '40%';
      default:
        return '0%';
    }
  }

  getSectionFileName(): string {
    const fileNames: { [key: string]: string } = {
      'bio': 'bio.md',
      'interests': 'interests.json',
      'education': 'education.js',
      'hobbies': 'hobbies.txt',
      'languages': 'languages.yml'
    };
    return fileNames[this.activeSection] || 'personal-info';
  }

  getBioLineNumbers(): number[] {
    // Total lines for the bio markdown content
    return Array.from({ length: 45 }, (_, i) => i + 1);
  }

  getInterestsLineNumbers(): number[] {
    // Total lines for the interests JSON content (with empty lines)
    return Array.from({ length: 27 }, (_, i) => i + 1);
  }

  getEducationLineNumbers(): number[] {
    // Total lines for the education JavaScript content
    return Array.from({ length: 55 }, (_, i) => i + 1);
  }

  getHobbiesLineNumbers(): number[] {
    // Total lines for the hobbies text content
    return Array.from({ length: 40 }, (_, i) => i + 1);
  }

  getLanguagesLineNumbers(): number[] {
    // Total lines for the languages YAML content
    return Array.from({ length: 50 }, (_, i) => i + 1);
  }
}
