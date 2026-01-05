@echo off
echo Installing SmartHire AI Dependencies...

cd /d "%~dp0"

if exist venv\Scripts\activate.bat (
    echo Activating virtual environment...
    call venv\Scripts\activate.bat
    echo Installing google-generativeai...
    pip install google-generativeai==0.7.2
    echo Done!
) else (
    echo WARNING: Virtual environment not found. 
    echo Please install dependencies manually with: pip install google-generativeai==0.7.2
)

pause
