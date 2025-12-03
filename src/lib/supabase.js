import { createClient } from '@supabase/supabase-js'

// Replace these with your Supabase project credentials
// You can find these in your Supabase project settings > API
// Note: VITE_ prefixed variables are exposed to client-side code in Vite
// This is expected - the anon key is meant to be public (it's protected by Row Level Security)
// Never log or expose these values in console or error messages
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

// Check if Supabase is properly configured
export const isSupabaseConfigured = !!(supabaseUrl && supabaseAnonKey && 
  supabaseUrl !== 'https://placeholder.supabase.co' && 
  supabaseAnonKey !== 'placeholder-key' &&
  supabaseUrl.startsWith('http') &&
  supabaseAnonKey.length > 10)

// Create a dummy client if env vars are missing (for production builds without Supabase)
let supabase
if (!isSupabaseConfigured) {
  // Only log warning in development, and never expose actual values
  if (import.meta.env.DEV) {
    console.warn('⚠️ Supabase environment variables not found or invalid. Some features may not work.')
    console.warn('Please check your .env file has the required variables. See ENV_SETUP.md for instructions.')
  }
  // Create a dummy client that will fail gracefully
  supabase = createClient('https://placeholder.supabase.co', 'placeholder-key')
} else {
  supabase = createClient(supabaseUrl, supabaseAnonKey)
}

export { supabase }

