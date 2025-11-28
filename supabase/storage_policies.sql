-- ============================================
-- SUPABASE STORAGE POLICIES
-- ============================================
-- Run this SQL in your Supabase SQL Editor
-- This sets up storage policies for all buckets
-- ============================================

-- ============================================
-- STORAGE POLICIES FOR PROJECTS BUCKET
-- ============================================

-- Drop existing policies if they exist
DROP POLICY IF EXISTS "Authenticated users can upload project images" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated users can update project images" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated users can delete project images" ON storage.objects;
DROP POLICY IF EXISTS "Anyone can view project images" ON storage.objects;

-- Allow authenticated users to upload files
CREATE POLICY "Authenticated users can upload project images"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (bucket_id = 'projects');

-- Allow authenticated users to update files
CREATE POLICY "Authenticated users can update project images"
ON storage.objects FOR UPDATE
TO authenticated
USING (bucket_id = 'projects');

-- Allow authenticated users to delete files
CREATE POLICY "Authenticated users can delete project images"
ON storage.objects FOR DELETE
TO authenticated
USING (bucket_id = 'projects');

-- Allow anyone to read/view files (public bucket)
CREATE POLICY "Anyone can view project images"
ON storage.objects FOR SELECT
TO public
USING (bucket_id = 'projects');

-- ============================================
-- STORAGE POLICIES FOR CERTIFICATES BUCKET
-- ============================================

-- Drop existing policies if they exist
DROP POLICY IF EXISTS "Authenticated users can upload certificate images" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated users can update certificate images" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated users can delete certificate images" ON storage.objects;
DROP POLICY IF EXISTS "Anyone can view certificate images" ON storage.objects;

-- Allow authenticated users to upload files
CREATE POLICY "Authenticated users can upload certificate images"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (bucket_id = 'certificates');

-- Allow authenticated users to update files
CREATE POLICY "Authenticated users can update certificate images"
ON storage.objects FOR UPDATE
TO authenticated
USING (bucket_id = 'certificates');

-- Allow authenticated users to delete files
CREATE POLICY "Authenticated users can delete certificate images"
ON storage.objects FOR DELETE
TO authenticated
USING (bucket_id = 'certificates');

-- Allow anyone to read/view files (public bucket)
CREATE POLICY "Anyone can view certificate images"
ON storage.objects FOR SELECT
TO public
USING (bucket_id = 'certificates');

-- ============================================
-- STORAGE POLICIES FOR TECHNOLOGIES BUCKET
-- ============================================

-- Drop existing policies if they exist
DROP POLICY IF EXISTS "Authenticated users can upload technology images" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated users can update technology images" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated users can delete technology images" ON storage.objects;
DROP POLICY IF EXISTS "Anyone can view technology images" ON storage.objects;

-- Allow authenticated users to upload files
CREATE POLICY "Authenticated users can upload technology images"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (bucket_id = 'technologies');

-- Allow authenticated users to update files
CREATE POLICY "Authenticated users can update technology images"
ON storage.objects FOR UPDATE
TO authenticated
USING (bucket_id = 'technologies');

-- Allow authenticated users to delete files
CREATE POLICY "Authenticated users can delete technology images"
ON storage.objects FOR DELETE
TO authenticated
USING (bucket_id = 'technologies');

-- Allow anyone to read/view files (public bucket)
CREATE POLICY "Anyone can view technology images"
ON storage.objects FOR SELECT
TO public
USING (bucket_id = 'technologies');

