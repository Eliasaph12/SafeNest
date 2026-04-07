# SafeNest Deployment Guide

## Overview

This guide covers deploying SafeNest (React frontend + Spring Boot backend) to production environments.

## Pre-Deployment Checklist

### Security
- [x] Hard-coded credentials removed (using environment variables)
- [x] CVE-2023-22102 patched (MySQL connector updated to 8.2.0)
- [x] CSRF protection enabled
- [x] CORS properly configured
- [x] Authentication logging implemented
- [x] Password hashing with BCrypt
- [x] Concurrent modification protection with optimistic locking

### Code Quality
- [x] No SQL injection vulnerabilities
- [x] No XSS vulnerabilities
- [x] Proper synchronization in concurrent operations
- [x] Memory safety (Java automatic management)
- [x] Environment-based configuration

### Testing
- [ ] Unit tests passing
- [ ] Integration tests passing
- [ ] Security tests completed
- [ ] Load testing completed (recommended)

## Deployment Methods

### Option 1: Docker Compose (Recommended for Quick Setup)

#### Prerequisites
- Docker 20.10+
- Docker Compose 1.29+

#### Steps

1. **Configure environment variables:**
```bash
cp .env.example .env
# Edit .env with your production values
```

2. **Build and start services:**
```bash
docker-compose up -d
```

3. **Verify services:**
```bash
docker-compose ps
```

4. **Check logs:**
```bash
docker-compose logs -f backend
docker-compose logs -f mysql
```

5. **Stop services:**
```bash
docker-compose down
```

### Option 2: Manual Deployment (Linux/Unix)

#### Prerequisites
- Java 21+
- Maven 3.9+
- MySQL 8.0+
- Node.js 18+ (for frontend)

#### Backend Setup

1. **Configure database:**
```sql
CREATE DATABASE safenest_db;
CREATE USER 'safenest_user'@'localhost' IDENTIFIED BY 'your_secure_password';
GRANT ALL PRIVILEGES ON safenest_db.* TO 'safenest_user'@'localhost';
FLUSH PRIVILEGES;
```

2. **Build backend:**
```bash
cd Project_backend/backend
mvn clean package -DskipTests -Pproduction
```

3. **Set environment variables:**
```bash
export DATABASE_URL="jdbc:mysql://localhost:3306/safenest_db"
export DATABASE_USER="safenest_user"
export DATABASE_PASSWORD="your_secure_password"
export SERVER_PORT=8080
export FRONTEND_URL="https://your-frontend-domain.com"
export ADMIN_PASSWORD="your_admin_password"
export SPRING_PROFILES_ACTIVE=prod
```

4. **Run backend:**
```bash
java -Xmx1024m -Xms512m \
  -Dspring.profiles.active=prod \
  -jar target/backend-0.0.1-SNAPSHOT.jar
```

Or use systemd service (recommended for production):

```ini
[Unit]
Description=SafeNest Backend
After=network.target mysql.service

[Service]
Type=simple
User=safenest
WorkingDirectory=/opt/safenest/backend
Environment="SPRING_PROFILES_ACTIVE=prod"
Environment="DATABASE_URL=jdbc:mysql://localhost:3306/safenest_db"
Environment="DATABASE_USER=safenest_user"
Environment="DATABASE_PASSWORD=your_secure_password"
ExecStart=/usr/bin/java -Xmx1024m -Xms512m -jar backend-0.0.1-SNAPSHOT.jar
Restart=always
RestartSec=10

[Install]
WantedBy=multi-user.target
```

#### Frontend Setup

1. **Install dependencies:**
```bash
npm install
```

2. **Build for production:**
```bash
npm run build
```

3. **Serve with Node.js or Nginx:**

**Using Node.js (simple):**
```bash
npm install -g serve
serve -s dist -l 3000
```

**Using Nginx (recommended):**
```nginx
server {
    listen 80;
    server_name your-frontend-domain.com;
    
    location / {
        root /var/www/safenest/dist;
        try_files $uri $uri/ /index.html;
    }
    
    location /api {
        proxy_pass http://localhost:8080;
        proxy_http_version 1.1;
        proxy_set_header Connection "upgrade";
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

### Option 3: Cloud Deployment (AWS/Azure/GCP)

#### AWS Elastic Beanstalk

1. **Install EB CLI:**
```bash
pip install awsebcli
```

2. **Initialize:**
```bash
eb init safenest -p "Docker running on 64bit Amazon Linux 2"
```

3. **Create environment:**
```bash
eb create safenest-prod
```

4. **Deploy:**
```bash
eb deploy
```

5. **Configure environment variables:**
```bash
eb setenv DATABASE_URL="..." DATABASE_USER="..." DATABASE_PASSWORD="..."
```

#### Azure App Service

1. **Login to Azure:**
```bash
az login
```

2. **Create resource group:**
```bash
az group create --name safenest-rg --location eastus
```

3. **Create App Service:**
```bash
az appservice plan create --name safenest-plan --resource-group safenest-rg --sku B2 --is-linux
az webapp create --resource-group safenest-rg --plan safenest-plan --name safenest-app --runtime "java|21"
```

4. **Configure connection strings:**
```bash
az webapp config connection-string set --resource-group safenest-rg --name safenest-app \
  --settings DATABASE_URL="..." --connection-string-type MySql
