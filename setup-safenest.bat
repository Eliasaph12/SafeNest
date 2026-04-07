@echo off
chcp 65001 >nul
title SafeNest - One-Click Setup
color 0A

echo.
echo   ███████╗ █████╗ ███████╗███████╗███╗   ██╗███████╗███████╗████████╗
echo   ██╔════╝██╔══██╗██╔════╝██╔════╝████╗  ██║██╔════╝██╔════╝╚══██╔══╝
echo   ███████╗███████║█████╗  █████╗  ██╔██╗ ██║█████╗  ███████╗   ██║
echo   ╚════██║██╔══██║██╔══╝  ██╔══╝  ██║╚██╗██║██╔══╝  ╚════██║   ██║
echo   ███████║██║  ██║██║     ███████╗██║ ╚████║███████╗███████║   ██║
echo   ╚══════╝╚═╝  ╚═╝╚═╝     ╚══════╝╚═╝  ╚═══╝╚══════╝╚══════╝   ╚═╝
echo.
echo                  One-Click Database Setup for SafeNest
echo                  ======================================
echo.

REM Check Windows version and architecture
echo System Information:
echo ───────────────────
ver | findstr /r /c:"Version 10\." >nul 2>&1
if %errorlevel% equ 0 (
    echo [✅] Windows 10/11 detected
) else (
    echo [⚠️]  Older Windows version detected
)

REM Check if running as administrator
net session >nul 2>&1
if %errorLevel% == 0 (
    echo [✅] Administrator privileges confirmed
) else (
    echo [⚠️]  Limited privileges - some features may not work
    echo      Right-click this file and "Run as administrator" for best results
)
echo.

REM Check for MySQL installation
echo Checking MySQL Installation:
echo ────────────────────────────

REM Check common MySQL installation paths
set MYSQL_FOUND=0

if exist "C:\Program Files\MySQL\MySQL Server 8.0\bin\mysql.exe" (
    set MYSQL_PATH=C:\Program Files\MySQL\MySQL Server 8.0\bin
    set MYSQL_FOUND=1
) else if exist "C:\Program Files (x86)\MySQL\MySQL Server 8.0\bin\mysql.exe" (
    set MYSQL_PATH=C:\Program Files (x86)\MySQL\MySQL Server 8.0\bin
    set MYSQL_FOUND=1
)

REM Check if MySQL is in PATH
mysql --version >nul 2>&1
if %errorlevel% equ 0 (
    set MYSQL_FOUND=1
    echo [✅] MySQL found in system PATH
) else if !MYSQL_FOUND! equ 1 (
    echo [✅] MySQL found at: !MYSQL_PATH!
) else (
    goto :mysql_not_found
)

REM Check MySQL service status
echo.
echo Checking MySQL Service:
echo ──────────────────────
sc query "MySQL80" 2>nul | find "RUNNING" >nul 2>&1
if %errorlevel% equ 0 (
    echo [✅] MySQL service is running
) else (
    echo [⚠️]  MySQL service not running - attempting to start...
    net start MySQL80 >nul 2>&1
    if %errorlevel% equ 0 (
        echo [✅] MySQL service started successfully
    ) else (
        echo [❌] Failed to start MySQL service
        echo      Please start MySQL manually through Services.msc
        goto :exit_error
    )
)

echo.
echo [🎯] All prerequisites met! Proceeding with setup...
echo.

REM Run the setup script
call setup-mysql.bat
goto :end

:mysql_not_found
echo [❌] MySQL Server 8.0 not found!
echo.
echo SOLUTION: Install MySQL Server
echo ───────────────────────────────
echo.
echo Option 1 - Web Installer (Recommended):
echo 1. Open: https://dev.mysql.com/downloads/installer/
echo 2. Download "MySQL Installer for Windows"
echo 3. Run installer → Select "Developer Default"
echo 4. Set root password: rootpassword
echo 5. Complete installation
echo.
echo Option 2 - Quick Install (if you have Chocolatey):
echo choco install mysql
echo.
echo After installation, run this script again.
echo.
goto :exit_error

:exit_error
echo.
echo Press any key to exit...
pause >nul
exit /b 1

:end
echo.
echo Setup completed! Press any key to exit...
pause >nul