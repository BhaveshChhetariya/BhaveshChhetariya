import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-hobbies',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './hobbies.component.html',
  styleUrls: ['../personal-info.component.scss']
})
export class HobbiesComponent {
  getHobbiesLineNumbers(): number[] {
    return Array.from({ length: 45 }, (_, i) => i + 1);
  }
}
