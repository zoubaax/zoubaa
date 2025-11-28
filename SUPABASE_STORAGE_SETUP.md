# Supabase Storage Setup Guide

This guide will help you set up Supabase Storage buckets for projects and certificates images.

## Step 1: Create Storage Buckets

1. Go to your Supabase project dashboard
2. Navigate to **Storage** in the left sidebar
3. Click **"New bucket"** or **"Create bucket"**

### Create Projects Bucket

1. **Bucket name**: `projects`
2. **Public bucket**: ✅ Check this (so images can be accessed publicly)
3. Click **"Create bucket"**

### Create Certificates Bucket

1. **Bucket name**: `certificates`
2. **Public bucket**: ✅ Check this (so images can be accessed publicly)
3. Click **"Create bucket"**

### Create Technologies Bucket

1. **Bucket name**: `technologies`
2. **Public bucket**: ✅ Check this (so images can be accessed publicly)
3. Click **"Create bucket"**

## Step 2: Set Up Storage Policies

After creating the buckets, you need to set up policies to allow:
- Authenticated users to upload files
- Anyone to read/view files (since buckets are public)

### For Projects Bucket

1. Go to **Storage** → **Policies** → Select `projects` bucket
2. Click **"New Policy"** or use the SQL Editor

Run this SQL in the SQL Editor:

```sql
-- Allow authenticated users to upload files
CREATE POLICY "Authenticated users can upload project images"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (bucket_id = 'projects');

-- Allow authenticated users to update their files
CREATE POLICY "Authenticated users can update project images"
ON storage.objects FOR UPDATE
TO authenticated
USING (bucket_id = 'projects');

-- Allow authenticated users to delete their files
CREATE POLICY "Authenticated users can delete project images"
ON storage.objects FOR DELETE
TO authenticated
USING (bucket_id = 'projects');

-- Allow anyone to read/view files (public bucket)
CREATE POLICY "Anyone can view project images"
ON storage.objects FOR SELECT
TO public
USING (bucket_id = 'projects');
```

### For Certificates Bucket

Run the same SQL but replace `'projects'` with `'certificates'`:

```sql
-- Allow authenticated users to upload files
CREATE POLICY "Authenticated users can upload certificate images"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (bucket_id = 'certificates');

-- Allow authenticated users to update their files
CREATE POLICY "Authenticated users can update certificate images"
ON storage.objects FOR UPDATE
TO authenticated
USING (bucket_id = 'certificates');

-- Allow authenticated users to delete their files
CREATE POLICY "Authenticated users can delete certificate images"
ON storage.objects FOR DELETE
TO authenticated
USING (bucket_id = 'certificates');

-- Allow anyone to read/view files (public bucket)
CREATE POLICY "Anyone can view certificate images"
ON storage.objects FOR SELECT
TO public
USING (bucket_id = 'certificates');
```

### For Technologies Bucket

Run the same SQL but replace `'certificates'` with `'technologies'`:

```sql
-- Allow authenticated users to upload files
CREATE POLICY "Authenticated users can upload technology images"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (bucket_id = 'technologies');

-- Allow authenticated users to update their files
CREATE POLICY "Authenticated users can update technology images"
ON storage.objects FOR UPDATE
TO authenticated
USING (bucket_id = 'technologies');

-- Allow authenticated users to delete their files
CREATE POLICY "Authenticated users can delete technology images"
ON storage.objects FOR DELETE
TO authenticated
USING (bucket_id = 'technologies');

-- Allow anyone to read/view files (public bucket)
CREATE POLICY "Anyone can view technology images"
ON storage.objects FOR SELECT
TO public
USING (bucket_id = 'technologies');
```

## Step 3: Verify Setup

1. Go to **Storage** → You should see `projects`, `certificates`, and `technologies` buckets
2. All should show as **Public**
3. Try uploading a test image to verify it works

## Step 4: File Size Limits (Optional)

By default, Supabase allows files up to 50MB. If you want to limit image uploads:

1. Go to **Storage** → **Settings**
2. Set **File size limit** (e.g., 5MB for images)
3. The frontend code already validates image types

## Troubleshooting

### "Bucket not found" error
- Make sure bucket names are exactly `projects` and `certificates` (lowercase)
- Check that buckets are created and visible in Storage dashboard

### "Permission denied" error
- Verify that storage policies are set up correctly
- Make sure you're logged in as an authenticated user
- Check that the bucket is set to public

### Images not displaying
- Verify the bucket is set to **Public**
- Check that the `image_path` in the database matches the file path in storage
- Use the Supabase Storage URL format: `https://[project-id].supabase.co/storage/v1/object/public/[bucket]/[path]`

## Next Steps

After setting up storage:
1. Run the SQL schema from `supabase/schema.sql` to create tables
2. Test uploading an image through the dashboard
3. Verify images display correctly in the projects/certificates pages

