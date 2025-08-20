@echo off
echo 🔧 Angular Portfolio - Error Checker and Fixer
echo ================================================
echo.

REM Check if Node.js is installed
node --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ Node.js is not installed or not in PATH
    echo Please install Node.js from https://nodejs.org/
    pause
    exit /b 1
)

echo ✅ Node.js is available
echo.

REM Check if Angular CLI is available
npx ng version >nul 2>&1
if %errorlevel% neq 0 (
    echo ⚠️  Angular CLI not found, installing locally...
    npm install @angular/cli@latest
)

echo ✅ Angular CLI is available
echo.

REM Install dependencies if needed
if not exist "node_modules" (
    echo 📦 Installing dependencies...
    npm install
    if %errorlevel% neq 0 (
        echo ❌ Failed to install dependencies
        pause
        exit /b 1
    )
    echo ✅ Dependencies installed
    echo.
)

REM Try to build the project to check for errors
echo 🔨 Checking for compilation errors...
npx ng build --configuration development
if %errorlevel% neq 0 (
    echo.
    echo ❌ Build failed! There are compilation errors.
    echo Please check the error messages above.
    echo.
    echo 💡 Common solutions:
    echo    - Check TypeScript syntax in all .ts files
    echo    - Verify all imports are correct
    echo    - Make sure all components export properly
    echo.
    pause
    exit /b 1
)

echo ✅ Build successful! No compilation errors.
echo.

REM Start the development server
echo 🚀 Starting development server...
echo.
echo 📱 Your portfolio will open at: http://localhost:4200
echo 🛑 Press Ctrl+C to stop the server
echo.

npm start
