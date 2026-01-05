@echo off
echo Starting SmartHire AI Backend...

cd /d "%~dp0"

if exist venv\Scripts\activate.bat (
    echo Activating virtual environment...
    call venv\Scripts\activate.bat
    python app.py
) else (
    echo WARNING: Virtual environment not found.
    echo Trying to run with 'py' launcher...
    py app.py
)

pause
