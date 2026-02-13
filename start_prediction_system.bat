@echo off
echo ================================================
echo   STARTUP FUNDING PREDICTION SYSTEM
echo ================================================
echo.

REM Check for models directory
if not exist "models" (
    echo ERROR: Models directory not found!
    echo.
    echo Please run this in your Jupyter notebook first:
    echo.
    echo     exec^(open^('save_models.py'^).read^(^)^)
    echo     save_models_from_notebook^(^)
    echo.
    pause
    exit /b 1
)

echo Step 1: Checking Python dependencies...
python -c "import fastapi, uvicorn" 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo Installing Python dependencies...
    pip install -r requirements-api.txt
)

echo.
echo Step 2: Starting Prediction API on port 8000...
echo    API will be available at: http://localhost:8000
echo    API docs at: http://localhost:8000/docs
echo.
start cmd /k "python prediction_api.py"

timeout /t 3 >nul

echo.
echo Step 3: Starting Website on port 3000...
echo    Website will be available at: http://localhost:3000
echo    Prediction tool at: http://localhost:3000/predict
echo.
cd startup-funding-website
start cmd /k "npm run dev"

echo.
echo ================================================
echo   SERVERS STARTING...
echo ================================================
echo.
echo Two new windows have opened:
echo   1. Python API Server (port 8000)
echo   2. Next.js Website (port 3000)
echo.
echo Wait a few seconds, then open your browser to:
echo    http://localhost:3000
echo.
echo Press Ctrl+C in each window to stop the servers.
echo ================================================
pause
