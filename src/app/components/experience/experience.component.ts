import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-experience',
  templateUrl: './experience.component.html',
  styleUrls: ['./experience.component.scss']
})
export class ExperienceComponent implements OnInit {
  experiences = [
    {
      title: 'Senior Full Stack Developer',
      company: 'Tech Innovations Inc.',
      period: 'Jan 2022 - Present',
      description: 'Leading development of enterprise web applications using Angular, Node.js, and AWS. Implementing CI/CD pipelines and mentoring junior developers.'
    },
    {
      title: 'Full Stack Developer',
      company: 'Digital Solutions Ltd.',
      period: 'Mar 2019 - Dec 2021',
      description: 'Developed and maintained multiple web applications using React, Express, and MongoDB. Collaborated with UX designers to implement responsive interfaces.'
    },
    {
      title: 'Front-end Developer',
      company: 'WebCraft Studios',
      period: 'Jun 2017 - Feb 2019',
      description: 'Created responsive and interactive user interfaces using HTML, CSS, and JavaScript. Worked with various front-end frameworks including Angular and Vue.'
    }
  ];

  constructor() { }

  ngOnInit(): void {
  }

}
