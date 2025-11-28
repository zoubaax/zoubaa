# Supabase Authentication Setup Guide

This guide will help you set up Supabase authentication for your portfolio login feature.

## Step 1: Create a Supabase Project

1. Go to [https://supabase.com](https://supabase.com)
2. Sign up or log in to your account
3. Click "New Project"
4. Fill in your project details:
   - **Name**: Choose a project name (e.g., "zoubaa-portfolio")
   - **Database Password**: Create a strong password (save it securely)
   - **Region**: Choose the region closest to you
5. Click "Create new project" and wait for it to be set up (takes 1-2 minutes)

## Step 2: Get Your API Credentials

1. In your Supabase project dashboard, go to **Settings** → **API**
2. You'll find two important values:
   - **Project URL** (under "Project URL")
   - **anon/public key** (under "Project API keys" → "anon public")

## Step 3: Configure Environment Variables

1. In your project root directory, create a `.env` file (copy from `.env.example`)
2. Add your Supabase credentials:

```env
VITE_SUPABASE_URL=https://your-project-id.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key-here
```

Replace:
- `your-project-id` with your actual Supabase project ID
- `your-anon-key-here` with your actual anon key

**Important**: Never commit your `.env` file to version control. It should already be in `.gitignore`.

## Step 4: Create Your User Account

Since you want only yourself to be able to log in (no public signup), you'll need to create your user account manually:

### Option A: Using Supabase Dashboard (Recommended)

1. Go to **Authentication** → **Users** in your Supabase dashboard
2. Click **"Add user"** → **"Create new user"**
3. Enter your email and password
4. Click **"Create user"**
5. **Important**: Make sure to verify the email if email confirmation is enabled

### Option B: Using Supabase SQL Editor

1. Go to **SQL Editor** in your Supabase dashboard
2. Run this SQL command (replace with your email and password):

```sql
-- Create a user (you'll need to set a password manually through the dashboard or use auth.users table)
-- Note: It's better to use the dashboard method above
```

### Option C: Temporarily Enable Sign Up (One-time)

1. Go to **Authentication** → **Settings** in your Supabase dashboard
2. Temporarily enable **"Enable email signup"**
3. Sign up once through your app at `/zoubaa/login` (you'll need to add a signup form temporarily, or use the Supabase dashboard)
4. **Immediately disable** "Enable email signup" after creating your account

## Step 5: Disable Public Signup

1. Go to **Authentication** → **Settings** in your Supabase dashboard
2. Under **"Auth Providers"**, make sure:
   - **"Enable email signup"** is **DISABLED** (unchecked)
   - This ensures only existing users (you) can log in

## Step 6: Configure Email Settings (Optional but Recommended)

1. Go to **Authentication** → **Settings** → **Email Templates**
2. You can customize email templates if needed
3. For development, Supabase provides a test email service
4. For production, configure SMTP settings under **Settings** → **Auth** → **SMTP Settings**

## Step 7: Test Your Setup

1. Start your development server:
   ```bash
   npm run dev
   ```

2. Navigate to `http://localhost:5173/zoubaa/login`
3. Try logging in with the credentials you created
4. You should be redirected to `/zoubaa/dashboard` upon successful login

## Troubleshooting

### "Invalid login credentials"
- Make sure you've created a user account in Supabase
- Verify your email and password are correct
- Check if email confirmation is required (disable it for testing if needed)

### "Missing Supabase environment variables"
- Make sure your `.env` file exists in the project root
- Verify the variable names are exactly: `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY`
- Restart your development server after creating/modifying `.env`

### "User not found" or "Email not confirmed"
- Go to **Authentication** → **Users** in Supabase dashboard
- Find your user and manually confirm the email if needed
- Or disable email confirmation in **Authentication** → **Settings**

## Security Notes

- The `anon` key is safe to use in client-side code (it's public by design)
- Row Level Security (RLS) policies are not needed for basic auth, but you can add them for additional security
- Never expose your `service_role` key (it has admin privileges)
- Keep your database password secure

## Next Steps

Once authentication is working:
- Customize the dashboard with your private content
- Add more features to the protected dashboard route
- Consider adding password reset functionality if needed

