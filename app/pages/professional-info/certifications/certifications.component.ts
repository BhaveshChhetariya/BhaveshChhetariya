import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

interface Certification {
  name: string;
  issuer: string;
  date: string;
  credentialId?: string;
}

@Component({
  selector: 'app-certifications',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './certifications.component.html',
  styleUrls: ['../professional-info.component.scss']
})
export class CertificationsComponent {
  certifications: Certification[] = [
    {
      name: "Master of Computer Applications - MCA",
      issuer: "Chandigarh University",
      date: "July 2020 - November 2022"
    },
    {
      name: "Bachelor's degree, Computer Science",
      issuer: "Veer Narmad South Gujarat University, Surat",
      date: "2016 - 2020"
    },
    {
      name: "Angular Framework Certification",
      issuer: "Professional Development",
      date: "2021"
    },
    {
      name: "AWS Cloud Services",
      issuer: "Amazon Web Services",
      date: "2023"
    },
    {
      name: "Flutter Development",
      issuer: "Google Developers",
      date: "2021"
    }
  ];

  learningGoals = [
    {
      technology: "Advanced AWS Architecture",
      priority: "high",
      timeline: "Q2 2024"
    },
    {
      technology: "Microservices with .NET",
      priority: "high",
      timeline: "Q1 2024"
    },
    {
      technology: "Advanced Flutter State Management",
      priority: "medium",
      timeline: "Q3 2024"
    },
    {
      technology: "Machine Learning Integration",
      priority: "medium",
      timeline: "Q4 2024"
    }
  ];

  getLineNumbers(): number[] {
    let totalLines = 4; // Header comments and certifications property
    totalLines += this.certifications.length * 7; // Each cert (6 lines + empty line)
    totalLines += this.learningGoals.length * 3; // Each goal (3 lines + empty line)
    return Array.from({ length: totalLines }, (_, i) => i + 1);
  }
}
