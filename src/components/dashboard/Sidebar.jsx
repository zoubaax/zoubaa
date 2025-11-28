import { 
  LayoutDashboard, 
  Award, 
  FolderKanban, 
  Code,
  X,
  LogOut,
  Home
} from 'lucide-react'

function Sidebar({ currentPath, onNavigate, onSignOut, user, isMobile = false, onClose }) {
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
    <div className="flex flex-col h-full w-64 bg-white/5 backdrop-blur-lg border-r border-white/10">
      {/* Sidebar Header */}
      <div className="p-6 border-b border-white/10">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-white">Dashboard</h2>
          {isMobile && (
            <button
              onClick={onClose}
              className="cursor-target p-2 rounded-lg text-white hover:bg-white/10 transition-all"
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
            <p className="text-sm font-medium text-white truncate">
              {user?.email || 'User'}
            </p>
            <p className="text-xs text-gray-400">Admin</p>
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
                  : 'text-gray-300 hover:bg-white/10 hover:text-white'
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
          className="cursor-target w-full flex items-center gap-3 px-4 py-3 rounded-xl text-gray-300 hover:bg-white/10 hover:text-white transition-all duration-300 group"
        >
          <Home className="w-5 h-5 group-hover:scale-110 transition-transform duration-300" />
          <span className="font-medium">View Portfolio</span>
        </button>
        
        <button
          onClick={onSignOut}
          className="cursor-target w-full flex items-center gap-3 px-4 py-3 rounded-xl text-red-300 hover:bg-red-600/20 hover:text-red-200 border border-red-500/30 transition-all duration-300 group"
        >
          <LogOut className="w-5 h-5 group-hover:scale-110 transition-transform duration-300" />
          <span className="font-medium">Sign Out</span>
        </button>
      </div>
    </div>
  )
}

export default Sidebar

