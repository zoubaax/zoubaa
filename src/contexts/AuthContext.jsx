import { createContext, useContext, useEffect, useState } from 'react'
import { supabase } from '../lib/supabase'

const AuthContext = createContext({})

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [session, setSession] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Get initial session
    supabase.auth.getSession()
      .then(({ data: { session } }) => {
        setSession(session)
        setUser(session?.user ?? null)
        setLoading(false)
      })
      .catch((error) => {
        console.warn('Failed to get Supabase session:', error)
        setSession(null)
        setUser(null)
        setLoading(false)
      })

    // Listen for auth changes
    let subscription
    try {
      const {
        data: { subscription: sub },
      } = supabase.auth.onAuthStateChange((_event, session) => {
        setSession(session)
        setUser(session?.user ?? null)
        setLoading(false)
      })
      subscription = sub
    } catch (error) {
      console.warn('Failed to set up auth state listener:', error)
      setLoading(false)
    }

    return () => {
      if (subscription) {
        subscription.unsubscribe()
      }
    }
  }, [])

  const signIn = async (email, password) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })
    return { data, error }
  }

  const signOut = async () => {
    try {
      // Try to sign out from Supabase
      // Use scope: 'local' to sign out from this device only
      // Use scope: 'global' to sign out from all devices
      const { error } = await supabase.auth.signOut({ scope: 'local' })
      
      // Always clear local state regardless of error
      // This ensures the UI updates even if there's a network issue
      setUser(null)
      setSession(null)
      
      if (error) {
        console.error('Sign out error:', error)
        // If it's a network error or session already invalid, we still consider it successful
        // since we've cleared the local state
        if (error.message?.includes('session') || error.message?.includes('network')) {
          console.warn('Sign out had minor error but state cleared:', error.message)
          return { error: null }
        }
        return { error }
      }
      
      return { error: null }
    } catch (err) {
      console.error('Sign out exception:', err)
      // Even on exception, clear local state
      setUser(null)
      setSession(null)
      // If it's just a network issue, we can still proceed
      if (err.message?.includes('network') || err.message?.includes('fetch')) {
        return { error: null }
      }
      return { error: err }
    }
  }

  const value = {
    user,
    session,
    loading,
    signIn,
    signOut,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

