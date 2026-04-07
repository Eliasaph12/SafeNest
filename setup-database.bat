@echo off
echo SafeNest Database Setup
echo =======================

REM Check if MySQL is installed
mysql --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ERROR: MySQL is not installed or not in PATH
    echo Please install MySQL first, then run this script
    pause
    exit /b 1
)

echo MySQL found. Setting up SafeNest database...

REM Run the database setup script
mysql -u root -p < setup-database.sql

if %errorlevel% equ 0 (
    echo.
    echo ✅ Database setup completed successfully!
    echo.
    echo Database: safenest_db
    echo User: safenest_user
    echo Password: password123
    echo.
    echo You can now start your Spring Boot backend.
) else (
    echo.
    echo ❌ Database setup failed!
    echo Please check your MySQL root password and try again.
)

pause