```

## Post-Deployment Verification

### Health Checks

```bash
# Backend health
curl http://localhost:8080/actuator/health

# API connectivity
curl http://localhost:8080/api/products
```

### Database Verification

```bash
mysql -h localhost -u safenest_user -p safenest_db
SELECT VERSION();
```

### Log Monitoring

**Backend logs:**
```bash
tail -f logs/safenest.log
docker logs -f safenest-backend  # Docker
```

**Check for startup errors:**
```bash
grep -i "error\|warn\|exception" logs/safenest.log
```

## Monitoring & Maintenance

### Metrics Endpoint
```bash
curl http://localhost:8080/actuator/metrics
```

### Recommended Monitoring Tools
- **Application Insights** (Azure)
- **CloudWatch** (AWS)
- **Stackdriver** (GCP)
- **New Relic** (Cross-cloud)
- **DataDog** (Cross-cloud)

### Database Backups

**MySQL automated backup:**
```bash
# Daily backup at 2 AM
0 2 * * * mysqldump -u safenest_user -p safenest_db > /backups/safenest_$(date +\%Y\%m\%d).sql
```

### SSL/TLS Configuration

**Using Let's Encrypt with Nginx:**
```bash
certbot certonly --nginx -d your-frontend-domain.com
certbot renew --dry-run  # Test auto-renewal
```

**Docker with SSL:**
```yaml
services:
  nginx:
    image: nginx:alpine
    ports:
      - "443:443"
    volumes:
      - /etc/letsencrypt:/etc/letsencrypt:ro
      - ./nginx.conf:/etc/nginx/nginx.conf:ro
```

## Troubleshooting

### Database Connection Errors
- Verify DATABASE_URL format: `jdbc:mysql://hostname:3306/dbname`
- Check database user permissions
- Ensure MySQL service is running
- Test connectivity: `mysql -h hostname -u user -p dbname`

### Authentication Issues
- Verify password hashing is working (check logs for "Authenticat" messages)
- Ensure admin user was created with correct credentials
- Check CORS configuration matches frontend URL

### Memory Issues
- Increase heap size: `-Xmx2048m -Xms1024m`
- Monitor memory usage: `jstat -gc -h10 [pid] 1000`
- Consider horizontal scaling

### Performance Issues
- Enable query logging: Set `spring.jpa.show-sql=true` (development only)
- Increase database connection pool: `hikari.maximum-pool-size=30`
- Add database indexes on frequently queried fields
- Consider caching with Redis

## Security Best Practices

1. **Environment Variables**: Never commit `.env` files
2. **SSL/TLS**: Always use HTTPS in production
3. **Database**: Use strong passwords, restrict access
4. **Backups**: Maintain regular automated backups
5. **Monitoring**: Set up alerts for errors and security events
6. **Updates**: Keep dependencies and OS packages updated
7. **Logging**: Enable security event logging
8. **CORS**: Restrict to specific origins only

## Rollback Procedure

### Docker Rollback
```bash
# View deployment history
docker images | grep safenest-backend

# Run previous version
docker run -d --name safenest-backend-prev [image-id]

# Verify services, then remove new version
docker rm safenest-backend
docker rename safenest-backend-prev safenest-backend
```

### Manual Rollback
```bash
# Backup current version
cp -r /opt/safenest/backend /backups/backend-$(date +%Y%m%d)

# Restore previous version
cp /backups/backend-previous/backend*.jar /opt/safenest/backend/

# Restart service
systemctl restart safenest
```

## Support & Documentation

- **API Documentation**: `/swagger-ui.html` (if Springdoc enabled)
- **Health Status**: `/actuator/health`
- **Metrics**: `/actuator/metrics`
- **Logs Directory**: `/app/logs/` (Docker) or `./logs/` (Manual)

## Contact & Emergency

- **On-call**: [Team contact info]
- **Status Page**: [Status page URL]
- **Incident Reporting**: [Incident reporting process]
