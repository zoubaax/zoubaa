import { useState } from 'react'
import { Outlet, useNavigate, useLocation } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext'
import { useTheme } from '../../contexts/ThemeContext'
import Sidebar from './Sidebar'
import { Menu, X, LogOut, Home, Sun, Moon } from 'lucide-react'
import TargetCursor from '../../hooks/TargetCursor'

function DashboardLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const { signOut, user } = useAuth()
  const { isDarkMode, toggleTheme } = useTheme()
  const navigate = useNavigate()
  const location = useLocation()

  const handleSignOut = async () => {
    const { error } = await signOut()
    if (!error) {
      navigate('/login')
    }
  }

  return (
    <div className="relative min-h-screen">
      <TargetCursor
        spinDuration={2}
        hideDefaultCursor={true}
      />
      
      <div className={`flex h-screen overflow-hidden transition-colors duration-300 ${
        isDarkMode 
          ? 'bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900' 
          : 'bg-gradient-to-br from-gray-50 via-white to-gray-100'
      }`}>
        {/* Sidebar - Desktop */}
        <aside className="hidden lg:flex lg:flex-shrink-0">
          <Sidebar 
            currentPath={location.pathname}
            onNavigate={(path) => navigate(path)}
            onSignOut={handleSignOut}
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
                onSignOut={handleSignOut}
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
          <header className={`backdrop-blur-lg border-b px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between transition-colors duration-300 ${
            isDarkMode 
              ? 'bg-white/5 border-white/10' 
              : 'bg-white/80 border-gray-200 shadow-sm'
          }`}>
            <div className="flex items-center gap-4">
              {/* Mobile Menu Button */}
              <button
                onClick={() => setSidebarOpen(true)}
                className={`cursor-target lg:hidden p-2 rounded-lg hover:bg-opacity-10 transition-all ${
                  isDarkMode 
                    ? 'text-white hover:bg-white' 
                    : 'text-gray-700 hover:bg-gray-200'
                }`}
                aria-label="Open menu"
              >
                <Menu className="w-6 h-6" />
              </button>

              <div>
                <h1 className={`text-xl font-bold transition-colors duration-300 ${
                  isDarkMode ? 'text-white' : 'text-gray-900'
                }`}>
                  {location.pathname === '/dashboard' && 'Dashboard'}
                  {location.pathname === '/dashboard/certificates' && 'Certificates'}
                  {location.pathname === '/dashboard/projects' && 'Projects'}
                  {location.pathname === '/dashboard/technologies' && 'Technologies'}
                </h1>
                <p className={`text-sm transition-colors duration-300 ${
                  isDarkMode ? 'text-gray-400' : 'text-gray-600'
                }`}>
                  {user?.email}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              {/* Theme Toggle */}
              <button
                onClick={toggleTheme}
                className={`cursor-target p-2 rounded-lg transition-all duration-300 hover:scale-110 ${
                  isDarkMode
                    ? 'bg-white/10 hover:bg-white/20 text-white border border-white/20'
                    : 'bg-gray-100 hover:bg-gray-200 text-gray-700 border border-gray-300'
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
                className={`cursor-target hidden sm:flex items-center gap-2 px-4 py-2 rounded-lg border transition-all ${
                  isDarkMode
                    ? 'bg-blue-600/20 hover:bg-blue-600/30 text-blue-300 border-blue-500/30'
                    : 'bg-blue-50 hover:bg-blue-100 text-blue-700 border-blue-200'
                }`}
              >
                <Home className="w-4 h-4" />
                <span className="text-sm font-medium">Portfolio</span>
              </button>
              
              <button
                onClick={handleSignOut}
                className={`cursor-target flex items-center gap-2 px-4 py-2 rounded-lg border transition-all ${
                  isDarkMode
                    ? 'bg-red-600/20 hover:bg-red-600/30 text-red-300 border-red-500/30'
                    : 'bg-red-50 hover:bg-red-100 text-red-700 border-red-200'
                }`}
              >
                <LogOut className="w-4 h-4" />
                <span className="hidden sm:inline text-sm font-medium">Sign Out</span>
              </button>
            </div>
          </header>

          {/* Page Content */}
          <main className={`flex-1 overflow-y-auto transition-colors duration-300 ${
            isDarkMode ? '' : 'bg-gray-50'
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

