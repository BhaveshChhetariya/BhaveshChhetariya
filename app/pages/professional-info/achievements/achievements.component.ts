import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-achievements',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './achievements.component.html',
  styleUrls: ['../professional-info.component.scss']
})
export class AchievementsComponent {
  achievements: string[] = [
    "🚀 5+ years of experience in full-stack development at Mobibox Softech",
    "📱 Successfully developed and deployed comprehensive food delivery app using Flutter",
    "☁️ Expert-level implementation of AWS services (DynamoDB, Redshift, MySQL, OpenSearch)",
    "🔧 Built robust MVAS applications serving multiple clients across different regions",
    "💡 Implemented anti-fraud measures and automated monitoring systems",
    "🌍 Delivered white-label projects for India and Lebanon markets",
    "⚡ Optimized application performance and implemented real-time tracking systems",
    "🎯 Integrated multiple payment gateways (Razorpay, Bob) and analytics tools",
    "📊 Created automated alert systems using email, Telegram, and Jira integration",
    "🏆 Successfully managed technical integration for various third-party clients"
  ];

  impactMetrics = [
    {
      title: "Years of Experience",
      value: "5+ years at Mobibox Softech",
      description: "Comprehensive experience across multiple roles from Mobile Developer to Full Stack Developer"
    },
    {
      title: "Technology Stack Mastery",
      value: "Angular, .NET, Flutter, AWS",
      description: "Expert-level proficiency in modern web and mobile development technologies"
    },
    {
      title: "Project Delivery",
      value: "Multiple white-label projects",
      description: "Successfully delivered food delivery apps and MVAS solutions for international markets"
    },
    {
      title: "Cloud Integration",
      value: "AWS Multi-service Implementation",
      description: "Leveraged DynamoDB, Redshift, MySQL, and OpenSearch for scalable data solutions"
    }
  ];

  recognitions = [
    {
      year: 2024,
      title: "Full Stack Developer Promotion",
      description: "Promoted to Full Stack Developer role, leading end-to-end application development"
    },
    {
      year: 2024,
      title: "Technical Integration Manager",
      description: "Appointed as Technical Integration Manager, handling complex third-party integrations"
    },
    {
      year: 2022,
      title: "MCA Graduate",
      description: "Completed Master of Computer Applications from Chandigarh University"
    }
  ];

  getLineNumbers(): number[] {
    let totalLines = 7; // Header and intro
    totalLines += this.achievements.length; // Achievement list
    totalLines += 3; // Impact metrics header
    totalLines += this.impactMetrics.length * 3; // Each metric (3 lines)
    totalLines += 3; // Recognition header
    totalLines += this.recognitions.length * 3; // Each recognition (3 lines)
    totalLines += 2; // Quote
    return Array.from({ length: totalLines }, (_, i) => i + 1);
  }
}
