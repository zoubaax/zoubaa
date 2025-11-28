# Dashboard CRUD Setup Guide

Complete guide for setting up the Projects and Certificates dashboard with Supabase.

## 📁 Folder Structure

```
src/
├── lib/
│   ├── supabase.js          # Supabase client configuration
│   └── storage.js           # Storage utilities (upload, delete, get URL)
│
├── services/
│   ├── projectsService.js   # Projects CRUD operations
│   └── certificatesService.js # Certificates CRUD operations
│
├── components/
│   └── dashboard/
│       ├── DashboardLayout.jsx
│       ├── Sidebar.jsx
│       ├── ProtectedRoute.jsx
│       ├── ProjectForm.jsx      # Form for add/edit projects
│       └── CertificateForm.jsx  # Form for add/edit certificates
│
└── pages/
    └── dashboard/
        ├── Dashboard.jsx        # Main dashboard (shows counts)
        ├── Projects.jsx         # Projects list + CRUD
        └── Certificates.jsx     # Certificates list + CRUD

supabase/
└── schema.sql                  # Database tables and RLS policies
```

## 🚀 Setup Steps

### 1. Create Supabase Tables

1. Go to your Supabase project dashboard
2. Navigate to **SQL Editor**
3. Copy and paste the contents of `supabase/schema.sql`
4. Click **"Run"** to execute the SQL

This will create:
- `projects` table with all required fields
- `certificates` table with all required fields
- Row Level Security (RLS) policies
- Indexes for better performance

### 2. Set Up Storage Buckets

Follow the instructions in `SUPABASE_STORAGE_SETUP.md` to:
- Create `projects` and `certificates` storage buckets
- Set up storage policies for upload/delete
- Make buckets public for image viewing

### 3. Configure RLS Policies (Optional - Admin Only)

If you want to restrict CRUD operations to only your admin email:

1. Open `supabase/schema.sql`
2. Find the section marked "OPTIONAL: Restrict to specific admin email"
3. Uncomment the SQL code
4. Replace `'your-email@example.com'` with your actual email
5. Run the updated SQL in Supabase SQL Editor

### 4. Test the Setup

1. Start your development server: `npm run dev`
2. Log in to your dashboard
3. Navigate to `/dashboard/projects` or `/dashboard/certificates`
4. Try creating a new project/certificate with an image
5. Verify the image uploads and displays correctly

## 📋 API Functions

### Projects Service

Located in `src/services/projectsService.js`:

- `getProjects()` - Fetch all projects
- `getProjectById(id)` - Fetch single project
- `createProject(projectData, imageFile)` - Create new project
- `updateProject(id, projectData, imageFile, deleteOldImage)` - Update project
- `deleteProject(id)` - Delete project and its image

### Certificates Service

Located in `src/services/certificatesService.js`:

- `getCertificates()` - Fetch all certificates
- `getCertificateById(id)` - Fetch single certificate
- `createCertificate(certificateData, imageFile)` - Create new certificate
- `updateCertificate(id, certificateData, imageFile, deleteOldImage)` - Update certificate
- `deleteCertificate(id)` - Delete certificate and its image

### Storage Utilities

Located in `src/lib/storage.js`:

- `uploadImage(file, bucket, folder)` - Upload image to Supabase Storage
- `deleteImage(bucket, filePath)` - Delete image from storage
- `getImageUrl(bucket, filePath)` - Get public URL for image

## 🎨 Features

### Projects Management

- ✅ View all projects in a grid layout
- ✅ Add new projects with image upload
- ✅ Edit existing projects
- ✅ Delete projects (with image cleanup)
- ✅ Image preview before upload
- ✅ Technologies array management
- ✅ Category selection (fullstack, AI/ML, data)

### Certificates Management

- ✅ View all certificates in a grid layout
- ✅ Add new certificates with image upload
- ✅ Edit existing certificates
- ✅ Delete certificates (with image cleanup)
- ✅ Image preview before upload
- ✅ Verification URL field

### Dashboard Overview

- ✅ Real-time counts of projects and certificates
- ✅ Quick navigation to projects/certificates pages
- ✅ User information display

## 🔒 Security

- **RLS Policies**: Only authenticated users can insert/update/delete
- **Storage Policies**: Only authenticated users can upload/delete images
- **Public Read**: Anyone can view projects and certificates (for portfolio display)
- **Optional Admin Restriction**: Can restrict CRUD to specific admin email

## 📝 Database Schema

### Projects Table

```sql
- id (uuid, primary key)
- title (text, required)
- description (text, required)
- image_path (text, path in storage)
- technologies (text[] array)
- category (text: 'fullstack', 'AI/ML', 'data')
- created_at (timestamp)
```

### Certificates Table

```sql
- id (uuid, primary key)
- title (text, required)
- image_path (text, path in storage)
- show_url (text, verification URL)
- created_at (timestamp)
```

## 🐛 Troubleshooting

### Images not uploading
- Check storage bucket names match exactly: `projects` and `certificates`
- Verify storage policies are set up correctly
- Check browser console for error messages

### "Permission denied" errors
- Ensure you're logged in as an authenticated user
- Verify RLS policies are enabled and correct
- Check storage bucket policies allow authenticated uploads

### Images not displaying
- Verify buckets are set to **Public**
- Check `image_path` in database matches storage path
- Verify storage policies allow public SELECT

### Form validation errors
- Projects: Title, description, and category are required
- Certificates: Title and image are required
- Check form error messages for specific issues

## 📚 Next Steps

1. Customize the form fields if needed
2. Add more validation rules
3. Implement image optimization/resizing
4. Add bulk operations (delete multiple items)
5. Add search/filter functionality
6. Export data functionality

