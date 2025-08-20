# Angular VS Code Portfolio

A beautiful, interactive developer portfolio built with Angular 17, designed to look like Visual Studio Code.

## 🚀 Features

- **VS Code Interface**: Authentic VS Code dark theme with file explorer, tabs, and status bar
- **Interactive Snake Game**: Complete the game to unlock GitHub link
- **Routing**: Separate pages for personal info, professional info, and contact
- **Responsive Design**: Works on desktop, tablet, and mobile
- **Modern Angular**: Built with Angular 17 standalone components

## 📁 Project Structure

```
src/
├── app/
│   ├── components/
│   │   └── vscode-layout/          # Main VS Code layout
│   ├── pages/
│   │   ├── hello/                  # Home page with Snake game
│   │   ├── about/                  # About page
│   │   ├── personal-info/          # Personal information
│   │   ├── professional-info/      # Professional experience
│   │   ├── projects/               # Projects showcase
│   │   ├── sessions/               # Tech sessions
│   │   ├── articles/               # Blog articles
│   │   └── contact/                # Contact form
│   ├── app.component.ts
│   ├── app.routes.ts
│   └── ...
├── styles.scss                     # Global styles
└── index.html
```

## 🛠️ Setup Instructions

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn

### Installation

1. **Navigate to project directory:**
   ```bash
   cd "C:\Users\Admin\angular-portfolio"
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Install Angular CLI globally (if not already installed):**
   ```bash
   npm install -g @angular/cli
   ```

4. **Start development server:**
   ```bash
   ng serve
   ```
   or
   ```bash
   npm start
   ```

5. **Open your browser:**
   Navigate to `http://localhost:4200`

## 🎨 Customization

### 1. Personal Information
Update your details in:
- `src/app/components/vscode-layout/vscode-layout.component.html` (sidebar info)
- `src/app/pages/hello/hello.component.html` (profile section)
- `src/app/pages/personal-info/personal-info.component.ts` (personal data)

### 2. Professional Information
Update your experience in:
- `src/app/pages/professional-info/professional-info.component.ts`

### 3. Projects
Add your projects in:
- `src/app/pages/projects/projects.component.ts`

### 4. Contact Information
Update contact details in:
- `src/app/pages/contact/contact.component.ts`

## 🚀 Build for Production

```bash
ng build --configuration production
```

The build artifacts will be stored in the `dist/` directory.

## 📱 Responsive Breakpoints

- Desktop: 1200px+
- Tablet: 768px - 1199px
- Mobile: < 768px

## 🎯 Available Routes

- `/hello` - Home page with Snake game
- `/about` - About page
- `/personal-info` - Personal information
- `/professional-info` - Professional experience
- `/projects` - Projects showcase
- `/sessions` - Tech sessions
- `/articles` - Blog articles
- `/contact` - Contact form

## 🔧 Development Commands

```bash
# Start development server
ng serve

# Build for production
ng build

# Run tests
ng test

# Generate component
ng generate component component-name

# Generate service
ng generate service service-name
```

## 🌟 Key Features Explained

### VS Code Layout
- Authentic file explorer with expandable sections
- Tab system with close functionality
- Status bar with project information
- Window controls (red, yellow, green dots)

### Snake Game
- Fully functional Snake game in the hello page
- Keyboard arrow controls
- Win condition unlocks GitHub link
- Skip option available

### Routing
- Lazy-loaded components for better performance
- Smooth navigation between sections
- Active state management in sidebar

## 🎨 Theming

The project uses CSS custom properties for theming:

```scss
:root {
  --vscode-bg: #1e1e1e;
  --vscode-sidebar-bg: #252526;
  --vscode-accent: #4fc3f7;
  --vscode-text: #d4d4d4;
  // ... more variables
}
```

## 📦 Dependencies

- Angular 17
- Angular Router
- Angular Forms
- Font Awesome (icons)
- Fira Code (font)

## 🚀 Deployment

### GitHub Pages
1. Install Angular GitHub Pages deployer:
   ```bash
   ng add angular-cli-ghpages
   ```

2. Deploy:
   ```bash
   ng deploy --base-href=/your-repo-name/
   ```

### Netlify
1. Build the project:
   ```bash
   ng build --configuration production
   ```

2. Deploy the `dist/vscode-portfolio` folder to Netlify

### Vercel
1. Connect your GitHub repository to Vercel
2. Set build command: `ng build --configuration production`
3. Set output directory: `dist/vscode-portfolio`

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## 📄 License

This project is open source and available under the MIT License.

---

**Built with ❤️ using Angular 17**
