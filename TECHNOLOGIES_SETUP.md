# Technologies Table Setup Guide

This guide explains how to set up and use the technologies table for linking technologies to projects.

## Database Schema

The technologies table has been added to your schema with:
- `id` (UUID, primary key)
- `name` (TEXT, unique) - Name of the technology
- `image_path` (TEXT) - Path to technology image in Supabase Storage
- `created_at` (TIMESTAMP)

## Storage Bucket Setup

You need to create a `technologies` storage bucket:

1. Go to **Storage** in Supabase dashboard
2. Click **"New bucket"**
3. **Bucket name**: `technologies` (lowercase)
4. **Public bucket**: ✅ Check this
5. Click **"Create bucket"**

### Storage Policies for Technologies Bucket

Run this SQL in the SQL Editor:

```sql
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
```

## How It Works

### Database Structure

1. **technologies** table - Stores technology information
2. **projects_technologies** junction table - Links projects to technologies (many-to-many)
3. **projects** table - Now includes `github_url` field

### Creating Technologies

You can create technologies through the dashboard (you'll need to add a Technologies management page) or directly in Supabase:

1. Go to **Table Editor** → **technologies**
2. Click **"Insert"** → **"Insert row"**
3. Fill in:
   - `name`: Technology name (e.g., "React", "Node.js")
   - `image_path`: Upload image first, then paste the path

### Linking Technologies to Projects

When creating/editing a project:
1. The form will show all available technologies
2. Select technologies by clicking on them (multi-select)
3. Selected technologies will be linked to the project automatically

### Display

- **Portfolio (MySkills.jsx)**: Shows technology names with images if available
- **Dashboard Projects**: Shows technology names with images
- **GitHub links**: Displayed when `github_url` is provided

## Migration from Old System

If you had projects with technologies stored as TEXT[] array:
1. The old `technologies` column is removed from projects table
2. You'll need to:
   - Create technologies in the technologies table
   - Re-link them to projects through the dashboard

## API Functions

### Technologies Service (`src/services/technologiesService.js`)

- `getTechnologies()` - Get all technologies
- `getTechnologyById(id)` - Get single technology
- `createTechnology(technologyData, imageFile)` - Create technology
- `updateTechnology(id, technologyData, imageFile, deleteOldImage)` - Update technology
- `deleteTechnology(id)` - Delete technology

### Updated Projects Service

- `getProjects()` - Now includes linked technologies
- `createProject()` - Accepts `technologyIds` array
- `updateProject()` - Can update technology links

## Next Steps

1. Run the updated SQL schema
2. Create the `technologies` storage bucket
3. Add some technologies (you can create a Technologies management page in dashboard)
4. Link technologies to your projects

