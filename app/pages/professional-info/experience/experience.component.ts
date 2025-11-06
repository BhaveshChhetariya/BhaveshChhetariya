import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

interface Experience {
  position: string;
  company: string;
  duration: string;
  description: string[];
  technologies: string[];
}

@Component({
  selector: 'app-experience',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './experience.component.html',
  styleUrls: ['../professional-info.component.scss']
})
export class ExperienceComponent {
  experience: Experience[] = [
    {
      position: "Full Stack Developer",
      company: "Mobibox Softech Private Limited",
      duration: "June 2024 - Present (1 year 6 months)",
      description: [
        "Developed full-stack applications for MVAS using Angular and .NET.",
        "Designed and implemented user interfaces using Angular frameworks.",
        "Developed robust backend services using .NET to power web and mobile",
        "applications.",
        "Integrated with various APIs and databases to ensure seamless data flow.",
        "Deployed applications to production environments and monitored",
        "performance."
      ],
      technologies: ["Angular", ".NET", "APIs", "Databases", "Production Deployment"]
    },
    {
      position: "Technical Integration Manager",
      company: "Mobibox Softech Private Limited",
      duration: "February 2024 - August 2025 (1 year 7 months)",
      description: [
        "Integrated various third-party clients for MVAS services using .NET.",
        "Leveraged AWS DynamoDB, Redshift, MySQL, and OpenSearch for efficient",
        "data storage and retrieval.",
        "Implemented OTP and VCODE integration with DynamoDB.",
        "Implemented anti-fraud measures to protect against fraudulent activities.",
        "Managed network operations, including creating network groups, smart links,",
        "campaigns, and pixels.",
        "Optimized traffic alignment and country-specific rate updates.",
        "Utilized OpenSearch to identify performance bottlenecks, errors, and",
        "conversion issues.",
        "Developed pre-landing pages for Facebook and created automated alerts for",
        "anomalies using email, Telegram, and Jira."
      ],
      technologies: ["AWS DynamoDB", "Redshift", "MySQL", "OpenSearch", ".NET", "Facebook", "Telegram", "Jira"]
    },
    {
      position: "Flutter Application Developer",
      company: "Mobibox Softech Private Limited",
      duration: "January 2021 - February 2024 (3 years 2 months)",
      description: [
        "Developed a comprehensive food delivery app using Flutter, Firebase, and",
        "REST APIs.",
        "Implemented features like user authentication, real-time order tracking,",
        "payment integration (Razorpay, Bob), and in-app notifications.",
        "Utilized state management with Provider, caching mechanisms, and",
        "localization for multiple language support.",
        "Integrated analytics tools (Adjust, Meta, Firebase) to track user behavior and",
        "optimize app performance.",
        "Deployed the app to both Android and iOS platforms.",
        "Worked on multiple white-label projects for India and Lebanon."
      ],
      technologies: ["Flutter", "Firebase", "REST APIs", "Razorpay", "Provider", "Adjust", "Meta", "Android", "iOS"]
    },
    {
      position: "Mobile Application Developer",
      company: "Mobibox Softech Private Limited",
      duration: "September 2020 - January 2021 (5 months)",
      description: [
        "Developed an Android Application Employee Management System for",
        "Mobibox Organization using Java and SQLite."
      ],
      technologies: ["Java", "SQLite", "Android"]
    }
  ];

  getLineNumbers(): number[] {
    let totalLines = 5; // Header comments and const declaration
    this.experience.forEach(exp => {
      totalLines += 8 + exp.description.length + exp.technologies.length + 1; // Each experience entry + empty line
    });
    totalLines += 5; // Closing bracket
    return Array.from({ length: totalLines }, (_, i) => i + 1);
  }
}
