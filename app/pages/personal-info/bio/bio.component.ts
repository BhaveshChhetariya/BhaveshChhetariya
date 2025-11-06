import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-bio',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './bio.component.html',
  styleUrls: ['../personal-info.component.scss']
})
export class BioComponent {
  getBioLineNumbers(): number[] {
    return Array.from({ length: 50 }, (_, i) => i + 1);
  }
}
