import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-education',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './education.component.html',
  styleUrls: ['../personal-info.component.scss']
})
export class EducationComponent {
  getEducationLineNumbers(): number[] {
    return Array.from({ length: 50 }, (_, i) => i + 1);
  }
}
