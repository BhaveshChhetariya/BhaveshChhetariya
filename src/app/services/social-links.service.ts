import { Injectable } from '@angular/core';

export interface SocialLink {
  name: string;
  icon: string;
  url: string;
}

@Injectable({
  providedIn: 'root'
})
export class SocialLinksService {
  private _socialLinks: SocialLink[] = [
    { name: 'GitHub', icon: 'fab fa-github', url: 'https://github.com/bhaveshc20' },
    { name: 'LinkedIn', icon: 'fab fa-linkedin-in', url: 'https://linkedin.com/in/bhaveshc' },
    { name: 'Twitter', icon: 'fab fa-twitter', url: 'https://twitter.com/bhaveshc' },
    { name: 'Instagram', icon: 'fab fa-instagram', url: 'https://instagram.com/bhaveshc' },
    { name: 'Medium', icon: 'fab fa-medium-m', url: 'https://medium.com/@bhaveshc' }
  ];

  constructor() { }

  get socialLinks(): SocialLink[] {
    return this._socialLinks;
  }

  get mainSocialLinks(): SocialLink[] {
    // Return only the main social links (first 3)
    return this._socialLinks.slice(0, 3);
  }

  get allSocialLinks(): SocialLink[] {
    return [...this._socialLinks];
  }

  getSocialLink(name: string): SocialLink | undefined {
    return this._socialLinks.find(link => link.name.toLowerCase() === name.toLowerCase());
  }
}
