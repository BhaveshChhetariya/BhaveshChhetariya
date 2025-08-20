# Troubleshooting Guide

## Common Runtime Errors and Fixes

### 1. Canvas/ViewChild Errors
**Error**: `Cannot read property 'nativeElement' of undefined`
**Fix**: ✅ Fixed - Changed ViewChild to use `AfterViewInit` and added null checks

### 2. Template Property Access Errors
**Error**: `Property 'game' is private and only accessible within class`
**Fix**: ✅ Fixed - Made game property public in HelloComponent

### 3. Module Import Errors
**Error**: `Can't bind to 'ngModel'`
**Fix**: ✅ Fixed - FormsModule is properly imported in ContactComponent

### 4. Routing Errors
**Error**: `Cannot match any routes`
**Fix**: ✅ Fixed - All routes are properly configured with lazy loading

## How to Run the Project

### Option 1: Using the Batch File (Windows)
```bash
# Double-click start.bat or run in command prompt:
start.bat
```

### Option 2: Manual Commands
```bash
# Navigate to project directory
cd "C:\Users\Admin\angular-portfolio"

# Install dependencies (first time only)
npm install

# Start development server
npm start
```

### Option 3: Using Angular CLI directly
```bash
# If you have Angular CLI installed globally
ng serve --open
```

## Expected Behavior

1. **Server starts** on http://localhost:4200
2. **Browser opens** automatically
3. **VS Code interface** loads with dark theme
4. **Snake game** works on the Hello page
5. **Navigation** works between all pages
6. **Contact form** validates input

## If You Still Get Errors

### Check Node.js Version
```bash
node --version
# Should be v18 or higher
```

### Clear Cache and Reinstall
```bash
rm -rf node_modules package-lock.json
npm install
```

### Check for TypeScript Errors
```bash
ng build
# This will show any compilation errors
```

### Browser Console Errors
1. Open browser Developer Tools (F12)
2. Check Console tab for JavaScript errors
3. Check Network tab for failed requests

## Common Solutions

### Port Already in Use
```bash
# Use different port
ng serve --port 4201
```

### Memory Issues
```bash
# Increase Node.js memory
node --max-old-space-size=8192 ./node_modules/@angular/cli/bin/ng serve
```

### Permission Issues (Windows)
- Run Command Prompt as Administrator
- Or use PowerShell with execution policy:
```powershell
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
```

## Success Indicators

✅ Server starts without errors
✅ Browser opens to VS Code interface
✅ Snake game canvas loads
✅ Navigation between pages works
✅ No console errors in browser
✅ All styles load correctly

If you're still having issues, check the browser console for specific error messages.
