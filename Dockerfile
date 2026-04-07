# Multi-stage build for SafeNest Backend
# Stage 1: Build
FROM maven:3.9-eclipse-temurin-21 AS builder

WORKDIR /build

# Copy pom.xml and download dependencies
COPY Project_backend/backend/pom.xml .
RUN mvn dependency:go-offline

# Copy source code
COPY Project_backend/backend/src ./src

# Build the application
RUN mvn clean package -DskipTests

# Stage 2: Runtime
FROM eclipse-temurin:21-jre-alpine

WORKDIR /app

# Copy jar from builder
COPY --from=builder /build/target/backend-*.jar ./app.jar

# Create logs directory
RUN mkdir -p /app/logs

# Health check
HEALTHCHECK --interval=30s --timeout=10s --start-period=40s --retries=3 \
  CMD wget --no-verbose --tries=1 --spider http://localhost:${SERVER_PORT:-8080}/actuator/health || exit 1

# Expose port
EXPOSE 8080

# Run application with production profile
ENV SPRING_PROFILES_ACTIVE=prod
ENTRYPOINT ["java", "-Xmx1024m", "-Xms512m", "-jar", "app.jar"]
