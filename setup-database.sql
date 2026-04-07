-- SafeNest Database Setup Script
-- This script creates the complete database schema for SafeNest

-- Create the database
CREATE DATABASE IF NOT EXISTS safenest_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- Use the database
USE safenest_db;

-- Create the safety_resources table (mapped to Product entity)
CREATE TABLE IF NOT EXISTS safety_resources (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    version BIGINT DEFAULT 0,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    resource_type VARCHAR(100),
    target_audience VARCHAR(255),
    contact_info VARCHAR(255),
    emergency_hotline VARCHAR(50),
    is_active BOOLEAN DEFAULT TRUE,
    priority_level INT DEFAULT 5,
    image_url VARCHAR(500),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Create indexes for better performance
CREATE INDEX idx_resource_type ON safety_resources(resource_type);
CREATE INDEX idx_target_audience ON safety_resources(target_audience);
CREATE INDEX idx_is_active ON safety_resources(is_active);
CREATE INDEX idx_priority_level ON safety_resources(priority_level DESC);

-- Create the user table
CREATE TABLE IF NOT EXISTS user (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    version BIGINT DEFAULT 0,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    role VARCHAR(50) NOT NULL,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Create indexes for user table
CREATE UNIQUE INDEX idx_user_email ON user(email);
CREATE INDEX idx_user_role ON user(role);

-- Insert sample data for testing
INSERT IGNORE INTO safety_resources (name, description, resource_type, target_audience, contact_info, emergency_hotline, priority_level) VALUES
('National Domestic Violence Hotline', '24/7 confidential support for domestic violence survivors', 'SupportService', 'Victim', '1-800-799-7233', '911', 10),
('Legal Aid Society', 'Free legal assistance for domestic violence cases', 'LegalResource', 'Victim,LegalAdvisor', '1-800-123-4567', NULL, 9),
('Emergency Shelter Network', 'Safe housing for victims of domestic violence', 'SupportService', 'Victim,Counsellor', '1-888-555-0199', '911', 10),
('Counseling Services', 'Professional counseling for trauma recovery', 'CounselingTip', 'Victim,Counsellor', '1-800-123-HELP', NULL, 8),
('Protection Order Guide', 'Step-by-step guide to obtaining a protection order', 'LegalResource', 'Victim,LegalAdvisor', 'court-website.com', NULL, 7),
('Safety Planning Tips', 'Essential safety planning strategies', 'SafetyTip', 'Victim,Counsellor', NULL, NULL, 9);

-- Create the database user
CREATE USER IF NOT EXISTS 'safenest_user'@'localhost' IDENTIFIED BY 'password123';

-- Grant all privileges on the database to the user
GRANT ALL PRIVILEGES ON safenest_db.* TO 'safenest_user'@'localhost';

-- Flush privileges to apply changes
FLUSH PRIVILEGES;

-- Verify the setup
SELECT 'Database setup completed successfully!' as Status;
SHOW TABLES;