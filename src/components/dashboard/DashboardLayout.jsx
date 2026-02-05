import { useState } from 'react'
import { Outlet, useNavigate, useLocation } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext'
import { useTheme } from '../../contexts/ThemeContext'
import Sidebar from './Sidebar'
import { Menu, X, LogOut, Home, Sun, Moon } from 'lucide-react'


function DashboardLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false)
  const { signOut, user } = useAuth()
  const { isDarkMode, toggleTheme } = useTheme()
  const navigate = useNavigate()
  const location = useLocation()

  const handleSignOutClick = () => {
    setShowLogoutConfirm(true)
  }

  const handleConfirmSignOut = async () => {
    setShowLogoutConfirm(false)

    try {
      const { error } = await signOut()

      // Navigate to login regardless of error
      navigate('/login', { replace: true })

      // Only show error if it's a critical error (not network/session issues)
      if (error && !error.message?.includes('session') && !error.message?.includes('network')) {
        console.error('Logout error:', error)
        // Don't block navigation, just log the error
      }
    } catch (err) {
      console.error('Logout exception:', err)
      // Still navigate even on exception
      navigate('/login', { replace: true })
    }
  }

  const handleCancelSignOut = () => {
    setShowLogoutConfirm(false)
  }

  return (
    <div className="relative min-h-screen">

      {/* Logout Confirmation Pop-up */}
      {showLogoutConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={handleCancelSignOut}
          />
          <div className={`relative z-10 w-full max-w-md rounded-2xl p-6 shadow-2xl border transition-colors duration-300 ${isDarkMode
              ? 'bg-[#0A1A4D] border-cyan-500/30'
              : 'bg-white border-blue-200'
            }`}>
            <div className="text-center">
              <div className={`mx-auto flex items-center justify-center h-12 w-12 rounded-full ${isDarkMode ? 'bg-red-500/20' : 'bg-red-100'
                }`}>
                <LogOut className={`h-6 w-6 ${isDarkMode ? 'text-red-400' : 'text-red-600'}`} />
              </div>
              <h3 className={`mt-4 text-lg font-semibold transition-colors duration-300 ${isDarkMode ? 'text-white' : 'text-gray-900'
                }`}>
                Sign Out
              </h3>
              <p className={`mt-2 text-sm transition-colors duration-300 ${isDarkMode ? 'text-cyan-200' : 'text-gray-600'
                }`}>
                Are you sure you want to sign out?
              </p>
            </div>
            <div className="mt-6 flex gap-3">
              <button
                onClick={handleCancelSignOut}
                className={`cursor-target flex-1 py-2 px-4 rounded-lg border transition-all duration-300 hover:scale-105 ${isDarkMode
                    ? 'bg-gray-600/20 hover:bg-gray-600/30 text-gray-300 border-gray-500/30'
                    : 'bg-gray-100 hover:bg-gray-200 text-gray-700 border-gray-300'
                  }`}
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmSignOut}
                className={`cursor-target flex-1 py-2 px-4 rounded-lg border transition-all duration-300 hover:scale-105 ${isDarkMode
                    ? 'bg-red-500/20 hover:bg-red-500/30 text-red-400 border-red-400/30'
                    : 'bg-red-500/20 hover:bg-red-500/30 text-red-700 border-red-400/30'
                  }`}
              >
                Sign Out
              </button>
            </div>
          </div>
        </div>
      )}

      <div className={`flex h-screen overflow-hidden transition-colors duration-300 ${isDarkMode
          ? 'bg-[#050A30]'
          : 'bg-[#eff9ff]'
        }`}>
        {/* Sidebar - Desktop */}
        <aside className="hidden lg:flex lg:flex-shrink-0">
          <Sidebar
            currentPath={location.pathname}
            onNavigate={(path) => navigate(path)}
            onSignOut={handleSignOutClick}
            user={user}
            isDarkMode={isDarkMode}
          />
        </aside>

        {/* Mobile Sidebar Overlay */}
        {sidebarOpen && (
          <div className="fixed inset-0 z-40 lg:hidden">
            <div
              className="fixed inset-0 bg-black/50 backdrop-blur-sm"
              onClick={() => setSidebarOpen(false)}
            />
            <aside className="fixed inset-y-0 left-0 z-50 w-64">
              <Sidebar
                currentPath={location.pathname}
                onNavigate={(path) => {
                  navigate(path)
                  setSidebarOpen(false)
                }}
                onSignOut={handleSignOutClick}
                user={user}
                isMobile={true}
                onClose={() => setSidebarOpen(false)}
                isDarkMode={isDarkMode}
              />
            </aside>
          </div>
        )}

        {/* Main Content Area */}
        <div className="flex flex-col flex-1 overflow-hidden">
          {/* Top Header Bar */}
          <header className={`backdrop-blur-lg border-b px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between transition-colors duration-300 ${isDarkMode
              ? 'bg-[#050A30] border-blue-500/30'
              : 'bg-white/80 border-blue-200 shadow-sm'
            }`}>
            <div className="flex items-center gap-4">
              {/* Mobile Menu Button */}
              <button
                onClick={() => setSidebarOpen(true)}
                className={`cursor-target lg:hidden p-2 rounded-lg transition-all duration-300 hover:scale-110 ${isDarkMode
                    ? 'text-cyan-400 hover:bg-cyan-500/20 border border-cyan-400/30'
                    : 'text-blue-600 hover:bg-blue-500/20 border border-blue-400/30'
                  }`}
                aria-label="Open menu"
              >
                <Menu className="w-6 h-6" />
              </button>

              <div>
                <h1 className={`text-xl font-bold transition-colors duration-300 ${isDarkMode ? 'text-white' : 'text-gray-900'
                  }`}>
                  {location.pathname === '/dashboard' && 'Dashboard'}
                  {location.pathname === '/dashboard/certificates' && 'Certificates'}
                  {location.pathname === '/dashboard/projects' && 'Projects'}
                  {location.pathname === '/dashboard/technologies' && 'Technologies'}
                </h1>
                <p className={`text-sm transition-colors duration-300 ${isDarkMode ? 'text-cyan-300' : 'text-blue-600'
                  }`}>
                  {user?.email}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              {/* Theme Toggle */}
              <button
                onClick={toggleTheme}
                className={`cursor-target p-2 rounded-lg transition-all duration-300 hover:scale-110 ${isDarkMode
                    ? 'bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-400 border border-cyan-400/30'
                    : 'bg-blue-500/20 hover:bg-blue-500/30 text-blue-600 border border-blue-400/30'
                  }`}
                aria-label="Toggle theme"
                title={isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
              >
                {isDarkMode ? (
                  <Sun className="w-5 h-5" />
                ) : (
                  <Moon className="w-5 h-5" />
                )}
              </button>

              <button
                onClick={() => navigate('/')}
                className={`cursor-target hidden sm:flex items-center gap-2 px-4 py-2 rounded-lg border transition-all duration-300 hover:scale-105 ${isDarkMode
                    ? 'bg-gradient-to-r from-cyan-500/20 to-blue-500/20 hover:from-cyan-500/30 hover:to-blue-500/30 text-cyan-400 border-cyan-400/30'
                    : 'bg-gradient-to-r from-blue-500/20 to-cyan-500/20 hover:from-blue-500/30 hover:to-cyan-500/30 text-blue-600 border-blue-400/30'
                  }`}
              >
                <Home className="w-4 h-4" />
                <span className="text-sm font-medium">Portfolio</span>
              </button>

              <button
                onClick={handleSignOutClick}
                className={`cursor-target flex items-center gap-2 px-4 py-2 rounded-lg border transition-all duration-300 hover:scale-105 ${isDarkMode
                    ? 'bg-red-500/20 hover:bg-red-500/30 text-red-400 border-red-400/30'
                    : 'bg-red-500/20 hover:bg-red-500/30 text-red-700 border-red-400/30'
                  }`}
              >
                <LogOut className="w-4 h-4" />
                <span className="hidden sm:inline text-sm font-medium">Sign Out</span>
              </button>
            </div>
          </header>

          {/* Page Content */}
          <main className={`flex-1 overflow-y-auto transition-colors duration-300 ${isDarkMode ? 'bg-[#050A30]' : 'bg-[#eff9ff]'
            }`}>
            <div className="h-full">
              <Outlet />
            </div>
          </main>
        </div>
      </div>
    </div>
  )
}

export default DashboardLayout