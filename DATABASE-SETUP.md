# 🚀 SafeNest Database Setup - Zero Error Guide

## 🎯 One-Click Setup (Recommended)

**Just run this file:** `setup-safenest.bat`

That's it! The script will:
- ✅ Check your system for MySQL
- ✅ Install MySQL if missing (with instructions)
- ✅ Create the database with proper schema
- ✅ Load sample data for testing
- ✅ Verify everything works

## 📋 Manual Setup (If Script Fails)

### Step 1: Install MySQL
```bash
# Download from: https://dev.mysql.com/downloads/installer/
# Run installer → Select "Developer Default"
# Set root password: rootpassword
```

### Step 2: Run Database Setup
```bash
# Run the automated setup
setup-mysql.bat

# Or run SQL manually
mysql -u root -p < setup-database.sql
```

### Step 3: Verify Setup
```bash
# Test everything
verify-database.bat
```

## 🔧 Database Configuration

| Setting | Value |
|---------|-------|
| Database | `safenest_db` |
| Username | `safenest_user` |
| Password | `password123` |
| Port | `3306` |
| Tables | `safety_resources`, `user` |

## 📊 Sample Data Included

The setup creates 6 sample resources:
- National Domestic Violence Hotline
- Legal Aid Society
- Emergency Shelter Network
- Counseling Services
- Protection Order Guide
- Safety Planning Tips

## 🧪 Testing Your Setup

### Quick Test Commands:
```bash
# Test MySQL
mysql --version

# Test connection
mysql -u safenest_user -ppassword123 -e "USE safenest_db; SELECT COUNT(*) FROM safety_resources;"

# Test API (after starting backend)
curl http://localhost:8080/api/products
```

### Full Verification:
Run `verify-database.bat` - it tests everything automatically!

## 🚨 Troubleshooting

### "MySQL not found"
- Install MySQL Server 8.0 from oracle.com
- Add MySQL to Windows PATH
- Restart command prompt

### "Access denied"
- Check root password (default: rootpassword)
- Run command prompt as Administrator
- Verify MySQL service is running

### "Connection failed"
- Check if port 3306 is available
- Verify database exists: `SHOW DATABASES;`
- Test user permissions

### "Table doesn't exist"
- Re-run `setup-database.sql`
- Check database selection: `USE safenest_db;`

## 🎯 Next Steps

Once database is ready:

1. **Start Backend:**
   ```bash
   cd Project_backend/backend
   mvn spring-boot:run
   ```

2. **Start Frontend:**
   ```bash
   npm run dev
   ```

3. **Test Application:**
   - Open: http://localhost:5173
   - Register a new account
   - Login and browse resources

## 📁 Files Created

- `setup-safenest.bat` - One-click setup script
- `setup-mysql.bat` - Interactive MySQL setup
- `setup-database.sql` - Database schema & sample data
- `verify-database.bat` - Comprehensive testing
- `setup-mysql.ps1` - PowerShell alternative

## 💡 Pro Tips

- **Run as Administrator** for best results
- **Keep passwords secure** in production
- **Backup regularly** your database
- **Use environment variables** for sensitive data

---

**🎉 Your SafeNest database will be ready in under 5 minutes!**

*Need help?* Run `verify-database.bat` to diagnose any issues.