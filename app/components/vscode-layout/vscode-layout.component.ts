import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, NavigationEnd } from '@angular/router';
import { RouterModule } from '@angular/router';

/** Interface for tab representation in the layout */
interface Tab {
  name: string;
  route: string;
  active: boolean;
}

/** Interface for menu item structure with optional children */
interface MenuItem {
  name: string;
  route?: string;
  icon: string;
  active: boolean;
  children?: MenuItem[];
  expanded?: boolean;
}

/**
 * VSCode Layout Component
 * Provides the main layout structure mimicking VSCode interface
 * Handles navigation, tabs, and menu structure
 */
@Component({
  selector: 'app-vscode-layout',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './vscode-layout.component.html',
  styleUrls: ['./vscode-layout.component.scss']
})
export class VscodeLayoutComponent implements OnInit {
  /** Array of open tabs */
  tabs: Tab[] = [];
  
  /** Menu structure for the file explorer */
  menuStructure: MenuItem[] = [
    {
      name: 'hello.js',
      route: '/hello',
      icon: 'fas fa-home',
      active: false
    },
    {
      name: 'personal-info',
      icon: 'fas fa-user-circle',
      active: false,
      expanded: false,
      children: [
        { name: '_bio', route: '/personal-info/bio', icon: 'fas fa-file-alt', active: false },
        { name: '_interests', route: '/personal-info/interests', icon: 'fas fa-heart', active: false },
        { name: '_education', route: '/personal-info/education', icon: 'fas fa-graduation-cap', active: false },
        { name: '_hobbies', route: '/personal-info/hobbies', icon: 'fas fa-gamepad', active: false },
        { name: '_languages', route: '/personal-info/languages', icon: 'fas fa-globe', active: false }
      ]
    },
    {
      name: 'professional-info',
      icon: 'fas fa-briefcase',
      active: false,
      expanded: false,
      children: [
        { name: '_experience', route: '/professional-info?section=experience', icon: 'fas fa-building', active: false },
        { name: '_hard-skills', route: '/professional-info?section=skills', icon: 'fas fa-code', active: false },
        { name: '_certifications', route: '/professional-info?section=certifications', icon: 'fas fa-certificate', active: false },
        { name: '_achievements', route: '/professional-info?section=achievements', icon: 'fas fa-trophy', active: false }
      ]
    },
    {
      name: 'projects',
      icon: 'fas fa-folder',
      active: false,
      expanded: false,
      children: [
        { name: '_portfolio', route: '/projects', icon: 'fas fa-laptop-code', active: false },
        { name: '_sessions', route: '/sessions', icon: 'fas fa-chalkboard-teacher', active: false },
        { name: '_articles', route: '/articles', icon: 'fas fa-newspaper', active: false }
      ]
    },
    {
      name: 'contact.md',
      route: '/contact',
      icon: 'fas fa-envelope',
      active: false
    }
  ];

  constructor(private router: Router) {}

  ngOnInit() {
    // Set initial active state
    this.updateActiveStates(this.router.url);
    
    // Listen to route changes
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.updateActiveStates(event.url);
      }
    });
  }

  updateActiveStates(url: string) {
    // Reset all active states
    this.resetActiveStates(this.menuStructure);
    
    // Set active state for current route
    this.setActiveState(this.menuStructure, url);
    
    // Update tabs
    this.tabs.forEach(tab => {
      tab.active = tab.route === url;
    });
  }

  private resetActiveStates(items: MenuItem[]) {
    items.forEach(item => {
      item.active = false;
      if (item.children) {
        this.resetActiveStates(item.children);
      }
    });
  }

  private setActiveState(items: MenuItem[], url: string): boolean {
    for (const item of items) {
      if (item.route && this.isRouteActive(item.route, url)) {
        item.active = true;
        return true;
      }
      
      if (item.children && this.setActiveState(item.children, url)) {
        item.expanded = true;
        return true;
      }
    }
    return false;
  }

  private isRouteActive(itemRoute: string, currentUrl: string): boolean {
    // Handle query parameters
    const baseRoute = itemRoute.split('?')[0];
    const currentBaseRoute = currentUrl.split('?')[0];
    
    if (baseRoute === currentBaseRoute) {
      // Check query parameters if they exist
      if (itemRoute.includes('?')) {
        return currentUrl.includes(itemRoute.split('?')[1]);
      }
      return true;
    }
    return false;
  }

  toggleSection(item: MenuItem) {
    if (item.children) {
      item.expanded = !item.expanded;
    }
  }

  onMenuItemClick(item: MenuItem) {
    if (item.route) {
      // Add tab if not exists
      const existingTab = this.tabs.find(tab => tab.route === item.route);
      if (!existingTab) {
        this.tabs.push({
          name: item.name,
          route: item.route,
          active: true
        });
      }

      // Navigate to route
      this.router.navigate([item.route.split('?')[0]], {
        queryParams: this.getQueryParams(item.route)
      });
    } else if (item.children) {
      // Toggle expansion for parent items
      this.toggleSection(item);
    }
  }

  private getQueryParams(route: string): any {
    if (!route.includes('?')) return {};
    
    const queryString = route.split('?')[1];
    const params: any = {};
    
    queryString.split('&').forEach(param => {
      const [key, value] = param.split('=');
      params[key] = value;
    });
    
    return params;
  }

  onTabClick(tab: Tab) {
    this.router.navigate([tab.route.split('?')[0]], {
      queryParams: this.getQueryParams(tab.route)
    });
  }

  closeTab(tab: Tab, event: Event) {
    event.stopPropagation();
    
    const tabIndex = this.tabs.findIndex(t => t === tab);
    this.tabs.splice(tabIndex, 1);

    // If closed tab was active, navigate to another tab or home
    if (tab.active) {
      if (this.tabs.length > 0) {
        const nextTab = this.tabs[Math.max(0, tabIndex - 1)];
        this.router.navigate([nextTab.route.split('?')[0]], {
          queryParams: this.getQueryParams(nextTab.route)
        });
      } else {
        this.router.navigate(['/hello']);
      }
    }
  }
}
