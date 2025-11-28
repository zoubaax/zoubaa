import { useState, useEffect } from 'react'
import { useAuth } from '../../contexts/AuthContext'
import { useNavigate } from 'react-router-dom'
import { LayoutDashboard, Award, FolderKanban, Code, User, Calendar, Mail } from 'lucide-react'
import TargetCursor from '../../hooks/TargetCursor'
import { getProjects } from '../../services/projectsService'
import { getCertificates } from '../../services/certificatesService'
import { getTechnologies } from '../../services/technologiesService'

function Dashboard() {
  const { user } = useAuth()
  const navigate = useNavigate()
  const [projectsCount, setProjectsCount] = useState(0)
  const [certificatesCount, setCertificatesCount] = useState(0)
  const [technologiesCount, setTechnologiesCount] = useState(0)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadCounts()
  }, [])

  const loadCounts = async () => {
    setLoading(true)
    const [projectsResult, certificatesResult, technologiesResult] = await Promise.all([
      getProjects(),
      getCertificates(),
      getTechnologies(),
    ])
    
    if (projectsResult.data) {
      setProjectsCount(projectsResult.data.length)
    }
    if (certificatesResult.data) {
      setCertificatesCount(certificatesResult.data.length)
    }
    if (technologiesResult.data) {
      setTechnologiesCount(technologiesResult.data.length)
    }
    setLoading(false)
  }

  const stats = [
    {
      label: 'Projects',
      value: loading ? '...' : projectsCount.toString(),
      icon: FolderKanban,
      color: 'from-purple-500 to-pink-500',
      onClick: () => navigate('/dashboard/projects'),
    },
    {
      label: 'Technologies',
      value: loading ? '...' : technologiesCount.toString(),
      icon: Code,
      color: 'from-green-500 to-emerald-500',
      onClick: () => navigate('/dashboard/technologies'),
    },
    {
      label: 'Certificates',
      value: loading ? '...' : certificatesCount.toString(),
      icon: Award,
      color: 'from-blue-500 to-cyan-500',
      onClick: () => navigate('/dashboard/certificates'),
    },
  ]

  return (
    <div className="relative min-h-full">
      <TargetCursor
        spinDuration={2}
        hideDefaultCursor={true}
      />
      
      <div className="p-6 sm:p-8 lg:p-12">
        <div className="max-w-7xl mx-auto">
          {/* Welcome Section */}
          <div className="mb-8">
            <div className="cursor-target inline-flex items-center gap-4 mb-6">
              <div className="w-12 h-0.5 bg-gradient-to-r from-cyan-400 to-blue-500"></div>
              <span className="text-sm font-semibold tracking-widest uppercase text-cyan-400">
                Overview
              </span>
              <div className="w-12 h-0.5 bg-gradient-to-r from-blue-500 to-cyan-400"></div>
            </div>
            <h1 className="text-4xl font-bold text-white mb-2">Welcome Back!</h1>
            <p className="text-gray-300 text-lg">
              Here's an overview of your dashboard
            </p>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {stats.map((stat) => {
              const Icon = stat.icon
              return (
                <button
                  key={stat.label}
                  onClick={stat.onClick}
                  className="cursor-target group relative bg-white/5 backdrop-blur-lg rounded-2xl border border-white/10 p-6 hover:border-cyan-400/50 hover:shadow-2xl hover:shadow-cyan-500/10 transition-all duration-500 transform hover:-translate-y-2 text-left"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-gray-400 text-sm font-medium mb-2">{stat.label}</p>
                      <p className="text-3xl font-bold text-white">{stat.value}</p>
                    </div>
                    <div className={`w-16 h-16 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                      <Icon className="w-8 h-8 text-white" />
                    </div>
                  </div>
                </button>
              )
            })}
          </div>

          {/* User Information Card */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-white/5 backdrop-blur-lg rounded-2xl border border-white/10 p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center">
                  <User className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-bold text-white">User Information</h3>
              </div>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <Mail className="w-5 h-5 text-gray-400" />
                  <div>
                    <p className="text-sm text-gray-400">Email</p>
                    <p className="text-white font-medium">{user?.email || 'N/A'}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Calendar className="w-5 h-5 text-gray-400" />
                  <div>
                    <p className="text-sm text-gray-400">Last Sign In</p>
                    <p className="text-white font-medium">
                      {user?.last_sign_in_at 
                        ? new Date(user.last_sign_in_at).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric',
                            hour: '2-digit',
                            minute: '2-digit'
                          })
                        : 'N/A'}
                    </p>
                  </div>
                </div>
                <div className="pt-4 border-t border-white/10">
                  <p className="text-sm text-gray-400 mb-1">User ID</p>
                  <p className="text-white font-mono text-xs break-all">{user?.id || 'N/A'}</p>
                </div>
              </div>
            </div>

            <div className="bg-white/5 backdrop-blur-lg rounded-2xl border border-white/10 p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
                  <LayoutDashboard className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-bold text-white">Quick Navigation</h3>
              </div>
              <div className="space-y-3">
                <button
                  onClick={() => navigate('/dashboard/projects')}
                  className="cursor-target w-full flex items-center gap-3 px-4 py-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 hover:border-cyan-400/50 text-white transition-all duration-300 group"
                >
                  <FolderKanban className="w-5 h-5 group-hover:scale-110 transition-transform" />
                  <span className="font-medium">View Projects</span>
                </button>
                <button
                  onClick={() => navigate('/dashboard/technologies')}
                  className="cursor-target w-full flex items-center gap-3 px-4 py-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 hover:border-cyan-400/50 text-white transition-all duration-300 group"
                >
                  <Code className="w-5 h-5 group-hover:scale-110 transition-transform" />
                  <span className="font-medium">View Technologies</span>
                </button>
                <button
                  onClick={() => navigate('/dashboard/certificates')}
                  className="cursor-target w-full flex items-center gap-3 px-4 py-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 hover:border-cyan-400/50 text-white transition-all duration-300 group"
                >
                  <Award className="w-5 h-5 group-hover:scale-110 transition-transform" />
                  <span className="font-medium">View Certificates</span>
                </button>
                <button
                  onClick={() => navigate('/')}
                  className="cursor-target w-full flex items-center gap-3 px-4 py-3 rounded-xl bg-blue-600/20 hover:bg-blue-600/30 border border-blue-500/30 hover:border-cyan-400/50 text-blue-300 transition-all duration-300 group"
                >
                  <span className="font-medium">Go to Portfolio</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard

