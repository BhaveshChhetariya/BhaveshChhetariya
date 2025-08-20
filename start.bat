@echo off
echo Starting Angular VS Code Portfolio...
echo.

REM Check if node_modules exists
if not exist "node_modules" (
    echo Installing dependencies...
    npm install
    echo.
)

echo Starting development server...
echo Open your browser to: http://localhost:4200
echo Press Ctrl+C to stop the server
echo.

npm start
