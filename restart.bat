@echo off
echo 🛑 Stopping existing Angular processes...

REM Kill any existing ng serve processes
taskkill /f /im node.exe 2>nul
timeout /t 2 /nobreak >nul

echo ✅ Processes stopped

echo 🚀 Starting fresh Angular development server...
echo.

REM Start the development server on a specific port
npm start

echo.
echo 📱 Your portfolio should open at: http://localhost:4200
echo 🛑 Press Ctrl+C to stop the server
