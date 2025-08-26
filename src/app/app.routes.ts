import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: '/hello',
    pathMatch: 'full'
  },
  {
    path: 'hello',
    loadComponent: () => import('./pages/hello/hello.component').then(m => m.HelloComponent)
  },
  {
    path: 'personal-info',
    loadComponent: () => import('./pages/personal-info/personal-info.component').then(m => m.PersonalInfoComponent)
  },
  {
    path: 'professional-info',
    loadComponent: () => import('./pages/professional-info/professional-info.component').then(m => m.ProfessionalInfoComponent)
  },
  {
    path: 'projects',
    loadComponent: () => import('./pages/projects/projects.component').then(m => m.ProjectsComponent)
  },
  {
    path: 'sessions',
    loadComponent: () => import('./pages/sessions/sessions.component').then(m => m.SessionsComponent)
  },
  {
    path: 'articles',
    loadComponent: () => import('./pages/articles/articles.component').then(m => m.ArticlesComponent)
  },
  {
    path: 'contact',
    loadComponent: () => import('./pages/contact/contact.component').then(m => m.ContactComponent)
  },
  {
    path: '**',
    redirectTo: '/hello'
  }
];
