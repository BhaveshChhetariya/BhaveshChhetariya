import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface ContactForm {
  name: string;
  email: string;
  subject: string;
  message: string;
}

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent {
  contactForm: ContactForm = {
    name: '',
    email: '',
    subject: '',
    message: ''
  };

  isSubmitting = false;
  submitSuccess = false;
  submitError = false;

  contactInfo = {
    email: 'developer@example.com',
    phone: '+91 98765 43210',
    location: 'Mumbai, India',
    timezone: 'UTC+5:30 (IST)',
    availability: 'Available for new opportunities'
  };

  socialLinks = [
    { name: 'LinkedIn', url: 'https://linkedin.com/in/developer-profile', icon: 'fab fa-linkedin' },
    { name: 'GitHub', url: 'https://github.com/developer-username', icon: 'fab fa-github' },
    { name: 'Twitter', url: 'https://twitter.com/dev_handle', icon: 'fab fa-twitter' },
    { name: 'Portfolio', url: 'https://developer-portfolio.com', icon: 'fas fa-globe' }
  ];

  onSubmit() {
    if (!this.isFormValid()) {
      return;
    }

    this.isSubmitting = true;
    this.submitError = false;

    // Simulate form submission
    setTimeout(() => {
      this.isSubmitting = false;
      this.submitSuccess = true;
      this.resetForm();
      
      // Hide success message after 3 seconds
      setTimeout(() => {
        this.submitSuccess = false;
      }, 3000);
    }, 2000);
  }

  private isFormValid(): boolean {
    return !!(
      this.contactForm.name.trim() &&
      this.contactForm.email.trim() &&
      this.contactForm.subject.trim() &&
      this.contactForm.message.trim()
    );
  }

  private resetForm() {
    this.contactForm = {
      name: '',
      email: '',
      subject: '',
      message: ''
    };
  }

  openSocialLink(url: string) {
    window.open(url, '_blank');
  }

  copyToClipboard(text: string) {
    navigator.clipboard.writeText(text).then(() => {
      // You could show a toast notification here
      console.log('Copied to clipboard:', text);
    });
  }
}
