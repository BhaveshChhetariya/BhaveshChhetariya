#!/usr/bin/env node

/**
 * Profile Update Helper Script
 * Run this script to quickly update your portfolio with resume information
 */

const fs = require('fs');
const path = require('path');

console.log('🔄 Portfolio Profile Update Helper\n');

// Profile data template - Replace with your actual information
const profileData = {
  personal: {
    name: "Your Full Name",
    title: "Your Professional Title",
    location: "Your City, State",
    email: "your.email@domain.com",
    phone: "+1 (555) 123-4567",
    linkedin: "https://linkedin.com/in/yourprofile",
    github: "https://github.com/yourusername",
    bio: [
      "Replace with your professional summary from LinkedIn PDF",
      "Add your career objectives and development passion",
      "Include your key strengths and what drives you",
      "Mention your approach to problem-solving and teamwork"
    ]
  },
  
  experience: [
    {
      position: "Your Current/Recent Job Title",
      company: "Company Name",
      duration: "Start Date - End Date (or Present)",
      description: [
        "Key responsibility or achievement #1",
        "Major project or impact you made",
        "Technologies and methodologies you used",
        "Results or improvements you delivered"
      ],
      technologies: ["Tech1", "Tech2", "Tech3", "Tech4"]
    }
    // Add more experience entries from your PDF
  ],
  
  education: [
    {
      degree: "Your Degree (e.g., Bachelor of Computer Science)",
      institution: "University/College Name",
      year: "Graduation Year",
      description: "Relevant coursework, GPA, honors, or projects"
    }
  ],
  
  skills: [
    // Frontend
    { name: "JavaScript", level: 85, category: "Frontend" },
    { name: "TypeScript", level: 80, category: "Frontend" },
    { name: "Angular", level: 90, category: "Frontend" },
    { name: "React", level: 75, category: "Frontend" },
    { name: "HTML/CSS", level: 90, category: "Frontend" },
    
    // Backend
    { name: "Node.js", level: 80, category: "Backend" },
    { name: "Python", level: 70, category: "Backend" },
    { name: "Java", level: 65, category: "Backend" },
    
    // Database
    { name: "MongoDB", level: 75, category: "Database" },
    { name: "PostgreSQL", level: 70, category: "Database" },
    
    // Tools
    { name: "Git", level: 85, category: "Tools" },
    { name: "Docker", level: 70, category: "Tools" },
    { name: "AWS", level: 65, category: "Tools" }
  ],
  
  projects: [
    {
      title: "Project Name 1",
      description: "Brief description of what this project does and its purpose",
      technologies: ["Angular", "Node.js", "MongoDB"],
      githubUrl: "https://github.com/yourusername/project1",
      liveUrl: "https://project1-demo.com",
      featured: true
    }
    // Add more projects from your experience
  ]
};

// File paths
const files = {
  personalInfo: 'src/app/pages/personal-info/personal-info.component.ts',
  professionalInfo: 'src/app/pages/professional-info/professional-info.component.ts',
  contact: 'src/app/pages/contact/contact.component.ts',
  projects: 'src/app/pages/projects/projects.component.ts'
};

function updatePersonalInfo() {
  console.log('📝 To update personal information:');
  console.log(`1. Open: ${files.personalInfo}`);
  console.log('2. Replace the personalInfo object with your data from the PDF');
  console.log('3. Update bio, interests, education, and languages sections\n');
}

function updateProfessionalInfo() {
  console.log('💼 To update professional information:');
  console.log(`1. Open: ${files.professionalInfo}`);
  console.log('2. Replace experience array with your work history');
  console.log('3. Update skills with your actual proficiency levels');
  console.log('4. Add your certifications and achievements\n');
}

function updateContactInfo() {
  console.log('📞 To update contact information:');
  console.log(`1. Open: ${files.contact}`);
  console.log('2. Replace contact details with your actual information');
  console.log('3. Update social media links\n');
}

function updateProjects() {
  console.log('🚀 To update projects:');
  console.log(`1. Open: ${files.projects}`);
  console.log('2. Replace sample projects with your actual work');
  console.log('3. Add GitHub links and live demo URLs\n');
}

function showInstructions() {
  console.log('📋 PROFILE UPDATE INSTRUCTIONS');
  console.log('================================\n');
  
  console.log('🔍 STEP 1: Extract information from your PDF');
  console.log('   - Open Profile.pdf in your Downloads folder');
  console.log('   - Copy your personal details, work experience, education');
  console.log('   - Note your skills, certifications, and projects\n');
  
  updatePersonalInfo();
  updateProfessionalInfo();
  updateContactInfo();
  updateProjects();
  
  console.log('🎨 STEP 5: Customize styling and branding');
  console.log('   - Update colors in src/styles.scss');
  console.log('   - Add your professional photo to src/assets/images/');
  console.log('   - Update favicon and meta tags in src/index.html\n');
  
  console.log('🧪 STEP 6: Test your changes');
  console.log('   - Run: npm start');
  console.log('   - Check all sections work correctly');
  console.log('   - Test on mobile and desktop\n');
  
  console.log('🚀 STEP 7: Build and deploy');
  console.log('   - Run: npm run build');
  console.log('   - Deploy to GitHub Pages, Netlify, or Vercel\n');
  
  console.log('💡 TIP: Update one section at a time and test frequently!');
}

// Run the helper
showInstructions();

// Export profile data template for reference
module.exports = profileData;
