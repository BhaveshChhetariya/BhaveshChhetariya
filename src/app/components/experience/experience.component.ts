import { Component, OnInit } from '@angular/core';

interface Experience {
  title: string;
  company: string;
  location: string;
  employmentType: string;
  period: string;
  description: string[];
  skills: string[];
}

@Component({
  selector: 'app-experience',
  templateUrl: './experience.component.html',
  styleUrls: ['./experience.component.scss']
})
export class ExperienceComponent implements OnInit {
  experiences: Experience[] = [
    {
      title: 'Full Stack Developer',
      company: 'Mobibox Softech Private Limited',
      location: 'India · On-site',
      employmentType: 'Full-time',
      period: 'Jun 2024 - Present',
      description: [
        'Developed full-stack applications for MVAS using Angular and .NET.',
        'Designed and implemented user interfaces using Angular frameworks.',
        'Developed robust backend services using .NET to power web and mobile applications.',
        'Integrated with various APIs and databases to ensure seamless data flow.',
        'Deployed applications to production environments and monitored performance.'
      ],
      skills: ['Angular', '.NET Framework', 'JavaScript', 'REST APIs']
    },
    {
      title: 'Technical Integration Manager',
      company: 'Mobibox Softech Private Limited',
      location: 'India · On-site',
      employmentType: 'Full-time',
      period: 'Feb 2024 - Present',
      description: [
        'Integrated various third-party clients for MVAS services using .NET.',
        'Leveraged AWS DynamoDB, Redshift, MySQL, and OpenSearch for efficient data storage and retrieval.',
        'Implemented OTP and VCODE integration with DynamoDB.',
        'Implemented anti-fraud measures to protect against fraudulent activities.',
        'Managed network operations, including creating network groups, smart links, campaigns, and pixels.',
        'Optimized traffic alignment and country-specific rate updates.',
        'Utilized OpenSearch to identify performance bottlenecks, errors, and conversion issues.',
        'Developed pre-landing pages for Facebook and created automated alerts for anomalies using email, Telegram, and Jira.'
      ],
      skills: ['.NET Framework', 'AWS (DynamoDB, Redshift, MySQL, OpenSearch)', 'REST APIs', 'Data Analysis', 'Network Management Systems (NMS)', 'Automation']
    },
    {
      title: 'Flutter Application Developer',
      company: 'Mobibox Softech Private Limited',
      location: 'India · On-site',
      employmentType: 'Full-time',
      period: 'Jan 2021 - Feb 2024',
      description: [
        'Developed a comprehensive food delivery app using Flutter, Firebase, and REST APIs.',
        'Implemented features like user authentication, real-time order tracking, payment integration (Razorpay, Bob), and in-app notifications.',
        'Utilized state management with Provider, caching mechanisms, and localization for multiple language support.',
        'Integrated analytics tools (Adjust, Meta, Firebase) to track user behavior and optimize app performance.',
        'Deployed the app to both Android and iOS platforms.',
        'Worked on multiple white-label projects for India and Lebanon.'
      ],
      skills: ['Flutter', 'Dart', 'Firebase', 'REST APIs', 'Android and iOS Deployment']
    },
    {
      title: 'Mobile Application Developer',
      company: 'Mobibox Softech Private Limited',
      location: 'India · On-site',
      employmentType: 'Internship',
      period: 'Sep 2020 - Jan 2021',
      description: [
        'Developed an Android Application Employee Management System for Mobibox Organization using Java and SQLite.'
      ],
      skills: ['Java', 'SQLite', 'Android Studio', 'Problem Solving']
    }
  ];

  constructor() { }

  ngOnInit(): void {
  }

  getExperienceDuration(period: string): string {
    const parts = period.split(' - ');
    if (parts.length !== 2) return '';
    
    const startDate = new Date(parts[0]);
    const endDate = parts[1] === 'Present' ? new Date() : new Date(parts[1]);
    
    const years = endDate.getFullYear() - startDate.getFullYear();
    const months = endDate.getMonth() - startDate.getMonth();
    
    let totalMonths = years * 12 + months;
    if (endDate.getDate() < startDate.getDate()) {
      totalMonths--;
    }
    
    const calcYears = Math.floor(totalMonths / 12);
    const calcMonths = totalMonths % 12;
    
    let duration = '';
    if (calcYears > 0) {
      duration += `${calcYears} ${calcYears === 1 ? 'yr' : 'yrs'}`;
    }
    if (calcMonths > 0) {
      duration += `${duration ? ' ' : ''}${calcMonths} ${calcMonths === 1 ? 'mo' : 'mos'}`;
    }
    
    return duration;
  }
}
