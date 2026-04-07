# SafeNest MySQL Setup Script (PowerShell)
# Run this in PowerShell as Administrator

Write-Host "============================================" -ForegroundColor Cyan
Write-Host "   SafeNest MySQL Setup Assistant" -ForegroundColor Cyan
Write-Host "============================================" -ForegroundColor Cyan
Write-Host ""

# Check if MySQL is installed
try {
    $mysqlVersion = mysql --version 2>$null
    Write-Host "[✅] MySQL found!" -ForegroundColor Green
} catch {
    Write-Host "[❌] MySQL is NOT installed or not in PATH" -ForegroundColor Red
    Write-Host ""
    Write-Host "Please install MySQL first:" -ForegroundColor Yellow
    Write-Host "1. Download from: https://dev.mysql.com/downloads/installer/"
    Write-Host "2. Run installer and select 'Developer Default'"
    Write-Host "3. Set root password (remember it!)"
    Write-Host "4. Add MySQL to Windows PATH"
    Write-Host ""
    Write-Host "After installation, run this script again." -ForegroundColor Yellow
    Read-Host "Press Enter to exit"
    exit 1
}

# Ask for root password
$rootPass = Read-Host "Enter your MySQL root password"

Write-Host ""
Write-Host "Setting up SafeNest database..." -ForegroundColor Yellow

# Create database
try {
    mysql -u root -p$rootPass -e "CREATE DATABASE IF NOT EXISTS safenest_db;" 2>$null
    Write-Host "[✅] Database 'safenest_db' created" -ForegroundColor Green
} catch {
    Write-Host "[❌] Failed to create database. Check your root password." -ForegroundColor Red
    Read-Host "Press Enter to exit"
    exit 1
}

# Create user
try {
    mysql -u root -p$rootPass -e "CREATE USER IF NOT EXISTS 'safenest_user'@'localhost' IDENTIFIED BY 'password123';" 2>$null
    Write-Host "[✅] User 'safenest_user' created" -ForegroundColor Green
} catch {
    Write-Host "[❌] Failed to create user. Check your root password." -ForegroundColor Red
    Read-Host "Press Enter to exit"
    exit 1
}

# Grant privileges
try {
    mysql -u root -p$rootPass -e "GRANT ALL PRIVILEGES ON safenest_db.* TO 'safenest_user'@'localhost';" 2>$null
    mysql -u root -p$rootPass -e "FLUSH PRIVILEGES;" 2>$null
    Write-Host "[✅] Privileges granted" -ForegroundColor Green
} catch {
    Write-Host "[❌] Failed to grant privileges. Check your root password." -ForegroundColor Red
    Read-Host "Press Enter to exit"
    exit 1
}

Write-Host ""
Write-Host "[✅] Database setup completed!" -ForegroundColor Green
Write-Host ""
Write-Host "Database Details:" -ForegroundColor Cyan
Write-Host "-----------------"
Write-Host "Database: safenest_db"
Write-Host "Username: safenest_user"
Write-Host "Password: password123"
Write-Host ""

Write-Host "[🔍] Testing connection..." -ForegroundColor Yellow

# Test connection
try {
    mysql -u safenest_user -ppassword123 -e "USE safenest_db; SHOW TABLES;" >$null 2>&1
    Write-Host "[✅] Connection test successful!" -ForegroundColor Green
    Write-Host ""
    Write-Host "============================================" -ForegroundColor Cyan
    Write-Host "   🎉 SafeNest Database Ready!" -ForegroundColor Green
    Write-Host "============================================" -ForegroundColor Cyan
    Write-Host ""
    Write-Host "You can now start your backend:" -ForegroundColor White
    Write-Host "  cd Project_backend\backend" -ForegroundColor Gray
    Write-Host "  mvn spring-boot:run" -ForegroundColor Gray
    Write-Host ""
    Write-Host "And frontend:" -ForegroundColor White
    Write-Host "  npm run dev" -ForegroundColor Gray
    Write-Host ""
} catch {
    Write-Host "[❌] Connection test failed!" -ForegroundColor Red
    Write-Host "Please check your MySQL installation and try again." -ForegroundColor Red
}

Read-Host "Press Enter to exit"