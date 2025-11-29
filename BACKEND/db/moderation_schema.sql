-- Reports Table
CREATE TABLE IF NOT EXISTS reports (
  id SERIAL PRIMARY KEY,
  type VARCHAR(100) NOT NULL,
  severity VARCHAR(20) NOT NULL DEFAULT 'medium' CHECK (severity IN ('low', 'medium', 'high')),
  content TEXT NOT NULL,
  reporter VARCHAR(255) DEFAULT 'Anonymous',
  user_id INT REFERENCES users(id) ON DELETE SET NULL,
  status VARCHAR(20) NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'under_review', 'resolved', 'dismissed')),
  timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_reports_status ON reports(status);
CREATE INDEX IF NOT EXISTS idx_reports_severity ON reports(severity);
CREATE INDEX IF NOT EXISTS idx_reports_type ON reports(type);
CREATE INDEX IF NOT EXISTS idx_reports_timestamp ON reports(timestamp);

-- Moderators Table
CREATE TABLE IF NOT EXISTS moderators (
  id SERIAL PRIMARY KEY,
  user_id INT NOT NULL UNIQUE REFERENCES users(id) ON DELETE CASCADE,
  name VARCHAR(255) NOT NULL,
  status VARCHAR(20) NOT NULL DEFAULT 'offline' CHECK (status IN ('online', 'away', 'offline')),
  reports_handled INT DEFAULT 0,
  last_active TIMESTAMP,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_moderators_status ON moderators(status);
CREATE INDEX IF NOT EXISTS idx_moderators_reports_handled ON moderators(reports_handled);

-- Moderation Logs Table
CREATE TABLE IF NOT EXISTS moderation_logs (
  id SERIAL PRIMARY KEY,
  report_id INT NOT NULL REFERENCES reports(id) ON DELETE CASCADE,
  moderator_id INT NOT NULL REFERENCES moderators(id) ON DELETE CASCADE,
  action VARCHAR(255),
  notes TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_moderation_logs_report_id ON moderation_logs(report_id);
CREATE INDEX IF NOT EXISTS idx_moderation_logs_moderator_id ON moderation_logs(moderator_id);
CREATE INDEX IF NOT EXISTS idx_moderation_logs_created_at ON moderation_logs(created_at);

-- Sample Data
INSERT INTO reports (type, severity, content, reporter, status, timestamp) VALUES
('harassment', 'high', 'User repeatedly sending inappropriate messages in the general chat room', 'Anonymous User', 'pending', '2024-01-15 14:30:00'),
('hate_speech', 'medium', 'Discriminatory comments targeting specific groups in group chat', 'Community Member', 'under_review', '2024-01-15 13:45:00'),
('spam', 'low', 'Multiple duplicate messages and promotional content detected', 'Auto-Moderator', 'resolved', '2024-01-15 12:15:00')
ON CONFLICT DO NOTHING;

INSERT INTO moderators (user_id, name, status, reports_handled, last_active) VALUES
(1, 'Alex Johnson', 'online', 47, NOW()),
(2, 'Sam Smith', 'away', 32, NOW() - INTERVAL '1 hour'),
(3, 'Taylor Kim', 'online', 28, NOW() - INTERVAL '5 minutes')
ON CONFLICT (user_id) DO NOTHING;
