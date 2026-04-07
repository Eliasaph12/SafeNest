# SafeNest - Integrated Frontend + Backend

SafeNest is a comprehensive support platform for domestic violence survivors, featuring both a React frontend and Spring Boot backend with full API integration.

## Features

### Frontend (React + Vite)
- User authentication (login/register)
- Role-based dashboards (Victim, Counsellor, Legal Advisor, Admin)
- Resource management and display
- Emergency contact features
- Responsive design with dark/light theme

### Backend (Spring Boot)
- RESTful API with authentication
- Resource management (safety tips, legal info, support services)
- User management with role-based access
- Security features (CORS, CSRF protection, password hashing)
- Database integration (MySQL)

## Quick Start

### Prerequisites
- Node.js 18+
- Java 21+
- MySQL 8.0+
- Maven 3.9+

### 1. Clone and Setup

```bash
git clone <repository-url>
cd SafeNest-main
```

### 2. Backend Setup

```bash
# Navigate to backend
cd Project_backend/backend

# Configure database (create MySQL database first)
# Update src/main/resources/application.properties or use environment variables

# Build and run
mvn clean install
mvn spring-boot:run
```

### 3. Frontend Setup

```bash
# In the root directory
npm install

# Configure API URL (optional - defaults to localhost:8080)
cp .env.example .env
# Edit .env with your backend URL

# Run development server
npm run dev
```

### 4. Access the Application

- Frontend: http://localhost:5173
- Backend API: http://localhost:8080
- API Documentation: http://localhost:8080/swagger-ui.html (if enabled)

## API Endpoints

### Authentication
- `POST /api/auth/signup` - Register new user
- `POST /api/auth/login` - User login

### Resources
- `GET /api/products` - Get all resources
- `GET /api/products/{id}` - Get resource by ID
- `POST /api/products` - Create new resource (Admin only)
- `PUT /api/products/{id}` - Update resource (Admin only)
- `DELETE /api/products/{id}` - Delete resource (Admin only)

## Environment Configuration

### Backend Environment Variables
```bash
DATABASE_URL=jdbc:mysql://localhost:3306/safenest_db
DATABASE_USER=your_db_user
DATABASE_PASSWORD=your_db_password
SERVER_PORT=8080
FRONTEND_URL=http://localhost:5173
ADMIN_PASSWORD=your_admin_password
```

### Frontend Environment Variables
```bash
VITE_API_URL=http://localhost:8080
```

## Development

### Running Tests

```bash
# Backend tests
cd Project_backend/backend
mvn test

# Frontend tests (if implemented)
npm test
```

### Building for Production

```bash
# Backend
cd Project_backend/backend
mvn clean package -DskipTests

# Frontend
npm run build
```

## Docker Deployment

### Using Docker Compose (Recommended)

```bash
# Build and run all services
docker-compose up -d

# View logs
docker-compose logs -f

# Stop services
docker-compose down
```

### Manual Docker Build

```bash
# Backend
docker build -f Dockerfile -t safenest-backend .

# Frontend
docker build -f frontend.Dockerfile -t safenest-frontend .
```

## Security Features

- Password hashing with BCrypt
- CORS protection
- CSRF protection (configurable)
- Input validation
- SQL injection prevention
- Authentication logging
- Optimistic locking for concurrent updates

## Database Schema

The application uses MySQL with the following main tables:
- `user` - User accounts and authentication
- `safety_resources` - Resources, tips, and support information

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Support

For support and questions:
- Create an issue in the repository
- Contact the development team
- Check the documentation in the `DEPLOYMENT.md` file

---

**SafeNest** - Creating safe spaces, one connection at a time. 💜