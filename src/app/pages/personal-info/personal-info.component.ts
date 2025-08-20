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
      "I'm a passionate developer focused on building smooth,",
      "intuitive user experiences with clean code at the core.",
      "",
      "I love shaping ideas into pixel perfect apps and making sure",
      "every detail from animation to accessibility feels",
      "intentional.",
      "",
      "Alongside dev work, I document everything I learn and share",
      "insights that help other developers grow. 😊"
    ],
    interests: [
      "🎮 Gaming & Interactive Experiences",
      "🎨 UI/UX Design & Animation",
      "📱 Mobile App Development",
      "🌐 Web Technologies & Frameworks",
      "🤖 AI & Machine Learning",
      "📚 Technical Writing & Blogging",
      "🎵 Music & Audio Programming",
      "🏃‍♂️ Fitness & Outdoor Activities"
    ],
    education: [
      {
        degree: "Bachelor of Computer Science",
        institution: "Your University",
        year: "2018-2022",
        description: "Focused on software engineering, algorithms, and web development. Graduated with honors."
      },
      {
        degree: "Full Stack Web Development Bootcamp",
        institution: "Tech Academy",
        year: "2022",
        description: "Intensive 6-month program covering modern web technologies including React, Node.js, and databases."
      }
    ],
    hobbies: [
      "Playing around with code, UI challenges, and brain teasers—",
      "they're my kind of game.",
      "",
      "Give me a tricky layout or a bug to squash, and I'm all in!"
    ],
    languages: [
      { name: "English", level: "Native" },
      { name: "Spanish", level: "Conversational" },
      { name: "French", level: "Basic" }
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
}
