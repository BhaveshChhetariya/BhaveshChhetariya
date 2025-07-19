# Bhavesh Chhetariya - Angular Portfolio

A modern, responsive portfolio website built with Angular, featuring smooth scrolling with Lenis and interactive animations with Rive.

## Prerequisites

Before you begin, ensure you have the following installed:
- Node.js (v14.x or later)
- npm (v6.x or later)
- Angular CLI (`npm install -g @angular/cli`)

## Getting Started

1. Clone or download this repository
2. Navigate to the project directory:
   ```
   cd portfolio-angular
   ```
3. Install dependencies:
   ```
   npm install
   ```
4. Start the development server:
   ```
   ng serve
   ```
5. Open your browser and navigate to `http://localhost:4200/`

## Project Structure

```
portfolio-angular/
├── src/
│   ├── app/
│   │   ├── components/
│   │   │   ├── about/
│   │   │   ├── contact/
│   │   │   ├── experience/
│   │   │   ├── footer/
│   │   │   ├── header/
│   │   │   ├── home/
│   │   │   ├── projects/
│   │   │   └── skills/
│   │   ├── services/
│   │   │   └── scroll.service.ts
│   │   ├── shared/
│   │   │   └── cursor/
│   │   ├── app.component.ts
│   │   ├── app.component.html
│   │   ├── app.component.scss
│   │   └── app.module.ts
│   ├── assets/
│   ├── environments/
│   ├── index.html
│   ├── main.ts
│   └── styles.scss
├── angular.json
├── package.json
├── tsconfig.json
└── README.md
```

## Features

- **Angular Framework**: Built with Angular for a robust, scalable application
- **Component-Based Architecture**: Modular design for easy maintenance
- **Smooth Scrolling**: Implemented using Lenis for a premium scrolling experience
- **Interactive Animations**: Rive animations for engaging user experience
- **Responsive Design**: Fully responsive layout that works on all devices
- **Modern UI**: Clean and professional design with subtle animations
- **Project Filtering**: Filter projects by category
- **Contact Form**: Ready-to-use contact form with Angular Reactive Forms
- **Custom Cursor**: Enhanced cursor experience on desktop
- **Animated Skill Bars**: Visual representation of skills with animated progress bars

## Customization

### Personal Information

Edit the component HTML files to update:
- Your name and title in `home.component.html`
- About me section in `about.component.html`
- Contact information in `contact.component.html`
- Work experience in `experience.component.html`
- Skills and projects in their respective component files

### Rive Animations

The website uses placeholder Rive animations. To use your own:

1. Create animations on [Rive](https://rive.app/)
2. Export your animations
3. Replace the Rive file URLs in the component files:

```typescript
// In home.component.ts
this.heroRive = new rive.Rive({
  src: 'path/to/your/animation.riv', // Replace with your Rive file
  // other options...
});
```

### Images

Replace the placeholder images with your own in the assets folder and update the references in the component files.

### Colors

To change the color scheme, edit the CSS variables in `styles.scss`:

```scss
:root {
  --primary-color: #6c63ff;
  --secondary-color: #4d44f9;
  --accent-color: #ff6584;
  /* other colors... */
}
```

## Building for Production

Run `ng build` to build the project for production. The build artifacts will be stored in the `dist/` directory.

## Deployment

You can deploy this Angular application to various platforms:

- **GitHub Pages**: Use `angular-cli-ghpages` package
- **Netlify**: Connect your GitHub repository or upload the dist folder
- **Vercel**: Similar to Netlify, with automatic deployments
- **AWS S3**: Upload the dist folder to an S3 bucket configured for static website hosting

## License

Feel free to use this template for your personal portfolio.

---

Created by Bhavesh Chhetariya
