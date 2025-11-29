# Environment Variables Setup

This project requires environment variables to connect to Supabase.

## Quick Setup

1. **Copy the example file:**
   ```bash
   cp .env.example .env
   ```

2. **Get your Supabase credentials:**
   - Go to [Supabase Dashboard](https://app.supabase.com)
   - Select your project
   - Go to **Settings** → **API**
   - Copy the following values:
     - **Project URL** → `VITE_SUPABASE_URL`
     - **anon/public key** → `VITE_SUPABASE_ANON_KEY`

3. **Update your `.env` file:**
   ```env
   VITE_SUPABASE_URL=https://your-project-id.supabase.co
   VITE_SUPABASE_ANON_KEY=your-anon-key-here
   ```

4. **Restart your dev server:**
   ```bash
   npm run dev
   ```

## Security Notes

- ✅ `.env` is already in `.gitignore` - your secrets are safe
- ❌ **Never commit** `.env` files to version control
- ✅ The `.env.example` file is safe to commit (no real values)
- ✅ Share `.env.example` with team members for setup

## Required Variables

| Variable | Description | Where to Find |
|----------|-------------|---------------|
| `VITE_SUPABASE_URL` | Your Supabase project URL | Supabase Dashboard → Settings → API |
| `VITE_SUPABASE_ANON_KEY` | Your Supabase anonymous key | Supabase Dashboard → Settings → API |

## Troubleshooting

If you see errors about missing environment variables:
1. Make sure you created a `.env` file (not just `.env.example`)
2. Check that variable names start with `VITE_` (required for Vite)
3. Restart your dev server after creating/updating `.env`
4. Verify your Supabase credentials are correct


