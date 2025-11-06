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
    children: [
      {
        path: '',
        redirectTo: 'bio',
        pathMatch: 'full'
      },
      {
        path: 'bio',
        loadComponent: () => import('./pages/personal-info/bio/bio.component').then(m => m.BioComponent)
      },
      {
        path: 'interests',
        loadComponent: () => import('./pages/personal-info/interests/interests.component').then(m => m.InterestsComponent)
      },
      {
        path: 'education',
        loadComponent: () => import('./pages/personal-info/education/education.component').then(m => m.EducationComponent)
      },
      {
        path: 'hobbies',
        loadComponent: () => import('./pages/personal-info/hobbies/hobbies.component').then(m => m.HobbiesComponent)
      },
      {
        path: 'languages',
        loadComponent: () => import('./pages/personal-info/languages/languages.component').then(m => m.LanguagesComponent)
      }
    ]
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
