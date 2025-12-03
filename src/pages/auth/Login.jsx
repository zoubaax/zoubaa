import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext'
import { Mail, Lock, LogIn } from 'lucide-react'
import TargetCursor from '../../hooks/TargetCursor'
import logoLight from "../../assets/img/1.png"
import logoDark from "../../assets/img/2.png"

function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const { signIn, user } = useAuth()
  const navigate = useNavigate()
  const [darkMode] = useState(false)

  useEffect(() => {
    if (user) {
      navigate('/dashboard')
    }
  }, [user, navigate])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      const { data, error: signInError } = await signIn(email, password)
      
      if (signInError) {
        // Show configuration errors more prominently
        if (signInError.name === 'ConfigurationError' || signInError.name === 'NetworkError') {
          setError(signInError.message)
        } else {
          setError(signInError.message || 'Invalid email or password')
        }
      } else if (data?.user) {
        navigate('/dashboard')
      }
    } catch (err) {
      // Handle network errors
      if (err.message?.includes('Failed to fetch') || err.message?.includes('ERR_NAME_NOT_RESOLVED')) {
        setError('Cannot connect to Supabase. Please check your .env file configuration. See ENV_SETUP.md for setup instructions.')
      } else {
        setError('An unexpected error occurred. Please try again.')
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="relative">
      <div className={`min-h-screen py-20 px-4 sm:px-6 font-sans antialiased ${darkMode ? 'bg-[#050A30]' : 'bg-[#eff9ff]'}`}>
        <TargetCursor
          spinDuration={2}
          hideDefaultCursor={true}
        />

        <div className="max-w-md mx-auto">
          {/* Logo */}
          <div className="text-center mb-12">
            <div className="cursor-target flex justify-center mb-8">
              <img 
                src={darkMode ? logoDark : logoLight} 
                alt="Logo"
                className="h-16 object-contain"
              />
            </div>
            
            <div className="cursor-target inline-flex items-center gap-4 mb-6">
              <div className={`w-12 h-0.5 bg-gradient-to-r ${darkMode ? 'from-cyan-400 to-blue-500' : 'from-blue-500 to-cyan-500'}`}></div>
              <span className={`text-sm font-semibold tracking-widest uppercase ${darkMode ? 'text-cyan-400' : 'text-blue-600'}`}>
                Secure Login
              </span>
              <div className={`w-12 h-0.5 bg-gradient-to-r ${darkMode ? 'from-blue-500 to-cyan-400' : 'from-cyan-500 to-blue-500'}`}></div>
            </div>

            <h2 className={`text-3xl font-bold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
              Welcome Back
            </h2>
          </div>

          {/* Login Form */}
          <div className={`cursor-target p-8 rounded-3xl border-2 backdrop-blur-sm transition-all duration-500 ${
            darkMode 
              ? 'bg-[#050A30] border-blue-500/30 hover:border-cyan-400/50 hover:shadow-2xl hover:shadow-cyan-500/10' 
              : 'bg-white border-blue-200 hover:border-blue-400 hover:shadow-2xl hover:shadow-blue-500/5'
          }`}>
            <form onSubmit={handleSubmit} className="space-y-6">
              {error && (
                <div className={`bg-red-500/20 border border-red-500/50 px-4 py-3 rounded-xl text-sm ${
                  darkMode ? 'text-red-200' : 'text-red-700 bg-red-50 border-red-200'
                }`}>
                  {error}
                </div>
              )}

              {/* Email Field */}
              <div className="space-y-2">
                <label className={`flex items-center gap-2 text-sm font-semibold ${darkMode ? 'text-cyan-400' : 'text-blue-600'}`}>
                  <Mail className="w-4 h-4" />
                  Email Address
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={`cursor-target w-full px-4 py-3 rounded-xl border-2 transition-all duration-300 focus:scale-[1.02] focus:outline-none ${
                    darkMode
                      ? 'bg-[#050A30] border-blue-500/30 text-white placeholder-gray-400 focus:border-cyan-400 focus:shadow-lg focus:shadow-cyan-500/20'
                      : 'bg-white border-blue-200 text-gray-900 placeholder-gray-500 focus:border-blue-400 focus:shadow-lg focus:shadow-blue-500/10'
                  }`}
                  placeholder="Enter your email"
                />
              </div>

              {/* Password Field */}
              <div className="space-y-2">
                <label className={`flex items-center gap-2 text-sm font-semibold ${darkMode ? 'text-cyan-400' : 'text-blue-600'}`}>
                  <Lock className="w-4 h-4" />
                  Password
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className={`cursor-target w-full px-4 py-3 rounded-xl border-2 transition-all duration-300 focus:scale-[1.02] focus:outline-none ${
                    darkMode
                      ? 'bg-[#050A30] border-blue-500/30 text-white placeholder-gray-400 focus:border-cyan-400 focus:shadow-lg focus:shadow-cyan-500/20'
                      : 'bg-white border-blue-200 text-gray-900 placeholder-gray-500 focus:border-blue-400 focus:shadow-lg focus:shadow-blue-500/10'
                  }`}
                  placeholder="Enter your password"
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className={`cursor-target w-full flex items-center justify-center gap-3 px-8 py-4 rounded-xl font-semibold transition-all duration-500 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed ${
                  darkMode
                    ? 'bg-gradient-to-r from-cyan-500 to-blue-500 text-white hover:shadow-2xl hover:shadow-cyan-500/25'
                    : 'bg-gradient-to-r from-blue-500 to-cyan-500 text-white hover:shadow-2xl hover:shadow-blue-500/25'
                }`}
              >
                {loading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Signing In...
                  </>
                ) : (
                  <>
                    <LogIn className="w-5 h-5" />
                    Sign In
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login

