import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit, OnDestroy {
  contactForm: FormGroup;
  submitted = false;
  success = false;
  loading = false;
  formTouched = false;
  private destroy$ = new Subject<void>();
  
  contactInfo = {
    email: 'contact@bhaveshchhetariya.com',
    phone: '+1 (555) 123-4567',
    location: 'New York, NY'
  };

  socialLinks = [
    { name: 'GitHub', icon: 'fab fa-github', url: 'https://github.com/bhaveshc20' },
    { name: 'LinkedIn', icon: 'fab fa-linkedin-in', url: 'https://linkedin.com/in/bhaveshc' },
    { name: 'Twitter', icon: 'fab fa-twitter', url: 'https://twitter.com/bhaveshc' }
  ];

  constructor(private fb: FormBuilder) {
    this.contactForm = this.fb.group({
      name: ['', [
        Validators.required, 
        Validators.minLength(2),
        Validators.pattern(/^[a-zA-Z\s]*$/)
      ]],
      email: ['', [
        Validators.required, 
        Validators.email,
        Validators.pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)
      ]],
      subject: ['', [
        Validators.required,
        Validators.minLength(5),
        Validators.maxLength(100)
      ]],
      message: ['', [
        Validators.required, 
        Validators.minLength(10),
        Validators.maxLength(1000)
      ]]
    });
  }

  ngOnInit(): void {
    // Track form changes to show validation in real-time after first touch
    this.contactForm.valueChanges
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => {
        if (this.formTouched) {
          this.validateAllFormFields();
        }
      });
  }
  
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
  
  get f() { return this.contactForm.controls; }
  
  onSubmit() {
    this.submitted = true;
    this.formTouched = true;
    this.validateAllFormFields();
    
    if (this.contactForm.invalid) {
      this.scrollToFirstError();
      return;
    }
    
    this.loading = true;
    
    // Simulate form submission
    setTimeout(() => {
      this.success = true;
      this.loading = false;
      this.contactForm.reset();
      this.submitted = false;
      this.formTouched = false;
      
      // Reset success message after 5 seconds
      setTimeout(() => {
        this.success = false;
      }, 5000);
    }, 1500);
  }
  
  // Helper method to mark all fields as touched for validation
  validateAllFormFields() {
    Object.keys(this.contactForm.controls).forEach(field => {
      const control = this.contactForm.get(field);
      control?.markAsTouched({ onlySelf: true });
    });
  }
  
  // Scroll to the first error on the form
  scrollToFirstError() {
    const firstElementWithError = document.querySelector('.form-group .invalid');
    if (firstElementWithError) {
      firstElementWithError.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }
  
  // Check if field is invalid and should show error
  isFieldInvalid(fieldName: string): boolean {
    const field = this.contactForm.get(fieldName);
    return !!(field && field.invalid && (field.dirty || field.touched || this.submitted));
  }
  
  // Get character count for textarea
  getCharacterCount(fieldName: string): number {
    const value = this.contactForm.get(fieldName)?.value || '';
    return value.length;
  }
  
  // Reset the form
  resetForm() {
    this.contactForm.reset();
    this.submitted = false;
    this.formTouched = false;
  }
}
