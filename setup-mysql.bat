@echo off
chcp 65001 >nul
echo ============================================
echo    SafeNest MySQL Setup Assistant
echo    (Error-Free Installation)
echo ============================================
echo.

REM Check if running as administrator
net session >nul 2>&1
if %errorLevel% == 0 (
    echo [✅] Running as Administrator
) else (
    echo [⚠️]  Not running as Administrator
    echo      Some operations may fail
)
echo.

REM Check if MySQL is installed
mysql --version >nul 2>&1
if %errorlevel% neq 0 (
    echo [❌] MySQL is NOT installed or not in PATH
    echo.
    echo SOLUTION: Install MySQL first
    echo ──────────────────────────────
    echo 1. Download: https://dev.mysql.com/downloads/installer/
    echo 2. Run installer → Select "Developer Default"
    echo 3. Set root password: rootpassword
    echo 4. Add to PATH: C:\Program Files\MySQL\MySQL Server 8.0\bin
    echo.
    echo After installation, run this script again.
    echo.
    goto :exit
)

echo [✅] MySQL found!
echo.

REM Check if MySQL service is running
sc query "MySQL80" | find "RUNNING" >nul 2>&1
if %errorlevel% neq 0 (
    echo [⚠️]  MySQL service not running
    echo      Attempting to start MySQL service...
    net start MySQL80 >nul 2>&1
    if %errorlevel% neq 0 (
        echo [❌] Failed to start MySQL service
        echo      Please start MySQL manually or check installation
        goto :exit
    )
    echo [✅] MySQL service started
)
echo.

REM Ask for root password with validation
:password_prompt
set /p ROOT_PASS="Enter MySQL root password (default: rootpassword): "
if "%ROOT_PASS%"=="" set ROOT_PASS=rootpassword

echo.
echo Testing root connection...
mysql -u root -p%ROOT_PASS% -e "SELECT 'Connection OK';" >nul 2>&1
if %errorlevel% neq 0 (
    echo [❌] Invalid root password or connection failed
    echo.
    goto :password_prompt
)

echo [✅] Root connection successful!
echo.

REM Run the complete database setup
echo Setting up SafeNest database with sample data...
echo This may take a few seconds...
echo.

mysql -u root -p%ROOT_PASS% < setup-database.sql 2>nul
if %errorlevel% neq 0 (
    echo [❌] Database setup failed
    echo      Check your MySQL installation and permissions
    goto :exit
)

echo [✅] Database setup completed!
echo.

REM Test the application user connection
echo Testing application database connection...
mysql -u safenest_user -ppassword123 -e "USE safenest_db; SELECT COUNT(*) as Resources FROM safety_resources;" 2>nul
if %errorlevel% neq 0 (
    echo [❌] Application user connection failed
    goto :exit
)

echo [✅] Application connection successful!
echo.

REM Show database summary
echo ============================================
echo    🎉 SafeNest Database Ready!
echo ============================================
echo.
echo Database Details:
echo ─────────────────
echo Database:     safenest_db
echo Username:     safenest_user
echo Password:     password123
echo Tables:       safety_resources, user
echo Sample Data:  6 resources loaded
echo.
echo Next Steps:
echo ───────────
echo 1. Start Backend: cd Project_backend\backend ^& mvn spring-boot:run
echo 2. Start Frontend: npm run dev
echo 3. Open Browser:  http://localhost:5173
echo.
echo Test API: http://localhost:8080/api/products
echo.

:exit
echo Press any key to exit...
pause >nul