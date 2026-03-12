import { useState, useEffect } from 'react'
import { useAuth } from '../../contexts/AuthContext'
import { useTheme } from '../../contexts/ThemeContext'
import { useNavigate } from 'react-router-dom'
import { LayoutDashboard, Award, FolderKanban, Code, User, Calendar, Mail } from 'lucide-react'

import { getProjects } from '../../services/projectsService'
import { getCertificates } from '../../services/certificatesService'
import { getTechnologies } from '../../services/technologiesService'
import { syncAiKnowledge } from '../../services/aiService'
import { uploadCV } from '../../services/cvService'
import { Brain, RefreshCw, CheckCircle, AlertCircle, FileText, Upload } from 'lucide-react'

function Dashboard() {
  const { user } = useAuth()
  const { isDarkMode } = useTheme()
  const navigate = useNavigate()
  const [projectsCount, setProjectsCount] = useState(0)
  const [certificatesCount, setCertificatesCount] = useState(0)
  const [technologiesCount, setTechnologiesCount] = useState(0)
  const [loading, setLoading] = useState(true)
  const [syncing, setSyncing] = useState(false)
  const [syncStatus, setSyncStatus] = useState(null) // null, 'success', 'error'
  const [cvFile, setCvFile] = useState(null)
  const [uploadingCv, setUploadingCv] = useState(false)
  const [cvStatus, setCvStatus] = useState(null)

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

  const handleSyncAI = async () => {
    setSyncing(true)
    setSyncStatus(null)
    const { data, error } = await syncAiKnowledge()
    if (error) {
      setSyncStatus('error')
    } else {
      setSyncStatus('success')
    }
    setSyncing(false)
    setTimeout(() => setSyncStatus(null), 5000)
  }

  const handleUploadCv = async () => {
    if (!cvFile) return
    setUploadingCv(true)
    setCvStatus(null)
    const { success, error } = await uploadCV(cvFile)
    if (success) {
      setCvStatus('success')
      setCvFile(null)
      const fileInput = document.getElementById('cv-upload')
      if (fileInput) fileInput.value = ''
    } else {
      setCvStatus('error')
    }
    setUploadingCv(false)
    setTimeout(() => setCvStatus(null), 5000)
  }

  const stats = [
    {
      label: 'Projects',
      value: loading ? '...' : projectsCount.toString(),
      icon: FolderKanban,
      color: 'from-cyan-500 to-blue-500',
      onClick: () => navigate('/dashboard/projects'),
    },
    {
      label: 'Technologies',
      value: loading ? '...' : technologiesCount.toString(),
      icon: Code,
      color: 'from-cyan-500 to-blue-500',
      onClick: () => navigate('/dashboard/technologies'),
    },
    {
      label: 'Certificates',
      value: loading ? '...' : certificatesCount.toString(),
      icon: Award,
      color: 'from-cyan-500 to-blue-500',
      onClick: () => navigate('/dashboard/certificates'),
    },
  ]

  return (
    <div className="relative min-h-full">

      <div className="p-6 sm:p-8 lg:p-12">
        <div className="max-w-7xl mx-auto">
          {/* Welcome Section */}
          <div className="mb-8">
            <div className="cursor-target inline-flex items-center gap-4 mb-6">
              <div className={`w-12 h-0.5 bg-gradient-to-r ${isDarkMode ? 'from-cyan-400 to-blue-500' : 'from-blue-500 to-cyan-500'}`}></div>
              <span className={`text-sm font-semibold tracking-widest uppercase ${isDarkMode ? 'text-cyan-400' : 'text-blue-600'}`}>
                Overview
              </span>
              <div className={`w-12 h-0.5 bg-gradient-to-r ${isDarkMode ? 'from-blue-500 to-cyan-400' : 'from-cyan-500 to-blue-500'}`}></div>
            </div>
            <h1 className={`text-4xl font-bold mb-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
              Welcome Back!
            </h1>
            <p className={`text-lg ${isDarkMode ? 'text-cyan-300' : 'text-gray-700'}`}>
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
                  className={`cursor-target group relative backdrop-blur-lg rounded-2xl border p-6 transition-all duration-500 transform hover:-translate-y-2 text-left ${isDarkMode
                    ? 'bg-white/5 border-blue-500/30 hover:border-cyan-400/50 hover:shadow-2xl hover:shadow-cyan-500/10'
                    : 'bg-white border-blue-200 hover:border-blue-400 hover:shadow-2xl hover:shadow-blue-500/10'
                    }`}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className={`text-sm font-medium mb-2 ${isDarkMode ? 'text-cyan-400' : 'text-blue-600'}`}>
                        {stat.label}
                      </p>
                      <p className={`text-3xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                        {stat.value}
                      </p>
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
            <div className={`backdrop-blur-lg rounded-2xl border p-6 ${isDarkMode ? 'bg-white/5 border-blue-500/30' : 'bg-white border-blue-200'
              }`}>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-cyan-500 to-blue-500 flex items-center justify-center">
                  <User className="w-6 h-6 text-white" />
                </div>
                <h3 className={`text-xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                  User Information
                </h3>
              </div>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <Mail className={`w-5 h-5 ${isDarkMode ? 'text-cyan-400' : 'text-blue-600'}`} />
                  <div>
                    <p className={`text-sm ${isDarkMode ? 'text-cyan-400' : 'text-blue-600'}`}>Email</p>
                    <p className={`font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                      {user?.email || 'N/A'}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Calendar className={`w-5 h-5 ${isDarkMode ? 'text-cyan-400' : 'text-blue-600'}`} />
                  <div>
                    <p className={`text-sm ${isDarkMode ? 'text-cyan-400' : 'text-blue-600'}`}>Last Sign In</p>
                    <p className={`font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
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
              </div>
            </div>

            <div className={`backdrop-blur-lg rounded-2xl border p-6 ${isDarkMode ? 'bg-white/5 border-blue-500/30' : 'bg-white border-blue-200'
              }`}>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center">
                  <Brain className="w-6 h-6 text-white" />
                </div>
                <h3 className={`text-xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                  AI Portfolio Brain
                </h3>
              </div>
              <div className="space-y-4">
                <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  Your RAG chatbot uses embeddings to answer questions about your work. Update the brain after adding new projects.
                </p>

                <button
                  onClick={handleSyncAI}
                  disabled={syncing}
                  className={`cursor-target w-full flex items-center justify-center gap-3 px-4 py-3 rounded-xl border transition-all duration-300 group ${syncing
                      ? 'opacity-50 cursor-not-allowed'
                      : 'hover:scale-105 active:scale-95'
                    } ${isDarkMode
                      ? 'bg-purple-500/20 border-purple-400/30 text-purple-300 hover:bg-purple-500/30'
                      : 'bg-purple-50 border-purple-200 text-purple-700 hover:bg-purple-100'
                    }`}
                >
                  <RefreshCw className={`w-5 h-5 ${syncing ? 'animate-spin' : ''}`} />
                  <span className="font-semibold">
                    {syncing ? 'Syncing...' : 'Sync AI Knowledge'}
                  </span>
                </button>

                {syncStatus === 'success' && (
                  <div className="flex items-center gap-2 text-green-500 text-sm animate-fade-in">
                    <CheckCircle className="w-4 h-4" />
                    <span>AI Brain is up to date!</span>
                  </div>
                )}

                {syncStatus === 'error' && (
                  <div className="flex items-center gap-2 text-red-500 text-sm animate-fade-in">
                    <AlertCircle className="w-4 h-4" />
                    <span>Sync failed. Check function logs.</span>
                  </div>
                )}
              </div>
            </div>

            {/* Resume / CV Upload Card */}
            <div className={`backdrop-blur-lg rounded-2xl border p-6 ${isDarkMode ? 'bg-white/5 border-blue-500/30' : 'bg-white border-blue-200'
              }`}>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center">
                  <FileText className="w-6 h-6 text-white" />
                </div>
                <h3 className={`text-xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                  Resume / CV
                </h3>
              </div>
              <div className="space-y-4">
                <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  Upload your latest resume (PDF) here. It will automatically update the download link on the homepage.
                </p>

                <div className="flex flex-col gap-3">
                  <input
                    type="file"
                    id="cv-upload"
                    accept=".pdf,application/pdf"
                    onChange={(e) => {
                      if (e.target.files && e.target.files[0]) {
                        setCvFile(e.target.files[0])
                        setCvStatus(null)
                      }
                    }}
                    className={`block w-full text-sm rounded-xl border file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold transition-all ${isDarkMode
                        ? 'text-gray-300 border-gray-700 file:bg-gray-800 file:text-gray-300 hover:file:bg-gray-700'
                        : 'text-gray-700 border-gray-200 file:bg-gray-100 file:text-gray-700 hover:file:bg-gray-200'
                      }`}
                  />
                  <button
                    onClick={handleUploadCv}
                    disabled={!cvFile || uploadingCv}
                    className={`cursor-target w-full flex items-center justify-center gap-3 px-4 py-3 rounded-xl border transition-all duration-300 group ${(!cvFile || uploadingCv)
                        ? 'opacity-50 cursor-not-allowed'
                        : 'hover:scale-105 active:scale-95'
                      } ${isDarkMode
                        ? 'bg-green-500/20 border-green-400/30 text-green-300 hover:bg-green-500/30'
                        : 'bg-green-50 border-green-200 text-green-700 hover:bg-green-100'
                      }`}
                  >
                    {uploadingCv ? (
                      <RefreshCw className="w-5 h-5 animate-spin" />
                    ) : (
                      <Upload className="w-5 h-5" />
                    )}
                    <span className="font-semibold">
                      {uploadingCv ? 'Uploading...' : 'Upload New CV'}
                    </span>
                  </button>
                </div>

                {cvStatus === 'success' && (
                  <div className="flex items-center gap-2 text-green-500 text-sm animate-fade-in">
                    <CheckCircle className="w-4 h-4" />
                    <span>CV updated successfully!</span>
                  </div>
                )}

                {cvStatus === 'error' && (
                  <div className="flex items-center gap-2 text-red-500 text-sm animate-fade-in">
                    <AlertCircle className="w-4 h-4" />
                    <span>Upload failed. Check console.</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard