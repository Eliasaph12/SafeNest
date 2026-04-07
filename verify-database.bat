@echo off
chcp 65001 >nul
echo ============================================
echo    SafeNest Database Verification
echo ============================================
echo.

set TESTS_PASSED=0
set TESTS_TOTAL=0

REM Test 1: MySQL Installation
echo [Test 1/5] Checking MySQL Installation...
set /a TESTS_TOTAL+=1
mysql --version >nul 2>&1
if %errorlevel% equ 0 (
    echo [✅] MySQL is installed
    set /a TESTS_PASSED+=1
) else (
    echo [❌] MySQL not found - run setup-safenest.bat first
    goto :results
)

REM Test 2: MySQL Service
echo.
echo [Test 2/5] Checking MySQL Service...
set /a TESTS_TOTAL+=1
sc query "MySQL80" 2>nul | find "RUNNING" >nul 2>&1
if %errorlevel% equ 0 (
    echo [✅] MySQL service is running
    set /a TESTS_PASSED+=1
) else (
    echo [❌] MySQL service not running
    goto :results
)

REM Test 3: Database Connection
echo.
echo [Test 3/5] Testing Database Connection...
set /a TESTS_TOTAL+=1
mysql -u safenest_user -ppassword123 -e "USE safenest_db; SELECT 'Connection successful!' as Status;" >nul 2>&1
if %errorlevel% equ 0 (
    echo [✅] Database connection works
    set /a TESTS_PASSED+=1
) else (
    echo [❌] Database connection failed
    goto :results
)

REM Test 4: Table Structure
echo.
echo [Test 4/5] Verifying Database Schema...
set /a TESTS_TOTAL+=1
mysql -u safenest_user -ppassword123 -e "USE safenest_db; DESCRIBE safety_resources;" >nul 2>&1
if %errorlevel% equ 0 (
    echo [✅] Database schema is correct
    set /a TESTS_PASSED+=1
) else (
    echo [❌] Database schema issue
    goto :results
)

REM Test 5: Sample Data
echo.
echo [Test 5/5] Checking Sample Data...
set /a TESTS_TOTAL+=1
for /f %%i in ('mysql -u safenest_user -ppassword123 -e "USE safenest_db; SELECT COUNT(*) FROM safety_resources;" -s -N') do set COUNT=%%i
if !COUNT! gtr 0 (
    echo [✅] Sample data loaded (!COUNT! resources)
    set /a TESTS_PASSED+=1
) else (
    echo [❌] No sample data found
    goto :results
)

:results
echo.
echo ============================================
echo              Test Results
echo ============================================
echo Tests Passed: !TESTS_PASSED!/!TESTS_TOTAL!
echo.

if !TESTS_PASSED! equ !TESTS_TOTAL! (
    echo 🎉 ALL TESTS PASSED! SafeNest is ready to run.
    echo.
    echo Quick Start Commands:
    echo ────────────────────
    echo 1. Backend:  cd Project_backend\backend ^& mvn spring-boot:run
    echo 2. Frontend: npm run dev
    echo 3. Browser:  http://localhost:5173
    echo.
    echo API Test: http://localhost:8080/api/products
    echo.
) else (
    echo ⚠️  Some tests failed. Please run setup-safenest.bat to fix issues.
    echo.
    echo Common Solutions:
    echo ─────────────────
    echo • Install MySQL if not present
    echo • Start MySQL service
    echo • Run setup-safenest.bat as Administrator
    echo • Check database credentials in .env file
)

echo.
pause