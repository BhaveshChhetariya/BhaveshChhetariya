import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-skills',
  templateUrl: './skills.component.html',
  styleUrls: ['./skills.component.scss']
})
export class SkillsComponent implements OnInit {
  skillCategories = [
    {
      name: 'Frontend',
      skills: [
        { name: 'HTML5', level: 95 },
        { name: 'CSS3/SCSS', level: 90 },
        { name: 'JavaScript', level: 92 },
        { name: 'TypeScript', level: 88 },
        { name: 'Angular', level: 90 },
        { name: 'React', level: 85 }
      ]
    },
    {
      name: 'Backend',
      skills: [
        { name: 'Node.js', level: 88 },
        { name: 'Express', level: 85 },
        { name: 'Python', level: 80 },
        { name: 'Java', level: 75 },
        { name: 'MongoDB', level: 82 },
        { name: 'PostgreSQL', level: 78 }
      ]
    },
    {
      name: 'Tools & Others',
      skills: [
        { name: 'Git', level: 90 },
        { name: 'Docker', level: 80 },
        { name: 'AWS', level: 75 },
        { name: 'CI/CD', level: 78 },
        { name: 'Agile/Scrum', level: 85 },
        { name: 'RESTful APIs', level: 90 }
      ]
    }
  ];

  constructor() { }

  ngOnInit(): void {
  }

}
