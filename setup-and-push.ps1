# Git Setup and Push Script for Digi Swasthya
# Repository: https://github.com/thechameleonagency/geminiapptest.git
# Email: jitesh.cse.apm@gmail.com
# Username: thechameleonagency

Write-Host "Setting up Git and pushing to repository..." -ForegroundColor Cyan
Write-Host ""

# Check if git is available
$gitPath = $null
$gitLocations = @(
    "git",
    "C:\Program Files\Git\bin\git.exe",
    "C:\Program Files (x86)\Git\bin\git.exe",
    "$env:USERPROFILE\AppData\Local\Programs\Git\bin\git.exe"
)

foreach ($location in $gitLocations) {
    try {
        if ($location -eq "git") {
            $test = & git --version 2>&1
            if ($LASTEXITCODE -eq 0) {
                $gitPath = "git"
                break
            }
        } else {
            if (Test-Path $location) {
                $gitPath = $location
                break
            }
        }
    } catch {
        continue
    }
}

if (-not $gitPath) {
    Write-Host "ERROR: Git is not installed or not in PATH." -ForegroundColor Red
    Write-Host ""
    Write-Host "Please install Git from: https://git-scm.com/download/win" -ForegroundColor Yellow
    Write-Host "Or add Git to your PATH and run this script again." -ForegroundColor Yellow
    Write-Host ""
    Write-Host "Alternatively, you can run these commands manually after installing Git:" -ForegroundColor Cyan
    Write-Host ""
    Write-Host "git init" -ForegroundColor White
    Write-Host "git config user.name `"thechameleonagency`"" -ForegroundColor White
    Write-Host "git config user.email `"jitesh.cse.apm@gmail.com`"" -ForegroundColor White
    Write-Host "git add ." -ForegroundColor White
    Write-Host "git commit -m `"Initial commit: Complete PWA application with all features`"" -ForegroundColor White
    Write-Host "git branch -M main" -ForegroundColor White
    Write-Host "git remote add origin https://github.com/thechameleonagency/geminiapptest.git" -ForegroundColor White
    Write-Host "git push -u origin main" -ForegroundColor White
    exit 1
}

Write-Host "SUCCESS: Git found at: $gitPath" -ForegroundColor Green
Write-Host ""

# Initialize git if not already initialized
if (-not (Test-Path ".git")) {
    Write-Host "Initializing Git repository..." -ForegroundColor Cyan
    & $gitPath init
    Write-Host "SUCCESS: Git repository initialized" -ForegroundColor Green
} else {
    Write-Host "SUCCESS: Git repository already initialized" -ForegroundColor Green
}

Write-Host ""

# Configure git user (local to this repository)
Write-Host "Configuring Git user..." -ForegroundColor Cyan
& $gitPath config user.name "thechameleonagency"
& $gitPath config user.email "jitesh.cse.apm@gmail.com"
Write-Host "SUCCESS: Git user configured" -ForegroundColor Green
Write-Host ""

# Check if remote exists
$remoteCheck = & $gitPath remote -v 2>&1
if ($remoteCheck -notmatch "geminiapptest") {
    Write-Host "Adding remote repository..." -ForegroundColor Cyan
    & $gitPath remote add origin https://github.com/thechameleonagency/geminiapptest.git
    Write-Host "SUCCESS: Remote added" -ForegroundColor Green
} else {
    Write-Host "SUCCESS: Remote already configured" -ForegroundColor Green
    # Update remote URL in case it changed
    & $gitPath remote set-url origin https://github.com/thechameleonagency/geminiapptest.git
}

Write-Host ""

# Add all files
Write-Host "Adding all files..." -ForegroundColor Cyan
& $gitPath add .
Write-Host "SUCCESS: Files added" -ForegroundColor Green
Write-Host ""

# Commit
Write-Host "Committing changes..." -ForegroundColor Cyan
$commitMessage = "Initial commit: Complete PWA application with all features - Digi Swasthya Healthcare Platform"
& $gitPath commit -m $commitMessage
Write-Host "SUCCESS: Changes committed" -ForegroundColor Green
Write-Host ""

# Set default branch to main
Write-Host "Setting default branch to main..." -ForegroundColor Cyan
& $gitPath branch -M main
Write-Host "SUCCESS: Branch set to main" -ForegroundColor Green
Write-Host ""

# Push to repository
Write-Host "Pushing to GitHub..." -ForegroundColor Cyan
Write-Host ""
Write-Host "Note: You may be prompted for GitHub credentials." -ForegroundColor Yellow
Write-Host "If authentication fails, you may need to:" -ForegroundColor Yellow
Write-Host "  1. Use a Personal Access Token instead of password" -ForegroundColor Yellow
Write-Host "  2. Configure SSH keys" -ForegroundColor Yellow
Write-Host "  3. Use GitHub CLI (gh auth login)" -ForegroundColor Yellow
Write-Host ""

& $gitPath push -u origin main

if ($LASTEXITCODE -eq 0) {
    Write-Host ""
    Write-Host "SUCCESS: Successfully pushed to GitHub!" -ForegroundColor Green
    Write-Host "Repository: https://github.com/thechameleonagency/geminiapptest" -ForegroundColor Cyan
} else {
    Write-Host ""
    Write-Host "ERROR: Push failed. This might be due to:" -ForegroundColor Red
    Write-Host "  - Authentication required (enter GitHub credentials when prompted)" -ForegroundColor Yellow
    Write-Host "  - Remote repository needs to be initialized on GitHub first" -ForegroundColor Yellow
    Write-Host "  - Network connectivity issues" -ForegroundColor Yellow
    Write-Host ""
    Write-Host "To manually push, run:" -ForegroundColor Cyan
    Write-Host "  git push -u origin main" -ForegroundColor White
}

