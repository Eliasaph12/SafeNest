@echo off
chcp 65001 >nul
echo ============================================
echo    SafeNest - Start Complete Application
echo ============================================
echo.

REM Check if database is ready
echo Checking database setup...
mysql -u safenest_user -ppassword123 -e "USE safenest_db; SELECT 'Database OK';" >nul 2>&1
if %errorlevel% neq 0 (
    echo [❌] Database not ready!
    echo      Please run setup-safenest.bat first
    echo.
    pause
    exit /b 1
)

echo [✅] Database connection verified
echo.

REM Check if Java is installed
java -version >nul 2>&1
if %errorlevel% neq 0 (
    echo [❌] Java not found!
    echo      Please install Java 21+ from oracle.com
    echo.
    pause
    exit /b 1
)

echo [✅] Java found
echo.

REM Check if Maven is installed
mvn -version >nul 2>&1
if %errorlevel% neq 0 (
    echo [❌] Maven not found!
    echo      Please install Maven from maven.apache.org
    echo.
    pause
    exit /b 1
)

echo [✅] Maven found
echo.

REM Check if Node.js is installed
node -version >nul 2>&1
if %errorlevel% neq 0 (
    echo [❌] Node.js not found!
    echo      Please install Node.js from nodejs.org
    echo.
    pause
    exit /b 1
)

echo [✅] Node.js found
echo.

echo [🚀] Starting SafeNest Application...
echo.

REM Start backend in new window
echo Starting backend server...
start "SafeNest Backend" cmd /k "cd Project_backend\backend && mvn spring-boot:run"

REM Wait a moment for backend to start
timeout /t 10 /nobreak >nul

REM Start frontend in new window
echo Starting frontend server...
start "SafeNest Frontend" cmd /k "npm run dev"

echo.
echo ============================================
echo    🎉 SafeNest Application Started!
echo ============================================
echo.
echo Backend:  http://localhost:8080
echo Frontend: http://localhost:5173
echo API Docs: http://localhost:8080/swagger-ui.html
echo.
echo Close this window to stop all servers.
echo.
pause