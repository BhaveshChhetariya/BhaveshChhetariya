# Profile Update Guide

## 📋 How to Update Your Portfolio with PDF Resume Content

### 1. Personal Information Updates

**File**: `root/app/pages/personal-info/personal-info.component.ts`

Update the `personalInfo` object with your details:

```typescript
personalInfo: PersonalInfo = {
  bio: [
    "Replace with your professional summary from PDF",
    "Add your career objectives and passion",
    "Include your development philosophy",
    "Mention your key strengths and interests"
  ],
  interests: [
    "🎯 Your specific interests from PDF",
    "💻 Technologies you're passionate about",
    "🚀 Career goals and aspirations",
    "🌟 Personal hobbies and activities"
  ],
  education: [
    {
      degree: "Your Degree Name",
      institution: "University/College Name",
      year: "Graduation Year",
      description: "Relevant details, GPA, honors, etc."
    }
    // Add more education entries as needed
  ]
}
```

### 2. Professional Information Updates

**File**: `root/app/pages/professional-info/professional-info.component.ts`

Update the `professionalInfo` object:

```typescript
professionalInfo: ProfessionalInfo = {
  experience: [
    {
      position: "Your Job Title",
      company: "Company Name",
      duration: "Start Date - End Date",
      description: [
        "Key responsibility 1",
        "Major achievement 1",
        "Impact you made",
        "Technologies you used"
      ],
      technologies: ["Tech1", "Tech2", "Tech3"]
    }
    // Add more experience entries
  ],
  skills: [
    { name: "JavaScript", level: 90, category: "Frontend" },
    { name: "Angular", level: 85, category: "Frontend" },
    { name: "Node.js", level: 80, category: "Backend" },
    // Add your actual skills with proficiency levels
  ],
  certifications: [
    {
      name: "Certification Name",
      issuer: "Issuing Organization",
      date: "Issue Date",
      credentialId: "Optional Credential ID"
    }
    // Add your certifications
  ]
}
```

### 3. Contact Information Updates

**File**: `root/app/pages/contact/contact.component.ts`

Update your contact details:

```typescript
contactInfo = {
  email: "your.email@domain.com",
  phone: "+1 (555) 123-4567",
  location: "Your City, State",
  linkedin: "https://linkedin.com/in/yourprofile",
  github: "https://github.com/yourusername"
}
```

### 4. Projects Section Updates

**File**: `root/app/pages/projects/projects.component.ts`

Add your actual projects:

```typescript
projects = [
  {
    title: "Project Name",
    description: "Brief project description",
    technologies: ["Tech1", "Tech2", "Tech3"],
    githubUrl: "https://github.com/yourusername/project",
    liveUrl: "https://project-demo.com",
    image: "assets/images/project1.png"
  }
  // Add more projects
]
```

### 5. Profile Image and Assets

1. Add your professional photo to `root/assets/images/`
2. Update the image reference in components
3. Add project screenshots to showcase your work

### 6. SEO and Meta Information

**File**: `root/index.html`

Update the meta tags:

```html
<title>Your Name - Portfolio</title>
<meta name="description" content="Your professional summary">
<meta name="keywords" content="your, key, skills, technologies">
<meta name="author" content="Your Name">
```

## 🚀 Quick Update Commands

After making changes:

```bash
# Test your changes
npm start

# Build for production
npm run build

# Test build
node test-build.js
```

## 📝 Content Extraction Tips

From your LinkedIn PDF, extract:

1. **Header Section**: Name, title, location, contact info
2. **Summary**: Professional overview and career objectives
3. **Experience**: Each job with responsibilities and achievements
4. **Education**: Degrees, institutions, dates, relevant details
5. **Skills**: Technical and soft skills with proficiency
6. **Certifications**: Professional certifications and training
7. **Projects**: Notable projects with descriptions and technologies

## 🎨 Customization Tips

1. **Personal Branding**: Update colors and themes to match your style
2. **Content Tone**: Adjust the writing style to reflect your personality
3. **Visual Elements**: Add icons, images, and visual hierarchy
4. **Interactive Features**: Customize the Snake game or add new features

## 📱 Testing Checklist

- [ ] All personal information updated
- [ ] Professional experience accurate
- [ ] Contact details working
- [ ] Projects showcase your best work
- [ ] Mobile responsiveness maintained
- [ ] All links functional
- [ ] Build successful without errors
