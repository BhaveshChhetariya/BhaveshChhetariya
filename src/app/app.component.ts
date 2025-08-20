import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { VscodeLayoutComponent } from './components/vscode-layout/vscode-layout.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, VscodeLayoutComponent],
  template: `
    <app-vscode-layout>
      <router-outlet></router-outlet>
    </app-vscode-layout>
  `,
  styles: [`
    :host {
      display: block;
      height: 100vh;
      overflow: hidden;
    }
  `]
})
export class AppComponent {
  title = 'vscode-portfolio';
}
