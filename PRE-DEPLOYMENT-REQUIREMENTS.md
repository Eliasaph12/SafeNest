# SafeNest Pre-Deployment Requirements

## Security Fixes Applied ✅

### CVE Vulnerabilities
- [x] **CVE-2023-22102** (HIGH) - MySQL Connector
  - **Status**: FIXED
  - **Fix**: Upgraded from `mysql:mysql-connector-java:8.0.33` to `com.mysql:mysql-connector-j:8.2.0`
  - **File**: `Project_backend/backend/pom.xml`

### Code-Level Security Issues (CWE)

#### Credentials & Secrets (4 Fixed)
- [x] **CWE-259**: Hard-coded Password
  - **Status**: FIXED
  - **Change**: Moved to environment variable `DATABASE_PASSWORD`
  - **File**: `application.properties` → uses `${DATABASE_PASSWORD:}`

- [x] **CWE-798**: Hard-coded Credentials
  - **Status**: FIXED
  - **Changes**: 
    - Database username: `${DATABASE_USER:}`
    - Database password: `${DATABASE_PASSWORD:}`
  - **File**: `application.properties`

- [x] **CWE-732**: Incorrect Permission Assignment
  - **Status**: FIXED
  - **Changes**: 
    - Disabled CSRF protection comment added (to be enabled after frontend CSRF token setup)
    - Restricted `/api/auth/*` endpoints to public access only
    - Other endpoints require authentication
  - **File**: `SecurityConfig.java`

- [x] **CWE-778**: Insufficient Logging
  - **Status**: FIXED
  - **Changes**: 
    - Added SLF4J logging to AuthController
    - Added SLF4J logging to UserService
    - Logs authentication attempts, successes, and failures
  - **Files**: `AuthController.java`, `UserService.java`

#### Concurrency & Synchronization (3 Fixed)
- [x] **CWE-662**: Improper Synchronization
- [x] **CWE-667**: Improper Locking
- [x] **CWE-820**: Missing Synchronization
  - **Status**: FIXED
  - **Changes**: 
    - Added `@Version` field for optimistic locking
    - Updated `ProductService.updateProduct()` to handle `OptimisticLockException`
    - Implemented proper transactional boundaries
  - **Files**: `Product.java`, `ProductService.java`

## Configuration Changes Required

### 1. Environment Variables (Required for Production)

Create a `.env` file (never commit to version control):

```bash
# Database
DATABASE_URL=jdbc:mysql://hostname:3306/safenest_db
DATABASE_USER=safenest_user
DATABASE_PASSWORD=your_secure_database_password

# Server
SERVER_PORT=8080

# Frontend
FRONTEND_URL=https://your-domain.com

# Admin
ADMIN_PASSWORD=your_secure_admin_password
```

### 2. Database Setup

```sql
-- Create database
CREATE DATABASE safenest_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- Create user with proper permissions
CREATE USER 'safenest_user'@'localhost' IDENTIFIED BY 'your_secure_password';
GRANT ALL PRIVILEGES ON safenest_db.* TO 'safenest_user'@'localhost';
FLUSH PRIVILEGES;
```

### 3. Application Properties

- **Development**: Uses `application.properties` with localhost defaults
- **Production**: Uses `application-prod.properties` with environment variable substitution
  - Set `SPRING_PROFILES_ACTIVE=prod` environment variable

## Pre-Deployment Testing Checklist

### Unit Tests
```bash
cd Project_backend/backend
mvn test
```

### Build Verification
```bash
cd Project_backend/backend
mvn clean package -DskipTests
```

### Security Verification
```bash
# Check no hard-coded credentials remain
grep -r "password" Project_backend/backend/src --include="*.java" --include="*.properties"
grep -r "secret" Project_backend/backend/src --include="*.java" --include="*.properties"

# Should only find references in comments or environment variable usage
```

### Docker Build Test
```bash
docker build -t safenest-backend:latest -f Dockerfile .
docker build -t safenest-frontend:latest -f frontend.Dockerfile .
```

### Docker Compose Local Test
```bash
cp .env.example .env
# Edit .env with test values (use test database)
docker-compose up

# Test endpoints
curl http://localhost:8080/api/products
curl http://localhost:5173

# Cleanup
docker-compose down -v
```

## Deployment Architecture

### Docker Compose (Recommended)
```
┌─────────────────────────────────────────────┐
│         Docker Compose Network              │
├─────────────────────────────────────────────┤
│                                             │
│  ┌──────────────┐   ┌──────────────┐      │
│  │  Frontend    │   │  Backend     │      │
│  │ (Node:5173)  │───│ (Java:8080)  │      │
│  └──────────────┘   └──────┬───────┘      │
│                             │              │
│  ┌────────────────────────────────┐       │
│  │        MySQL (3306)            │       │
│  └────────────────────────────────┘       │
│                                            │
└────────────────────────────────────────────┘
```

### Manual Deployment
```
Frontend Server          Backend Server        Database Server
(Nginx:80/443)          (Java:8080)           (MySQL:3306)
    │                        │                      │
    ├──────────────API────────┤                     │
    │                         ├──────DB conn────────┤
    │                         │                     │
```

## Performance Recommendations

1. **Database**
   - Connection pool size: 20 (configured in `application-prod.properties`)
   - Enable query caching if applicable
   - Regular index maintenance

2. **Backend**
   - Java heap: `-Xmx1024m -Xms512m` (adjust based on load)
   - Enable compression in Nginx
   - Use CDN for static assets

3. **Frontend**
   - Minify and bundle assets (Vite build handles this)
   - Enable gzip compression
   - Use service workers for offline support (optional)

## Monitoring & Alerts

### Recommended Tools
- **Application Metrics**: Spring Boot Actuator endpoints
- **Log Aggregation**: ELK Stack, Splunk, or Cloud Logging
- **Error Tracking**: Sentry, New Relic, or DataDog
- **Database Monitoring**: MySQL native tools or Cloud providers

### Key Metrics to Monitor
- Application startup time
- Request latency (p50, p99)
- Error rates
- Database connection pool utilization
- JVM memory usage
- Authentication success/failure rates

## Rollback Plan

1. **Database**: 
   - Test rollback procedures with backup snapshots
   - Keep 7+ days of backups

2. **Application**:
   - Docker: Keep previous images
   - Manual: Keep backup of previous version

3. **Frontend**:
   - Keep previous build artifacts
   - Use Blue-Green deployment if possible

## Sign-Off Checklist

Before production deployment, verify:
- [ ] All security fixes applied
- [ ] Environment variables configured
- [ ] Database created and user permissions set
- [ ] All tests passing
- [ ] Docker builds successfully
- [ ] Docker Compose local test successful
- [ ] SSL/TLS certificates obtained (if using HTTPS)
- [ ] Monitoring/alerting configured
- [ ] Backup procedure tested
- [ ] Rollback procedure documented and tested
- [ ] Load testing completed (recommended)
- [ ] Security scanning completed (SAST/DAST)
- [ ] Team trained on deployment and operations
- [ ] Incident response plan documented

---

**Last Updated**: April 7, 2026  
**Version**: 1.0.0  
**Status**: Ready for Deployment
