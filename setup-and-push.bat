@echo off
echo 🚀 Setting up Git and pushing to repository...
echo.

REM Check if git is available
where git >nul 2>&1
if %ERRORLEVEL% NEQ 0 (
    echo ❌ Git is not installed or not in PATH.
    echo.
    echo Please install Git from: https://git-scm.com/download/win
    echo Or add Git to your PATH and run this script again.
    echo.
    echo Alternatively, run these commands manually:
    echo   git init
    echo   git config user.name "thechameleonagency"
    echo   git config user.email "jitesh.cse.apm@gmail.com"
    echo   git add .
    echo   git commit -m "Initial commit: Complete PWA application with all features"
    echo   git branch -M main
    echo   git remote add origin https://github.com/thechameleonagency/geminiapptest.git
    echo   git push -u origin main
    pause
    exit /b 1
)

echo ✅ Git found
echo.

REM Initialize git if not already initialized
if not exist ".git" (
    echo 📦 Initializing Git repository...
    git init
    echo ✅ Git repository initialized
) else (
    echo ✅ Git repository already initialized
)

echo.

REM Configure git user
echo ⚙️  Configuring Git user...
git config user.name "thechameleonagency"
git config user.email "jitesh.cse.apm@gmail.com"
echo ✅ Git user configured
echo.

REM Check and add remote
git remote | findstr /C:"origin" >nul
if %ERRORLEVEL% NEQ 0 (
    echo 🔗 Adding remote repository...
    git remote add origin https://github.com/thechameleonagency/geminiapptest.git
    echo ✅ Remote added
) else (
    echo ✅ Remote already configured
    git remote set-url origin https://github.com/thechameleonagency/geminiapptest.git
)

echo.

REM Add all files
echo 📝 Adding all files...
git add .
echo ✅ Files added
echo.

REM Commit
echo 💾 Committing changes...
git commit -m "Initial commit: Complete PWA application with all features - Digi Swasthya Healthcare Platform"
echo ✅ Changes committed
echo.

REM Set default branch
echo 🌿 Setting default branch to main...
git branch -M main
echo ✅ Branch set to main
echo.

REM Push
echo 🚀 Pushing to GitHub...
echo.
echo Note: You may be prompted for GitHub credentials.
echo.

git push -u origin main

if %ERRORLEVEL% EQU 0 (
    echo.
    echo ✅ Successfully pushed to GitHub!
    echo 📍 Repository: https://github.com/thechameleonagency/geminiapptest
) else (
    echo.
    echo ❌ Push failed. This might be due to authentication or network issues.
    echo To manually push, run: git push -u origin main
)

pause

