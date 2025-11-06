import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-interests',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './interests.component.html',
  styleUrls: ['../personal-info.component.scss']
})
export class InterestsComponent {
  getInterestsLineNumbers(): number[] {
    return Array.from({ length: 40 }, (_, i) => i + 1);
  }
}
