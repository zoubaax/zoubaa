import { 
  LayoutDashboard, 
  Award, 
  FolderKanban, 
  Code,
  X,
  LogOut,
  Home
} from 'lucide-react'

function Sidebar({ currentPath, onNavigate, onSignOut, user, isMobile = false, onClose, isDarkMode = true }) {
  const navItems = [
    {
      id: 'dashboard',
      label: 'Dashboard',
      path: '/dashboard',
      icon: LayoutDashboard,
    },
    {
      id: 'projects',
      label: 'Projects',
      path: '/dashboard/projects',
      icon: FolderKanban,
    },
    {
      id: 'technologies',
      label: 'Technologies',
      path: '/dashboard/technologies',
      icon: Code,
    },
    {
      id: 'certificates',
      label: 'Certificates',
      path: '/dashboard/certificates',
      icon: Award,
    },
  ]

  const isActive = (path) => {
    if (path === '/dashboard') {
      return currentPath === '/dashboard'
    }
    return currentPath.startsWith(path)
  }

  return (
    <div className={`flex flex-col h-full w-64 backdrop-blur-lg border-r transition-colors duration-300 ${
      isDarkMode 
        ? 'bg-white/5 border-white/10' 
        : 'bg-white/90 border-gray-200 shadow-sm'
    }`}>
      {/* Sidebar Header */}
      <div className={`p-6 border-b transition-colors duration-300 ${
        isDarkMode ? 'border-white/10' : 'border-gray-200'
      }`}>
        <div className="flex items-center justify-between mb-4">
          <h2 className={`text-xl font-bold transition-colors duration-300 ${
            isDarkMode ? 'text-white' : 'text-gray-900'
          }`}>Dashboard</h2>
          {isMobile && (
            <button
              onClick={onClose}
              className={`cursor-target p-2 rounded-lg hover:bg-opacity-10 transition-all ${
                isDarkMode 
                  ? 'text-white hover:bg-white' 
                  : 'text-gray-700 hover:bg-gray-200'
              }`}
              aria-label="Close menu"
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center">
            <span className="text-white font-semibold text-sm">
              {user?.email?.charAt(0).toUpperCase() || 'U'}
            </span>
          </div>
          <div className="flex-1 min-w-0">
            <p className={`text-sm font-medium truncate transition-colors duration-300 ${
              isDarkMode ? 'text-white' : 'text-gray-900'
            }`}>
              {user?.email || 'User'}
            </p>
            <p className={`text-xs transition-colors duration-300 ${
              isDarkMode ? 'text-gray-400' : 'text-gray-600'
            }`}>Admin</p>
          </div>
        </div>
      </div>

      {/* Navigation Links */}
      <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto">
        {navItems.map((item) => {
          const Icon = item.icon
          const active = isActive(item.path)
          
          return (
            <button
              key={item.id}
              onClick={() => onNavigate(item.path)}
              className={`cursor-target w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 group ${
                active
                  ? 'bg-gradient-to-r from-blue-600 to-cyan-500 text-white shadow-lg shadow-blue-500/25'
                  : isDarkMode
                    ? 'text-gray-300 hover:bg-white/10 hover:text-white'
                    : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'
              }`}
            >
              <Icon 
                className={`w-5 h-5 transition-transform duration-300 ${
                  active ? 'scale-110' : 'group-hover:scale-110'
                }`} 
              />
              <span className="font-medium">{item.label}</span>
            </button>
          )
        })}
      </nav>

      {/* Sidebar Footer */}
      <div className="p-4 border-t border-white/10 space-y-2">
        <button
          onClick={() => onNavigate('/')}
          className={`cursor-target w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 group ${
            isDarkMode
              ? 'text-gray-300 hover:bg-white/10 hover:text-white'
              : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'
          }`}
        >
          <Home className="w-5 h-5 group-hover:scale-110 transition-transform duration-300" />
          <span className="font-medium">View Portfolio</span>
        </button>
        
        <button
          onClick={onSignOut}
          className={`cursor-target w-full flex items-center gap-3 px-4 py-3 rounded-xl border transition-all duration-300 group ${
            isDarkMode
              ? 'text-red-300 hover:bg-red-600/20 hover:text-red-200 border-red-500/30'
              : 'text-red-600 hover:bg-red-50 hover:text-red-700 border-red-300'
          }`}
        >
          <LogOut className="w-5 h-5 group-hover:scale-110 transition-transform duration-300" />
          <span className="font-medium">Sign Out</span>
        </button>
      </div>
    </div>
  )
}

export default Sidebar

