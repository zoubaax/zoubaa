import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import {
  ArrowLeft,
  Calendar,
  Tag,
  Github,
  ExternalLink,
  Layers,
  ChevronRight,
  Clock,
  Users,
  Code,
  MessageSquare,
  Rocket
} from 'lucide-react'
import { Link } from 'react-router-dom'

import Navbar from '../components/Navbar'
import { getProjectById } from '../services/projectsService'
import TechBadge from '../components/TechBadge'
import ErrorState from '../components/ErrorState'

import { useTheme } from '../contexts/ThemeContext'

const ProjectDetails = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const { isDarkMode: drakeMode } = useTheme()

  const [project, setProject] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchProject = async () => {
      if (!id) return

      setLoading(true)
      setError(null)

      try {
        const { data, error: fetchError } = await getProjectById(id)

        if (fetchError) {
          console.error('Error fetching project:', fetchError)
          setError('Unable to load project details. Please try again.')
        } else {
          setProject(data)
        }
      } catch (err) {
        console.error('Unexpected error:', err)
        setError('An unexpected error occurred.')
      } finally {
        setLoading(false)
      }
    }

    fetchProject()
  }, [id])

  const handleBack = () => {
    navigate(-1)
  }

  const formatDate = (dateString) => {
    if (!dateString) return '—'
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long'
    })
  }

  if (loading) {
    return (
      <div style={{
        backgroundColor: drakeMode ? '#050A30' : '#eff9ff',
        minHeight: '100vh'
      }}>
        <Navbar />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="animate-pulse space-y-8">
            <div className="h-64 rounded-xl" style={{ backgroundColor: drakeMode ? '#1A1A1A' : '#e2e8f0' }}></div>
            <div className="h-8 rounded w-3/4" style={{ backgroundColor: drakeMode ? '#1A1A1A' : '#e2e8f0' }}></div>
            <div className="h-4 rounded w-1/2" style={{ backgroundColor: drakeMode ? '#1A1A1A' : '#e2e8f0' }}></div>
          </div>
        </div>
      </div>
    )
  }

  if (error || !project) {
    return (
      <div style={{
        backgroundColor: drakeMode ? '#050A30' : '#eff9ff',
        minHeight: '100vh'
      }}>
        <Navbar />
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-32">
          <ErrorState
            message={error || 'Project not found'}
            onRetry={() => window.location.reload()}
            onBack={handleBack}
          />
        </div>
      </div>
    )
  }

  return (
    <div style={{
      backgroundColor: drakeMode ? '#050A30' : '#eff9ff',
      color: drakeMode ? '#EBE6E0' : '#1A1A1A',
      minHeight: '100vh',
      transition: 'background-color 0.4s cubic-bezier(0.4, 0, 0.2, 1)'
    }}>
      <Navbar />

      <main className="px-6 lg:px-12 xl:px-16 pt-32 lg:pt-40 pb-20">
        <div className="max-w-7xl mx-auto">
          {/* Navigation */}
          <nav className="mb-10 lg:mb-14">
            <button
              onClick={handleBack}
              className={`group inline-flex items-center gap-3 px-5 py-2.5 rounded-2xl transition-all duration-300 transform hover:scale-105 ${drakeMode
                ? 'bg-[#334155]/20 hover:bg-[#334155]/40 text-cyan-400 hover:text-white border border-cyan-500/20 hover:border-cyan-400/40'
                : 'bg-white text-blue-600 hover:text-blue-700 shadow-md hover:shadow-xl border border-blue-100 hover:border-blue-200'
                }`}
              aria-label="Back to projects"
            >
              <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
              <span className="text-sm font-bold tracking-wide">All Projects</span>
            </button>
          </nav>

          {/* Hero Section */}
          <div className="mb-12 lg:mb-16">
            <div className="relative h-64 md:h-80 lg:h-96 rounded-3xl overflow-hidden shadow-2xl">
              <img
                src={project.image_url || project.gallery_urls?.[0] || '/placeholder.jpg'}
                alt={project.title}
                className="w-full h-full object-cover"
                loading="eager"
              />
              <div className={`absolute inset-0 bg-gradient-to-t ${drakeMode
                ? 'from-[#050A30]/95 via-[#050A30]/60'
                : 'from-white/90 via-white/50'
                }`} />
            </div>
          </div>

          {/* Project Header */}
          <header className="mb-12 lg:mb-16">
            <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-4">
                  <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold ${drakeMode
                    ? 'bg-[#334155]/40 text-blue-300'
                    : 'bg-blue-100 text-blue-700'
                    }`}>
                    <Tag className="w-3 h-3" />
                    {project.category || 'Project'}
                  </span>
                  <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium ${drakeMode
                    ? 'bg-[#050A30] text-[#cbd5e1]'
                    : 'bg-gray-100 text-black'
                    }`}>
                    <Calendar className="w-3 h-3" />
                    {formatDate(project.created_at)}
                  </span>
                </div>

                <h1 style={{
                  fontSize: 'clamp(2.5rem, 5vw, 4rem)',
                  fontWeight: 'bold',
                  lineHeight: '1.1',
                  marginBottom: '1.5rem',
                  color: drakeMode ? '#ffffff' : '#000000'
                }}>
                  {project.title}
                </h1>

                <p style={{
                  fontSize: '1.125rem',
                  lineHeight: '1.6',
                  maxWidth: '48rem',
                  color: drakeMode ? '#cbd5e1' : '#4b5563'
                }}>
                  {project.tagline || project.description?.substring(0, 160)}
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row lg:flex-col gap-3">
                {project.live_url && project.live_url !== '#' && (
                  <a
                    href={project.live_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`group inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${drakeMode
                      ? 'bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white shadow-lg shadow-blue-500/25'
                      : 'bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white shadow-lg shadow-blue-500/25'
                      }`}
                  >
                    <ExternalLink className="w-4 h-4" />
                    <span>View Live Demo</span>
                    <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </a>
                )}

                {project.github_url && project.github_url !== '#' && (
                  <a
                    href={project.github_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`group inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-medium border transition-all duration-300 ${drakeMode
                      ? 'border-[#334155] hover:bg-[#050A30] text-[#cbd5e1] hover:text-white'
                      : 'border-gray-300 hover:bg-white text-black hover:text-black shadow-sm hover:shadow'
                      }`}
                  >
                    <Github className="w-4 h-4" />
                    <span>View Source Code</span>
                  </a>
                )}
              </div>
            </div>
          </header>

          {/* Main Content */}
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Project Details */}
            <div className="lg:col-span-2 space-y-12">
              {/* Overview */}
              <section className="space-y-6">
                <h2 className={`text-2xl font-bold ${drakeMode ? 'text-white' : 'text-black'
                  }`}>
                  Project Overview
                </h2>
                <div className={`prose prose-lg max-w-none ${drakeMode ? 'prose-invert' : ''
                  }`}>
                  {project.description?.split('\n\n').map((paragraph, idx) => (
                    <p key={idx} className="leading-relaxed">
                      {paragraph}
                    </p>
                  ))}
                </div>
              </section>

              {/* Key Features */}
              {project.features && project.features.length > 0 && (
                <section className="space-y-6">
                  <h2 className={`text-2xl font-bold ${drakeMode ? 'text-white' : 'text-black'
                    }`}>
                    Key Features
                  </h2>
                  <div className="grid sm:grid-cols-2 gap-4">
                    {project.features.map((feature, idx) => (
                      <div
                        key={idx}
                        className={`p-4 rounded-xl border ${drakeMode
                          ? 'border-[#334155] bg-[#050A30]/50'
                          : 'border-gray-200 bg-white'
                          }`}
                      >
                        <div className="flex items-start gap-3">
                          <div className={`p-2 rounded-lg ${drakeMode ? 'bg-blue-900/40' : 'bg-blue-50'
                            }`}>
                            <Code className={`w-5 h-5 ${drakeMode ? 'text-blue-400' : 'text-blue-600'
                              }`} />
                          </div>
                          <span className={`font-medium ${drakeMode ? 'text-white' : 'text-black'
                            }`}>
                            {feature}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </section>
              )}

              {/* Gallery */}
              {project.gallery_urls && project.gallery_urls.length > 0 && (
                <section className="space-y-6">
                  <h2 className={`text-2xl font-bold ${drakeMode ? 'text-white' : 'text-black'
                    }`}>
                    Project Gallery
                  </h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {project.gallery_urls.map((url, idx) => (
                      <div
                        key={idx}
                        className="group relative rounded-2xl overflow-hidden border border-gray-200"
                      >
                        <img
                          src={url}
                          alt={`${project.title} - Screenshot ${idx + 1}`}
                          className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
                          loading="lazy"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      </div>
                    ))}
                  </div>
                </section>
              )}
            </div>

            {/* Sidebar */}
            <div className="space-y-8">
              {/* Tech Stack */}
              <aside className={`rounded-2xl p-6 border ${drakeMode
                ? 'border-[#334155] bg-[#050A30]/50'
                : 'border-gray-200 bg-white'
                }`}>
                <div className="flex items-center gap-2 mb-6">
                  <Layers className={`w-5 h-5 ${drakeMode ? 'text-cyan-400' : 'text-blue-600'
                    }`} />
                  <h3 className={`text-lg font-bold ${drakeMode ? 'text-white' : 'text-black'
                    }`}>
                    Tech Stack
                  </h3>
                </div>

                <div className="flex flex-wrap gap-2">
                  {project.technologies?.map((tech, idx) => {
                    const techName = typeof tech === 'object' ? tech.name : tech
                    const techImage = typeof tech === 'object' ? tech.image_url : null

                    return (
                      <TechBadge
                        key={idx}
                        name={techName}
                        imageUrl={techImage}
                        darkMode={drakeMode}
                      />
                    )
                  })}
                </div>
              </aside>

              {/* Project Stats */}
              <aside className={`rounded-2xl p-6 border ${drakeMode
                ? 'border-[#334155] bg-[#050A30]/50'
                : 'border-gray-200 bg-white'
                }`}>
                <h3 className={`text-lg font-bold mb-6 ${drakeMode ? 'text-white' : 'text-black'
                  }`}>
                  Project Details
                </h3>

                <div className="space-y-4">
                  {project.duration && (
                    <div className="flex items-center gap-3">
                      <Clock className={`w-5 h-5 ${drakeMode ? 'text-gray-400' : 'text-gray-600'
                        }`} />
                      <div>
                        <p className={`text-sm font-medium ${drakeMode ? 'text-gray-300' : 'text-gray-700'
                          }`}>
                          Duration
                        </p>
                        <p className={`text-sm ${drakeMode ? 'text-gray-400' : 'text-gray-600'
                          }`}>
                          {project.duration}
                        </p>
                      </div>
                    </div>
                  )}

                  {project.team_size && (
                    <div className="flex items-center gap-3">
                      <Users className={`w-5 h-5 ${drakeMode ? 'text-gray-400' : 'text-gray-600'
                        }`} />
                      <div>
                        <p className={`text-sm font-medium ${drakeMode ? 'text-gray-300' : 'text-gray-700'
                          }`}>
                          Team Size
                        </p>
                        <p className={`text-sm ${drakeMode ? 'text-gray-400' : 'text-gray-600'
                          }`}>
                          {project.team_size}
                        </p>
                      </div>
                    </div>
                  )}

                  {project.role && (
                    <div className="flex items-center gap-3">
                      <div className={`p-2 rounded-lg ${drakeMode ? 'bg-purple-900/40' : 'bg-purple-50'
                        }`}>
                        <Users className={`w-5 h-5 ${drakeMode ? 'text-purple-400' : 'text-purple-600'
                          }`} />
                      </div>
                      <div>
                        <p className={`text-sm font-medium ${drakeMode ? 'text-gray-300' : 'text-gray-700'
                          }`}>
                          My Role
                        </p>
                        <p className={`text-sm ${drakeMode ? 'text-gray-400' : 'text-gray-600'
                          }`}>
                          {project.role}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </aside>

              {/* Challenges & Solutions */}
              {(project.challenges || project.solutions) && (
                <aside className={`rounded-2xl p-6 border ${drakeMode
                  ? 'border-[#334155] bg-[#050A30]/50'
                  : 'border-gray-200 bg-white'
                  }`}>
                  <h3 className={`text-lg font-bold mb-6 ${drakeMode ? 'text-white' : 'text-black'
                    }`}>
                    Challenges & Solutions
                  </h3>

                  {project.challenges && (
                    <div className="mb-4">
                      <h4 className={`text-sm font-semibold mb-2 ${drakeMode ? 'text-gray-300' : 'text-gray-700'
                        }`}>
                        Challenges
                      </h4>
                      <p className={`text-sm ${drakeMode ? 'text-gray-400' : 'text-gray-600'
                        }`}>
                        {project.challenges}
                      </p>
                    </div>
                  )}

                  {project.solutions && (
                    <div>
                      <h4 className={`text-sm font-semibold mb-2 ${drakeMode ? 'text-gray-300' : 'text-gray-700'
                        }`}>
                        Solutions
                      </h4>
                      <p className={`text-sm ${drakeMode ? 'text-gray-400' : 'text-gray-600'
                        }`}>
                        {project.solutions}
                      </p>
                    </div>
                  )}
                </aside>
              )}
            </div>
          </div>

          {/* Premium CTA Section */}
          <div className="mt-20">
            <div className={`relative overflow-hidden rounded-3xl p-8 md:p-12 ${drakeMode
                ? 'bg-gradient-to-br from-blue-600/20 via-[#050A30] to-cyan-500/20 border border-blue-500/30'
                : 'bg-gradient-to-br from-blue-500 via-blue-600 to-cyan-500 text-white shadow-2xl shadow-blue-500/20'
              }`}>
              {/* Decorative elements */}
              <div className="absolute top-0 right-0 -u-translate-y-1/2 u-translate-x-1/2 w-64 h-64 bg-white/10 rounded-full blur-3xl pointer-events-none"></div>
              <div className="absolute bottom-0 left-0 u-translate-y-1/2 -u-translate-x-1/2 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none"></div>

              <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-8 text-center lg:text-left">
                <div className="max-w-2xl">
                  <h2 className={`text-3xl md:text-4xl font-bold mb-4 tracking-tight ${drakeMode ? 'text-white' : 'text-white'
                    }`}>
                    Interested in this project?
                  </h2>
                  <p className={`text-lg md:text-xl ${drakeMode ? 'text-gray-300' : 'text-blue-50'
                    }`}>
                    Want to discuss similar projects or have questions about the implementation? Let's build something amazing together.
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto shrink-0">
                  <Link
                    to="/"
                    className={`inline-flex items-center justify-center gap-2 px-8 py-4 rounded-2xl font-bold transition-all duration-300 transform hover:scale-105 active:scale-95 ${drakeMode
                        ? 'bg-cyan-500 text-[#050A30] hover:bg-cyan-400 shadow-lg shadow-cyan-500/20'
                        : 'bg-white text-blue-600 hover:bg-blue-50 shadow-xl'
                      }`}
                  >
                    <MessageSquare className="w-5 h-5" />
                    Get In Touch
                  </Link>
                  <button
                    onClick={handleBack}
                    className={`inline-flex items-center justify-center gap-2 px-8 py-4 rounded-2xl font-bold transition-all duration-300 transform hover:scale-105 active:scale-95 border-2 ${drakeMode
                        ? 'border-white/20 hover:bg-white/10 text-white backdrop-blur-sm'
                        : 'border-white/30 hover:bg-white/10 text-white backdrop-blur-sm'
                      }`}
                  >
                    <Rocket className="w-5 h-5" />
                    View More Projects
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

export default ProjectDetails