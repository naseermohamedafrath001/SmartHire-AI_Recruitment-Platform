@echo off
title SmartHire AI Launcher
setlocal

:: Get the directory where the script is located
set "PROJECT_ROOT=%~dp0"
cd /d "%PROJECT_ROOT%"

echo ==========================================
echo 🚀 SmartHire AI Launcher
echo ==========================================
echo.

:: Check for backend
if not exist "backend\run.py" (
    echo [ERROR] Backend file not found: backend\run.py
    pause
    exit /b 1
)

:: Check for frontend
if not exist "frontend\package.json" (
    echo [ERROR] Frontend directory not found: frontend\package.json
    pause
    exit /b 1
)

echo [INFO] Starting Backend Server...
:: Using direct python path from venv for maximum reliability
start "Backend Server" cmd /k "cd /d "%PROJECT_ROOT%backend" && call venv\Scripts\activate.bat && python run.py"

echo [INFO] Waiting 5 seconds for backend initialization...
timeout /t 5 /nobreak > nul

echo [INFO] Starting Frontend Server...
start "Frontend Server" cmd /k "cd /d "%PROJECT_ROOT%frontend" && npm start"

echo.
echo ==========================================
echo ✅ Both servers should be starting now!
echo.
echo 📍 Backend: http://localhost:5000
echo 📍 Frontend: http://localhost:3000
echo ==========================================
echo.
echo If the terminal windows didn't open or closed immediately:
echo 1. Check if you have Node.js and Python installed.
echo 2. Run 'pip install -r requirements.txt' in the backend folder.
echo 3. Run 'npm install' in the frontend folder.
echo.
pause
