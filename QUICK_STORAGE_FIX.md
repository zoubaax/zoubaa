# Quick Fix: Storage Buckets Not Found

## The Problem
You're getting `Bucket not found` error because the storage buckets haven't been created in Supabase yet.

## Quick Solution (5 minutes)

### Step 1: Create the Buckets

1. **Go to your Supabase Dashboard**
   - Visit: https://app.supabase.com
   - Select your project

2. **Navigate to Storage**
   - Click **"Storage"** in the left sidebar
   - Click **"New bucket"** button (top right)

3. **Create `projects` bucket:**
   - **Name**: `projects` (exactly lowercase, no spaces)
   - **Public bucket**: ✅ **CHECK THIS BOX** (very important!)
   - Click **"Create bucket"**

4. **Create `certificates` bucket:**
   - Click **"New bucket"** again
   - **Name**: `certificates` (exactly lowercase, no spaces)
   - **Public bucket**: ✅ **CHECK THIS BOX** (very important!)
   - Click **"Create bucket"**

### Step 2: Set Up Storage Policies

1. **Go to SQL Editor** in Supabase dashboard
2. **Copy and paste this SQL** and click "Run":

```sql
-- ============================================
-- STORAGE POLICIES FOR PROJECTS BUCKET
-- ============================================

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
```

### Step 3: Verify

1. Go back to **Storage** → You should see both buckets listed
2. Both should show **"Public"** badge
3. Refresh your app and try uploading again

## Common Mistakes to Avoid

❌ **Wrong bucket names**: Must be exactly `projects` and `certificates` (lowercase)
❌ **Not making buckets public**: Must check "Public bucket" checkbox
❌ **Forgetting policies**: Must run the SQL policies above
❌ **Not logged in**: Make sure you're logged in to the dashboard when uploading

## Still Having Issues?

1. **Check bucket names** - Go to Storage and verify they're exactly:
   - `projects` (not `Projects` or `project`)
   - `certificates` (not `Certificates` or `certificate`)

2. **Check if buckets are public**:
   - Go to Storage
   - Click on each bucket
   - Look for "Public" badge or toggle

3. **Verify you're logged in**:
   - Make sure you're authenticated in your app
   - Check the browser console for auth errors

4. **Check browser console** for more detailed error messages

## After Setup

Once buckets are created:
- ✅ You can upload images from the dashboard
- ✅ Images will display in your portfolio
- ✅ No more "Bucket not found" errors!

