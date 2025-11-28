-- ============================================
-- SUPABASE TABLES AND RLS POLICIES SETUP
-- ============================================
-- Run this SQL in your Supabase SQL Editor
-- ============================================

-- ============================================
-- 1. CREATE PROJECTS TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS projects (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  image_path TEXT,
  technologies TEXT[] DEFAULT '{}',
  category TEXT NOT NULL CHECK (category IN ('fullstack', 'AI/ML', 'data')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ============================================
-- 2. CREATE CERTIFICATES TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS certificates (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  image_path TEXT,
  show_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ============================================
-- 3. ENABLE ROW LEVEL SECURITY (RLS)
-- ============================================
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE certificates ENABLE ROW LEVEL SECURITY;

-- ============================================
-- 4. RLS POLICIES FOR PROJECTS
-- ============================================

-- Allow anyone to SELECT (read) projects
CREATE POLICY "Anyone can view projects"
  ON projects
  FOR SELECT
  USING (true);

-- Only authenticated users can INSERT projects
-- You can restrict this further by checking user email
CREATE POLICY "Only authenticated users can insert projects"
  ON projects
  FOR INSERT
  WITH CHECK (auth.role() = 'authenticated');

-- Only authenticated users can UPDATE projects
CREATE POLICY "Only authenticated users can update projects"
  ON projects
  FOR UPDATE
  USING (auth.role() = 'authenticated')
  WITH CHECK (auth.role() = 'authenticated');

-- Only authenticated users can DELETE projects
CREATE POLICY "Only authenticated users can delete projects"
  ON projects
  FOR DELETE
  USING (auth.role() = 'authenticated');

-- ============================================
-- 5. RLS POLICIES FOR CERTIFICATES
-- ============================================

-- Allow anyone to SELECT (read) certificates
CREATE POLICY "Anyone can view certificates"
  ON certificates
  FOR SELECT
  USING (true);

-- Only authenticated users can INSERT certificates
CREATE POLICY "Only authenticated users can insert certificates"
  ON certificates
  FOR INSERT
  WITH CHECK (auth.role() = 'authenticated');

-- Only authenticated users can UPDATE certificates
CREATE POLICY "Only authenticated users can update certificates"
  ON certificates
  FOR UPDATE
  USING (auth.role() = 'authenticated')
  WITH CHECK (auth.role() = 'authenticated');

-- Only authenticated users can DELETE certificates
CREATE POLICY "Only authenticated users can delete certificates"
  ON certificates
  FOR DELETE
  USING (auth.role() = 'authenticated');

-- ============================================
-- OPTIONAL: Restrict to specific admin email
-- Uncomment and replace with your email if needed
-- ============================================
/*
-- Drop existing policies first
DROP POLICY IF EXISTS "Only authenticated users can insert projects" ON projects;
DROP POLICY IF EXISTS "Only authenticated users can update projects" ON projects;
DROP POLICY IF EXISTS "Only authenticated users can delete projects" ON projects;
DROP POLICY IF EXISTS "Only authenticated users can insert certificates" ON certificates;
DROP POLICY IF EXISTS "Only authenticated users can update certificates" ON certificates;
DROP POLICY IF EXISTS "Only authenticated users can delete certificates" ON certificates;

-- Create admin-only policies (replace 'your-email@example.com' with your actual email)
CREATE POLICY "Only admin can insert projects"
  ON projects
  FOR INSERT
  WITH CHECK (auth.jwt() ->> 'email' = 'your-email@example.com');

CREATE POLICY "Only admin can update projects"
  ON projects
  FOR UPDATE
  USING (auth.jwt() ->> 'email' = 'your-email@example.com')
  WITH CHECK (auth.jwt() ->> 'email' = 'your-email@example.com');

CREATE POLICY "Only admin can delete projects"
  ON projects
  FOR DELETE
  USING (auth.jwt() ->> 'email' = 'your-email@example.com');

CREATE POLICY "Only admin can insert certificates"
  ON certificates
  FOR INSERT
  WITH CHECK (auth.jwt() ->> 'email' = 'your-email@example.com');

CREATE POLICY "Only admin can update certificates"
  ON certificates
  FOR UPDATE
  USING (auth.jwt() ->> 'email' = 'your-email@example.com')
  WITH CHECK (auth.jwt() ->> 'email' = 'your-email@example.com');

CREATE POLICY "Only admin can delete certificates"
  ON certificates
  FOR DELETE
  USING (auth.jwt() ->> 'email' = 'your-email@example.com');
*/

-- ============================================
-- 6. CREATE INDEXES FOR BETTER PERFORMANCE
-- ============================================
CREATE INDEX IF NOT EXISTS idx_projects_category ON projects(category);
CREATE INDEX IF NOT EXISTS idx_projects_created_at ON projects(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_certificates_created_at ON certificates(created_at DESC);

