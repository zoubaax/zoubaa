-- ============================================
-- MIGRATION SQL FOR EXISTING DATABASES
-- ============================================
-- Run this if you already have projects and certificates tables
-- This will add the technologies table and update projects table
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
-- 2. CREATE PROJECTS_TECHNOLOGIES JUNCTION TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS projects_technologies (
  project_id UUID NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
  technology_id UUID NOT NULL REFERENCES technologies(id) ON DELETE CASCADE,
  PRIMARY KEY (project_id, technology_id)
);

-- ============================================
-- 3. ADD GITHUB_URL TO PROJECTS TABLE
-- ============================================
-- Only add if column doesn't exist
DO $$ 
BEGIN
  -- GitHub URL
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'projects' AND column_name = 'github_url'
  ) THEN
    ALTER TABLE projects ADD COLUMN github_url TEXT;
  END IF;

  -- Live project URL
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'projects' AND column_name = 'live_url'
  ) THEN
    ALTER TABLE projects ADD COLUMN live_url TEXT;
  END IF;

  -- Optional gallery of additional image paths
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'projects' AND column_name = 'gallery_paths'
  ) THEN
    ALTER TABLE projects ADD COLUMN gallery_paths TEXT[];
  END IF;

  -- Optional extended metadata for project details page
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'projects' AND column_name = 'tagline'
  ) THEN
    ALTER TABLE projects ADD COLUMN tagline TEXT;
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'projects' AND column_name = 'features'
  ) THEN
    ALTER TABLE projects ADD COLUMN features TEXT[];
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'projects' AND column_name = 'duration'
  ) THEN
    ALTER TABLE projects ADD COLUMN duration TEXT;
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'projects' AND column_name = 'team_size'
  ) THEN
    ALTER TABLE projects ADD COLUMN team_size TEXT;
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'projects' AND column_name = 'role'
  ) THEN
    ALTER TABLE projects ADD COLUMN role TEXT;
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'projects' AND column_name = 'challenges'
  ) THEN
    ALTER TABLE projects ADD COLUMN challenges TEXT;
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'projects' AND column_name = 'solutions'
  ) THEN
    ALTER TABLE projects ADD COLUMN solutions TEXT;
  END IF;
END $$;

-- ============================================
-- 4. REMOVE OLD TECHNOLOGIES ARRAY COLUMN (OPTIONAL)
-- ============================================
-- Uncomment the line below if you want to remove the old TEXT[] technologies column
-- ALTER TABLE projects DROP COLUMN IF EXISTS technologies;

-- ============================================
-- 5. ENABLE RLS FOR NEW TABLES
-- ============================================
ALTER TABLE technologies ENABLE ROW LEVEL SECURITY;
ALTER TABLE projects_technologies ENABLE ROW LEVEL SECURITY;

-- ============================================
-- 6. RLS POLICIES FOR TECHNOLOGIES
-- ============================================

-- Drop existing policies if they exist, then create new ones
DROP POLICY IF EXISTS "Anyone can view technologies" ON technologies;
DROP POLICY IF EXISTS "Only authenticated users can insert technologies" ON technologies;
DROP POLICY IF EXISTS "Only authenticated users can update technologies" ON technologies;
DROP POLICY IF EXISTS "Only authenticated users can delete technologies" ON technologies;

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

-- Drop existing policies if they exist, then create new ones
DROP POLICY IF EXISTS "Anyone can view project technologies" ON projects_technologies;
DROP POLICY IF EXISTS "Only authenticated users can insert project technologies" ON projects_technologies;
DROP POLICY IF EXISTS "Only authenticated users can delete project technologies" ON projects_technologies;

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
-- 8. CREATE INDEXES
-- ============================================
CREATE INDEX IF NOT EXISTS idx_technologies_name ON technologies(name);
CREATE INDEX IF NOT EXISTS idx_projects_technologies_project ON projects_technologies(project_id);
CREATE INDEX IF NOT EXISTS idx_projects_technologies_tech ON projects_technologies(technology_id);

