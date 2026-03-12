-- ============================================
-- CV STORAGE CONFIGURATION
-- ============================================

-- Create CV bucket if it doesn't exist
INSERT INTO storage.buckets (id, name, public) VALUES ('cv', 'cv', true)
ON CONFLICT (id) DO NOTHING;

-- Policies for CV bucket
-- Drop existing policies if they exist
DROP POLICY IF EXISTS "Authenticated users can upload CV" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated users can update CV" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated users can delete CV" ON storage.objects;
DROP POLICY IF EXISTS "Anyone can view CV" ON storage.objects;

-- Allow authenticated users to upload files
CREATE POLICY "Authenticated users can upload CV"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (bucket_id = 'cv');

-- Allow authenticated users to update files
CREATE POLICY "Authenticated users can update CV"
ON storage.objects FOR UPDATE
TO authenticated
USING (bucket_id = 'cv');

-- Allow authenticated users to delete files
CREATE POLICY "Authenticated users can delete CV"
ON storage.objects FOR DELETE
TO authenticated
USING (bucket_id = 'cv');

-- Allow anyone to read/view files (public bucket)
CREATE POLICY "Anyone can view CV"
ON storage.objects FOR SELECT
TO public
USING (bucket_id = 'cv');
