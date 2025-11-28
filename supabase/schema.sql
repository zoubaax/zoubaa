-- ============================================
-- SUPABASE TABLES AND RLS POLICIES SETUP
-- ============================================
-- Run this SQL in your Supabase SQL Editor
-- ============================================

-- ============================================
-- 1. CREATE TECHNOLOGIES TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS technologies (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL UNIQUE,
  image_path TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ============================================
-- 2. CREATE PROJECTS TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS projects (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  image_path TEXT,
  category TEXT NOT NULL CHECK (category IN ('fullstack', 'AI/ML', 'data')),
  github_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ============================================
-- 3. CREATE PROJECTS_TECHNOLOGIES JUNCTION TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS projects_technologies (
  project_id UUID NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
  technology_id UUID NOT NULL REFERENCES technologies(id) ON DELETE CASCADE,
  PRIMARY KEY (project_id, technology_id)
);

-- ============================================
-- 4. CREATE CERTIFICATES TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS certificates (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  image_path TEXT,
  show_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ============================================
-- 5. ENABLE ROW LEVEL SECURITY (RLS)
-- ============================================
ALTER TABLE technologies ENABLE ROW LEVEL SECURITY;
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE projects_technologies ENABLE ROW LEVEL SECURITY;
ALTER TABLE certificates ENABLE ROW LEVEL SECURITY;

-- ============================================
-- 6. RLS POLICIES FOR TECHNOLOGIES
-- ============================================

-- Allow anyone to SELECT (read) technologies
CREATE POLICY "Anyone can view technologies"
  ON technologies
  FOR SELECT
  USING (true);

-- Only authenticated users can INSERT technologies
CREATE POLICY "Only authenticated users can insert technologies"
  ON technologies
  FOR INSERT
  WITH CHECK (auth.role() = 'authenticated');

-- Only authenticated users can UPDATE technologies
CREATE POLICY "Only authenticated users can update technologies"
  ON technologies
  FOR UPDATE
  USING (auth.role() = 'authenticated')
  WITH CHECK (auth.role() = 'authenticated');

-- Only authenticated users can DELETE technologies
CREATE POLICY "Only authenticated users can delete technologies"
  ON technologies
  FOR DELETE
  USING (auth.role() = 'authenticated');

-- ============================================
-- 7. RLS POLICIES FOR PROJECTS_TECHNOLOGIES
-- ============================================

-- Allow anyone to SELECT (read) project-technology links
CREATE POLICY "Anyone can view project technologies"
  ON projects_technologies
  FOR SELECT
  USING (true);

-- Only authenticated users can INSERT project-technology links
CREATE POLICY "Only authenticated users can insert project technologies"
  ON projects_technologies
  FOR INSERT
  WITH CHECK (auth.role() = 'authenticated');

-- Only authenticated users can DELETE project-technology links
CREATE POLICY "Only authenticated users can delete project technologies"
  ON projects_technologies
  FOR DELETE
  USING (auth.role() = 'authenticated');

-- ============================================
-- 8. RLS POLICIES FOR PROJECTS
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
-- 9. RLS POLICIES FOR CERTIFICATES
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
-- 10. CREATE INDEXES FOR BETTER PERFORMANCE
-- ============================================
CREATE INDEX IF NOT EXISTS idx_technologies_name ON technologies(name);
CREATE INDEX IF NOT EXISTS idx_projects_category ON projects(category);
CREATE INDEX IF NOT EXISTS idx_projects_created_at ON projects(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_projects_technologies_project ON projects_technologies(project_id);
CREATE INDEX IF NOT EXISTS idx_projects_technologies_tech ON projects_technologies(technology_id);
CREATE INDEX IF NOT EXISTS idx_certificates_created_at ON certificates(created_at DESC);

