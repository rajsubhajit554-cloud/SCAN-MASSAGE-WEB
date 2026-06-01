@echo off
echo ==============================================
echo        GitHub Upload Script by AI Assistant
echo ==============================================
echo.

:: Ask for the commit message
set /p commit_message="Please enter a message for this upload (e.g., Updated images): "

:: If no message is provided, use a default one
if "%commit_message%"=="" set commit_message=Auto-update from upload script

echo.
echo [1/3] Adding all files...
git add .

echo [2/3] Committing files...
git commit -m "%commit_message%"

echo [3/3] Uploading to GitHub...
git push -u origin main

echo.
echo ==============================================
echo        Upload Process Completed!
echo ==============================================
pause
