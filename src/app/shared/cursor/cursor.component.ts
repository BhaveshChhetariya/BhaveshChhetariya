import { Component, OnInit, OnDestroy, HostListener, Renderer2 } from '@angular/core';

@Component({
  selector: 'app-cursor',
  templateUrl: './cursor.component.html',
  styleUrls: ['./cursor.component.scss']
})
export class CursorComponent implements OnInit, OnDestroy {
  cursorX = 0;
  cursorY = 0;
  isHovering = false;
  private interactiveElements: string[] = ['a', 'button', '.project-card', '.skill-item'];
  private listeners: (() => void)[] = [];

  constructor(private renderer: Renderer2) { }

  ngOnInit(): void {
    // Add event listeners after DOM is fully loaded
    document.addEventListener('DOMContentLoaded', () => {
      this.addHoverListeners();
    });
    
    // Fallback if DOMContentLoaded already fired
    if (document.readyState === 'complete' || document.readyState === 'interactive') {
      setTimeout(() => this.addHoverListeners(), 100);
    }
  }

  ngOnDestroy(): void {
    // Clean up all event listeners
    this.listeners.forEach(unlisten => unlisten());
  }

  @HostListener('document:mousemove', ['$event'])
  onMouseMove(e: MouseEvent) {
    this.cursorX = e.clientX;
    this.cursorY = e.clientY;
  }

  private addHoverListeners(): void {
    // Create a selector from all interactive elements
    const selector = this.interactiveElements.join(', ');
    const elements = document.querySelectorAll(selector);
    
    elements.forEach(el => {
      // Use Renderer2 for better Angular integration
      const enterListener = this.renderer.listen(el, 'mouseenter', () => {
        this.isHovering = true;
      });
      
      const leaveListener = this.renderer.listen(el, 'mouseleave', () => {
        this.isHovering = false;
      });
      
      // Store listeners for cleanup
      this.listeners.push(enterListener, leaveListener);
    });
    
    // Set up a mutation observer to handle dynamically added elements
    const observer = new MutationObserver((mutations) => {
      this.addHoverListenersToNewElements(mutations);
    });
    
    observer.observe(document.body, {
      childList: true,
      subtree: true
    });
  }
  
  private addHoverListenersToNewElements(mutations: MutationRecord[]): void {
    const selector = this.interactiveElements.join(', ');
    
    mutations.forEach(mutation => {
      mutation.addedNodes.forEach(node => {
        if (node.nodeType === Node.ELEMENT_NODE) {
          const element = node as Element;
          
          // Check if the element itself matches
          if (element.matches && element.matches(selector)) {
            this.addListenersToElement(element);
          }
          
          // Check children
          const childElements = element.querySelectorAll(selector);
          childElements.forEach(el => this.addListenersToElement(el));
        }
      });
    });
  }
  
  private addListenersToElement(element: Element): void {
    const enterListener = this.renderer.listen(element, 'mouseenter', () => {
      this.isHovering = true;
    });
    
    const leaveListener = this.renderer.listen(element, 'mouseleave', () => {
      this.isHovering = false;
    });
    
    this.listeners.push(enterListener, leaveListener);
  }
}
