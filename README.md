# SafeNest - Support Platform for Domestic Violence Survivors

SafeNest is a comprehensive web application designed to provide immediate support, resources, and safety information to domestic violence survivors. The platform connects victims with emergency services, legal aid, counseling, and community resources through an intuitive, secure interface.

## 🚀 Features

### For Victims
- **Emergency Resources**: Quick access to local emergency services and hotlines
- **Safety Planning**: Tools to create personalized safety plans
- **Legal Information**: Access to legal rights, protection orders, and court procedures
- **Support Network**: Connect with counselors, legal advisors, and support groups
- **Resource Library**: Comprehensive collection of safety tips, legal guides, and support materials

### For Support Professionals
- **Admin Dashboard**: Manage resources, user accounts, and platform content
- **Counselor Tools**: Access to victim support protocols and resource management
- **Legal Advisor Portal**: Legal resource management and victim assistance tools

### Security & Privacy
- **Anonymous Access**: Browse resources without creating an account
- **Secure Authentication**: Protected user accounts with role-based access
- **Data Privacy**: All personal information is encrypted and securely stored
- **Emergency Mode**: Quick access to critical resources without login

## 🛠️ Technology Stack

### Frontend
- **React 19.2.0** - Modern UI framework with hooks and functional components
- **Vite** - Fast build tool and development server
- **Tailwind CSS** - Utility-first CSS framework for responsive design
- **Axios/Fetch API** - HTTP client for backend communication

### Backend
- **Spring Boot 3.5.1** - Java framework for REST API development
- **Java 21** - Latest LTS Java version with modern features
- **MySQL 8.0** - Relational database for data persistence
- **Maven** - Dependency management and build automation

### Security
- **BCrypt** - Password hashing and verification
- **CORS** - Cross-origin resource sharing protection
- **CSRF Protection** - Cross-site request forgery prevention
- **Input Validation** - Server-side data validation

## 📋 Prerequisites

Before running SafeNest, ensure you have the following installed:

- **Node.js** 18+ (for frontend development)
- **Java** 21+ (for backend development)
- **MySQL** 8.0+ (database server)
- **Maven** 3.9+ (Java build tool)
- **Git** (version control)

## 🚀 Quick Start

### 1. Clone the Repository

```bash
git clone <repository-url>
cd SafeNest-main
```

### 2. Database Setup

Create a MySQL database for SafeNest:

```sql
CREATE DATABASE safenest_db;
CREATE USER 'safenest_user'@'localhost' IDENTIFIED BY 'your_secure_password';
GRANT ALL PRIVILEGES ON safenest_db.* TO 'safenest_user'@'localhost';
FLUSH PRIVILEGES;
```

### 3. Backend Configuration

```bash
# Navigate to backend directory
cd Project_backend/backend

# Configure environment (copy and edit)
cp src/main/resources/application.properties.example src/main/resources/application.properties

# Edit application.properties with your database credentials
# Or set environment variables (recommended for production)
```

### 4. Environment Variables

Create a `.env` file in the root directory:

```bash
# Copy example file
cp .env.example .env

# Edit with your configuration
# VITE_API_URL=http://localhost:8080
```

### 5. Install Dependencies

```bash
# Frontend dependencies
npm install

# Backend dependencies (automatically handled by Maven)
```

### 6. Start the Application

**Option A: Manual Startup**

```bash
# Terminal 1: Start Backend
cd Project_backend/backend
mvn spring-boot:run

# Terminal 2: Start Frontend
npm run dev
```

**Option B: Using Scripts**

```bash
# Run integration test first
chmod +x test-integration.sh
./test-integration.sh

# Then start services manually as above
```

### 7. Access SafeNest

- **Frontend**: http://localhost:5173
- **Backend API**: http://localhost:8080
- **API Documentation**: http://localhost:8080/swagger-ui.html (if enabled)

## 🧪 Testing

### Automated Testing

```bash
# Backend unit tests
cd Project_backend/backend
mvn test

# Frontend tests (when implemented)
npm test

# Integration tests
./test-integration.sh
```

### Manual Testing Checklist

- [ ] User registration and login
- [ ] Role-based dashboard access
- [ ] Resource browsing and filtering
- [ ] Admin resource management
- [ ] Emergency contact functionality
- [ ] Responsive design on mobile devices

## 📁 Project Structure

```
SafeNest-main/
├── Project_backend/           # Spring Boot backend
│   └── backend/
│       ├── src/main/java/com/klu/
│       │   ├── controller/    # REST API endpoints
│       │   ├── model/         # Data models
│       │   ├── repository/    # Data access layer
│       │   ├── service/       # Business logic
│       │   └── config/        # Security & configuration
│       └── src/main/resources/
│           └── application.properties
├── src/                       # React frontend
│   ├── components/            # Reusable UI components
│   ├── services/              # API service layer
│   └── assets/                # Static assets
├── public/                    # Public static files
├── .env.example               # Environment template
├── test-integration.sh        # Integration test script
└── INTEGRATION-README.md      # Detailed setup guide
```

## 🔧 API Endpoints

### Authentication
- `POST /api/auth/signup` - User registration
- `POST /api/auth/login` - User authentication

### Resources
- `GET /api/products` - Get all safety resources
- `GET /api/products/{id}` - Get specific resource
- `POST /api/products` - Create new resource (Admin)
- `PUT /api/products/{id}` - Update resource (Admin)
- `DELETE /api/products/{id}` - Delete resource (Admin)

## 🚀 Deployment

### Development
```bash
npm run dev          # Start frontend dev server
mvn spring-boot:run  # Start backend dev server
```

### Production Build
```bash
# Frontend
npm run build

# Backend
mvn clean package -DskipTests
```

### Docker Deployment
```bash
# Build all services
docker-compose up -d

# View logs
docker-compose logs -f
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Development Guidelines

- Follow existing code style and patterns
- Add tests for new features
- Update documentation as needed
- Ensure all tests pass before submitting PR

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Domestic violence support organizations
- Open source community
- Contributors and maintainers

## 📞 Support

For support, questions, or contributions:

- Create an issue in this repository
- Contact the development team
- Check the [INTEGRATION-README.md](INTEGRATION-README.md) for detailed setup

---

**SafeNest** - Creating safe spaces, one connection at a time. 💜

*If you or someone you know is experiencing domestic violence, please call emergency services immediately.*
