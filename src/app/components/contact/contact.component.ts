import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {
  contactForm: FormGroup;
  submitted = false;
  success = false;
  
  contactInfo = {
    email: 'bhavesh@example.com',
    phone: '+1 (555) 123-4567',
    location: 'New York, NY'
  };

  constructor(private fb: FormBuilder) {
    this.contactForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      subject: ['', Validators.required],
      message: ['', [Validators.required, Validators.minLength(10)]]
    });
  }

  ngOnInit(): void {
  }
  
  get f() { return this.contactForm.controls; }
  
  onSubmit() {
    this.submitted = true;
    
    if (this.contactForm.invalid) {
      return;
    }
    
    // Simulate form submission
    setTimeout(() => {
      this.success = true;
      this.contactForm.reset();
      this.submitted = false;
      
      // Reset success message after 5 seconds
      setTimeout(() => {
        this.success = false;
      }, 5000);
    }, 1500);
  }
}
