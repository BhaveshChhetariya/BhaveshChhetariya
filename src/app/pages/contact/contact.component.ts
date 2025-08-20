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
    email: 'your.email@example.com',
    phone: '+1 (555) 123-4567',
    location: 'Your City, Country',
    timezone: 'UTC+0',
    availability: 'Available for freelance work'
  };

  socialLinks = [
    { name: 'LinkedIn', url: 'https://linkedin.com/in/your-profile', icon: 'fab fa-linkedin' },
    { name: 'GitHub', url: 'https://github.com/your-username', icon: 'fab fa-github' },
    { name: 'Twitter', url: 'https://twitter.com/your-handle', icon: 'fab fa-twitter' },
    { name: 'Instagram', url: 'https://instagram.com/your-handle', icon: 'fab fa-instagram' }
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
