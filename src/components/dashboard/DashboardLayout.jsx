import { useState } from 'react'
import { Outlet, useNavigate, useLocation } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext'
import Sidebar from './Sidebar'
import { Menu, X, LogOut, Home } from 'lucide-react'
import TargetCursor from '../../hooks/TargetCursor'

function DashboardLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const { signOut, user } = useAuth()
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
      
      <div className="flex h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 overflow-hidden">
        {/* Sidebar - Desktop */}
        <aside className="hidden lg:flex lg:flex-shrink-0">
          <Sidebar 
            currentPath={location.pathname}
            onNavigate={(path) => navigate(path)}
            onSignOut={handleSignOut}
            user={user}
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
              />
            </aside>
          </div>
        )}

        {/* Main Content Area */}
        <div className="flex flex-col flex-1 overflow-hidden">
          {/* Top Header Bar */}
          <header className="bg-white/5 backdrop-blur-lg border-b border-white/10 px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
            <div className="flex items-center gap-4">
              {/* Mobile Menu Button */}
              <button
                onClick={() => setSidebarOpen(true)}
                className="cursor-target lg:hidden p-2 rounded-lg text-white hover:bg-white/10 transition-all"
                aria-label="Open menu"
              >
                <Menu className="w-6 h-6" />
              </button>

              <div>
                <h1 className="text-xl font-bold text-white">
                  {location.pathname === '/dashboard' && 'Dashboard'}
                  {location.pathname === '/dashboard/certificates' && 'Certificates'}
                  {location.pathname === '/dashboard/projects' && 'Projects'}
                  {location.pathname === '/dashboard/technologies' && 'Technologies'}
                </h1>
                <p className="text-sm text-gray-400">
                  {user?.email}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => navigate('/')}
                className="cursor-target hidden sm:flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-600/20 hover:bg-blue-600/30 text-blue-300 border border-blue-500/30 transition-all"
              >
                <Home className="w-4 h-4" />
                <span className="text-sm font-medium">Portfolio</span>
              </button>
              
              <button
                onClick={handleSignOut}
                className="cursor-target flex items-center gap-2 px-4 py-2 rounded-lg bg-red-600/20 hover:bg-red-600/30 text-red-300 border border-red-500/30 transition-all"
              >
                <LogOut className="w-4 h-4" />
                <span className="hidden sm:inline text-sm font-medium">Sign Out</span>
              </button>
            </div>
          </header>

          {/* Page Content */}
          <main className="flex-1 overflow-y-auto">
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

