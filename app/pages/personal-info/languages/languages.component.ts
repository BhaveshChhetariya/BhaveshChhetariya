import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-languages',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './languages.component.html',
  styleUrls: ['../personal-info.component.scss']
})
export class LanguagesComponent {
  getLanguagesLineNumbers(): number[] {
    return Array.from({ length: 47 }, (_, i) => i + 1);
  }
}
