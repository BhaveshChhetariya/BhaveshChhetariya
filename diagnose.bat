@echo off
echo 🩺 Angular Portfolio - Error Diagnosis
echo =======================================
echo.

echo 📋 System Information:
echo -----------------------
node --version 2>nul || echo ❌ Node.js: Not installed
npm --version 2>nul || echo ❌ NPM: Not available
npx ng version 2>nul || echo ⚠️  Angular CLI: Not available globally

echo.
echo 📁 Project Structure Check:
echo ---------------------------
if exist "src\app\app.component.ts" (echo ✅ app.component.ts) else (echo ❌ app.component.ts missing)
if exist "src\app\app.routes.ts" (echo ✅ app.routes.ts) else (echo ❌ app.routes.ts missing)
if exist "src\main.ts" (echo ✅ main.ts) else (echo ❌ main.ts missing)
if exist "angular.json" (echo ✅ angular.json) else (echo ❌ angular.json missing)
if exist "package.json" (echo ✅ package.json) else (echo ❌ package.json missing)

echo.
echo 📦 Dependencies Check:
echo ----------------------
if exist "node_modules" (
    echo ✅ node_modules folder exists
) else (
    echo ❌ node_modules missing - run: npm install
)

echo.
echo 🔍 Common Error Patterns:
echo -------------------------
findstr /C:"private game" "src\app\pages\hello\hello.component.ts" >nul 2>&1
if %errorlevel% equ 0 (
    echo ⚠️  Found 'private game' - should be 'public game' for template access
)

findstr /C:"static: true" "src\app\pages\hello\hello.component.ts" >nul 2>&1
if %errorlevel% equ 0 (
    echo ⚠️  Found 'static: true' ViewChild - might cause initialization issues
)

echo.
echo 🧪 Quick Build Test:
echo --------------------
echo Running quick compilation check...
npx ng build --configuration development --dry-run 2>error.log
if %errorlevel% equ 0 (
    echo ✅ No compilation errors found
    del error.log 2>nul
) else (
    echo ❌ Compilation errors found:
    type error.log
    echo.
    echo 💡 Check the errors above and fix them before running the project
)

echo.
echo 📝 Next Steps:
echo --------------
echo 1. Fix any errors shown above
echo 2. Run: npm install (if node_modules missing)
echo 3. Run: npm start (to start the development server)
echo.
pause
