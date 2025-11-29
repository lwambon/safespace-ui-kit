-- Enable UUID extension for unique IDs
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ===========================
-- Users
-- ===========================
CREATE TABLE IF NOT EXISTS users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  email TEXT UNIQUE,
  phone TEXT,
  handle TEXT UNIQUE,
  password_hash TEXT,
  pin_hash TEXT,
  is_anonymous BOOLEAN DEFAULT TRUE,
  role TEXT DEFAULT 'user',
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- ===========================
-- Reports
-- ===========================
CREATE TABLE IF NOT EXISTS reports (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id) ON DELETE SET NULL,
  category TEXT NOT NULL,
  severity TEXT CHECK (severity IN ('low','medium','high','immediate')) NOT NULL,
  description TEXT,
  lat DOUBLE PRECISION,
  lng DOUBLE PRECISION,
  location_text TEXT,
  timestamp TIMESTAMP DEFAULT NOW(),
  is_anonymous BOOLEAN DEFAULT TRUE,
  status TEXT DEFAULT 'received',
  consent_share_location BOOLEAN DEFAULT FALSE,
  consent_contact_user BOOLEAN DEFAULT FALSE
);

-- ===========================
-- Forum posts
-- ===========================
CREATE TABLE IF NOT EXISTS forum_posts (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id) ON DELETE SET NULL,
  title TEXT NOT NULL,
  body TEXT NOT NULL,
  is_anonymous BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW(),
  is_locked BOOLEAN DEFAULT FALSE
);

-- ===========================
-- Forum replies
-- ===========================
CREATE TABLE IF NOT EXISTS forum_replies (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  post_id UUID REFERENCES forum_posts(id) ON DELETE CASCADE,
  user_id UUID REFERENCES users(id) ON DELETE SET NULL,
  body TEXT NOT NULL,
  is_anonymous BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- ===========================
-- Hotspots
-- ===========================
CREATE TABLE IF NOT EXISTS hotspots (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  lat DOUBLE PRECISION,
  lng DOUBLE PRECISION,
  location_text TEXT,
  report_count INTEGER DEFAULT 0,
  last_updated TIMESTAMP DEFAULT NOW()
);

-- ===========================
-- Analytics logs
-- ===========================
CREATE TABLE IF NOT EXISTS analytics_logs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  event_type TEXT NOT NULL,
  payload JSONB,
  created_at TIMESTAMP DEFAULT NOW()
);

-- ===========================
-- Countries
-- ===========================
CREATE TABLE IF NOT EXISTS countries (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  iso_code VARCHAR(5) UNIQUE NOT NULL
);

-- ===========================
-- Emergency contacts
-- ===========================
CREATE TABLE IF NOT EXISTS emergency_contacts (
  id SERIAL PRIMARY KEY,
  country_id INT REFERENCES countries(id) ON DELETE CASCADE,
  hotline_number VARCHAR(50) NOT NULL,
  type VARCHAR(50) NOT NULL
);

-- ===========================
-- Harassment categories
-- ===========================
CREATE TABLE IF NOT EXISTS harassment_categories (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  description TEXT
);