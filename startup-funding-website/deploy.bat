@echo off
echo ================================================
echo   STARTUP FUNDING WEBSITE - DEPLOYMENT SCRIPT
echo ================================================
echo.

REM Check if we're in the right directory
if not exist "package.json" (
    echo ERROR: package.json not found!
    echo Please run this script from the startup-funding-website directory
    pause
    exit /b 1
)

echo Step 1: Checking for data files...
if not exist "public\data\results.json" (
    echo.
    echo WARNING: public\data\results.json not found!
    echo.
    echo Please run the export script first:
    echo    cd ..
    echo    python export_data.py
    echo    cd startup-funding-website
    echo.
    pause
    exit /b 1
)
echo   - results.json found

if not exist "public\images\model_comparison.png" (
    echo   - WARNING: model_comparison.png not found
    echo     Run python export_data.py to generate charts
)

if not exist "public\images\data_insights.png" (
    echo   - WARNING: data_insights.png not found
    echo     Run python export_data.py to generate charts
)

echo.
echo Step 2: Installing dependencies...
call npm install
if %ERRORLEVEL% NEQ 0 (
    echo ERROR: npm install failed
    pause
    exit /b 1
)

echo.
echo Step 3: Building production version...
call npm run build
if %ERRORLEVEL% NEQ 0 (
    echo ERROR: Build failed
    pause
    exit /b 1
)

echo.
echo ================================================
echo   BUILD SUCCESSFUL!
echo ================================================
echo.
echo Your website is ready to deploy!
echo.
echo DEPLOYMENT OPTIONS:
echo.
echo Option 1: Deploy with Vercel CLI
echo    vercel
echo.
echo Option 2: Deploy via GitHub
echo    1. Push to GitHub
echo    2. Connect repository to Vercel
echo.
echo Option 3: Test locally
echo    npm run dev
echo    Then open http://localhost:3000
echo.
echo ================================================
pause
