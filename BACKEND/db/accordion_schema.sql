-- Accordion Sections Table
CREATE TABLE IF NOT EXISTS accordion_sections (
  id INT PRIMARY KEY AUTO_INCREMENT,
  title VARCHAR(255) NOT NULL,
  content LONGTEXT NOT NULL,
  display_order INT DEFAULT 0,
  is_active BOOLEAN DEFAULT TRUE,
  category VARCHAR(100) DEFAULT 'general',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX idx_display_order (display_order),
  INDEX idx_is_active (is_active),
  INDEX idx_category (category)
);

-- User Accordion Preferences Table
CREATE TABLE IF NOT EXISTS accordion_preferences (
  id INT PRIMARY KEY AUTO_INCREMENT,
  user_id INT NOT NULL,
  open_items JSON DEFAULT '[]',
  theme VARCHAR(50) DEFAULT 'light',
  expanded_by_default BOOLEAN DEFAULT FALSE,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  UNIQUE KEY unique_user (user_id),
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  INDEX idx_user_id (user_id)
);

-- Sample data
INSERT INTO accordion_sections (title, content, display_order, is_active, category) VALUES
('Getting Started', 'Welcome to SafeSpace. Here are the basics to get you started with our platform.', 1, TRUE, 'help'),
('Community Guidelines', 'Our community is built on respect and safety. Please review our guidelines.', 2, TRUE, 'help'),
('Safety Features', 'Learn about the safety features available to protect you and others.', 3, TRUE, 'help'),
('FAQ', 'Frequently asked questions about SafeSpace services.', 4, TRUE, 'faq'),
('Emergency Resources', 'Important resources and hotlines for emergency situations.', 5, TRUE, 'emergency');
