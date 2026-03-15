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
  Rocket,
  Sparkles,
  CheckCircle2,
  Copy,
  Check,
  Eye,
  EyeOff
} from 'lucide-react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

import Navbar from '../components/Navbar'
import { getProjectById } from '../services/projectsService'
import TechBadge from '../components/TechBadge'
import ErrorState from '../components/ErrorState'
import ProjectGallery from '../components/ProjectGallery'

import { useTheme } from '../contexts/ThemeContext'

const ProjectDetails = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const { isDarkMode: drakeMode } = useTheme()
  const { i18n, t } = useTranslation()
  const [project, setProject] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [copiedId, setCopiedId] = useState(null)
  const [visiblePasswords, setVisiblePasswords] = useState({})

  const togglePasswordVisibility = (id) => {
    setVisiblePasswords(prev => ({
      ...prev,
      [id]: !prev[id]
    }))
  }

  const handleCopy = (text, id) => {
    navigator.clipboard.writeText(text)
    setCopiedId(id)
    setTimeout(() => setCopiedId(null), 2000)
  }

  useEffect(() => {
    const fetchProject = async () => {
      if (!id) return

      setLoading(true)
      setError(null)

      try {
        const { data, error: fetchError } = await getProjectById(id)

        if (fetchError) {
          console.error('Error fetching project:', fetchError)
          setError(t('portfolio.loading_error'))
        } else {
          setProject(data)
        }
      } catch (err) {
        console.error('Unexpected error:', err)
        setError(t('portfolio.unexpected_error'))
      } finally {
        setLoading(false)
      }
    }

    fetchProject()
  }, [id, t])

  const handleBack = () => {
    navigate(-1)
  }

  const formatDate = (dateString) => {
    if (!dateString) return '—'
    return new Date(dateString).toLocaleDateString(i18n.language === 'fr' ? 'fr-FR' : 'en-US', {
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
              aria-label={t('project_details.back')}
            >
              <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
              <span className="text-sm font-bold tracking-wide">{t('project_details.back')}</span>
            </button>
          </nav>

          {/* Premium Gallery Slider */}
          <div className="mb-16 lg:mb-20">
            <ProjectGallery
              images={[project.image_url, ...(project.gallery_urls || [])].filter(Boolean)}
              title={project.title}
            />
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
                    <span>{t('project_details.view_live')}</span>
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
                    <span>{t('project_details.view_source')}</span>
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
                  {t('project_details.overview')}
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
                <section className="space-y-8">
                  <div className="flex items-center gap-4">
                    <h2 className={`text-2xl font-bold ${drakeMode ? 'text-white' : 'text-black'}`}>
                      {t('project_details.features')}
                    </h2>
                    <div className={`h-[2px] flex-1 rounded-full ${drakeMode ? 'bg-gradient-to-r from-blue-500/50 to-transparent' : 'bg-gradient-to-r from-blue-200 to-transparent'}`}></div>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-5">
                    {project.features.map((feature, idx) => (
                      <motion.div
                        key={idx}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: idx * 0.1 }}
                        whileHover={{ y: -5, transition: { duration: 0.2 } }}
                        className={`group p-6 rounded-2xl border transition-all duration-300 relative overflow-hidden ${drakeMode
                          ? 'border-blue-500/20 bg-blue-500/5 hover:border-blue-500/40 hover:shadow-2xl hover:shadow-blue-500/10'
                          : 'border-blue-100 bg-white hover:border-blue-200 shadow-sm hover:shadow-xl'
                          }`}
                      >
                        {/* Decorative background element for dark mode */}
                        {drakeMode && (
                          <div className="absolute -right-4 -top-4 w-16 h-16 bg-blue-500/10 rounded-full blur-2xl group-hover:bg-blue-400/20 transition-colors duration-500"></div>
                        )}

                        <div className="flex items-center gap-4 relative z-10">
                          <div className={`p-3 rounded-xl transition-all duration-300 ${drakeMode
                            ? 'bg-blue-500/10 group-hover:bg-blue-500/20 text-blue-400'
                            : 'bg-blue-50 group-hover:bg-blue-100 text-blue-600'
                            }`}>
                            <Sparkles className="w-5 h-5" />
                          </div>
                          <p className={`font-semibold tracking-wide ${drakeMode ? 'text-gray-100' : 'text-gray-900'}`}>
                            {feature}
                          </p>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </section>
              )}

              {/* Gallery */}
              {project.gallery_urls && project.gallery_urls.length > 0 && (
                <section className="space-y-6">
                  <h2 className={`text-2xl font-bold ${drakeMode ? 'text-white' : 'text-black'
                    }`}>
                    {t('project_details.gallery')}
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
              {/* Test Accounts Section */}
              {project.test_accounts && project.test_accounts.length > 0 && (
                <aside className={`rounded-2xl p-6 border overflow-hidden relative group transition-all duration-300 ${drakeMode
                  ? 'border-cyan-500/20 bg-[#050A30]/50 hover:border-cyan-500/40'
                  : 'border-blue-100 bg-white hover:border-blue-200 shadow-sm hover:shadow-md'
                  }`}>
                  {/* Decorative background glow for dark mode */}
                  {drakeMode && (
                    <div className="absolute -right-10 -top-10 w-32 h-32 bg-cyan-500/5 rounded-full blur-3xl group-hover:bg-cyan-500/10 transition-colors duration-500"></div>
                  )}

                  <div className="flex items-center gap-3 mb-6 relative z-10">
                    <div className={`p-2 rounded-lg ${drakeMode ? 'bg-cyan-500/10 text-cyan-400' : 'bg-blue-50 text-blue-600'}`}>
                      <Users className="w-5 h-5" />
                    </div>
                    <h3 className={`text-lg font-bold ${drakeMode ? 'text-white' : 'text-black'}`}>
                      {t('project_details.demo_accounts') || 'Demo Accounts'}
                    </h3>
                  </div>

                  <div className="space-y-4 relative z-10">
                    {project.test_accounts.map((acc, idx) => (
                      <div key={idx} className={`p-4 rounded-xl border transition-all duration-300 ${drakeMode
                        ? 'bg-white/5 border-white/10 hover:bg-white/10'
                        : 'bg-gray-50 border-gray-100 hover:bg-white hover:border-blue-100 hover:shadow-sm'
                        }`}>
                        <div className="flex items-center justify-between mb-2">
                          <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${drakeMode
                            ? 'bg-cyan-500/20 text-cyan-400'
                            : 'bg-blue-100 text-blue-700'
                            }`}>
                            {acc.role}
                          </span>
                        </div>

                        <div className="space-y-2">
                          {/* Email */}
                          <div className="flex items-center justify-between group/item">
                            <div className="flex flex-col">
                              <span className={`text-[10px] uppercase opacity-50 ${drakeMode ? 'text-gray-400' : 'text-gray-500'}`}>Email</span>
                              <span className="text-sm font-medium truncate max-w-[140px]">{acc.email}</span>
                            </div>
                            <button
                              onClick={() => handleCopy(acc.email, `email-${idx}`)}
                              className={`p-2 rounded-lg transition-all duration-200 ${drakeMode ? 'hover:bg-white/10 text-gray-400 hover:text-cyan-400' : 'hover:bg-blue-50 text-gray-400 hover:text-blue-600'}`}
                              title="Copy email"
                            >
                              {copiedId === `email-${idx}` ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                            </button>
                          </div>

                          {/* Password */}
                          <div className="flex items-center justify-between group/item">
                            <div className="flex flex-col flex-1 cursor-pointer" onClick={() => togglePasswordVisibility(`pass-${idx}`)}>
                              <span className={`text-[10px] uppercase opacity-50 ${drakeMode ? 'text-gray-400' : 'text-gray-500'}`}>Password</span>
                              <span className="text-sm font-medium font-mono tracking-wider">
                                {visiblePasswords[`pass-${idx}`] ? acc.password : '••••••••'}
                              </span>
                            </div>
                            <div className="flex items-center gap-1">
                              <button
                                onClick={() => togglePasswordVisibility(`pass-${idx}`)}
                                className={`p-2 rounded-lg transition-all duration-200 ${drakeMode ? 'hover:bg-white/10 text-gray-400 hover:text-cyan-400' : 'hover:bg-blue-50 text-gray-400 hover:text-blue-600'}`}
                                title={visiblePasswords[`pass-${idx}`] ? "Hide password" : "Show password"}
                              >
                                {visiblePasswords[`pass-${idx}`] ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                              </button>
                              <button
                                onClick={() => handleCopy(acc.password, `pass-${idx}`)}
                                className={`p-2 rounded-lg transition-all duration-200 ${drakeMode ? 'hover:bg-white/10 text-gray-400 hover:text-cyan-400' : 'hover:bg-blue-50 text-gray-400 hover:text-blue-600'}`}
                                title="Copy password"
                              >
                                {copiedId === `pass-${idx}` ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  <p className={`text-[10px] mt-4 opacity-50 text-center uppercase tracking-widest ${drakeMode ? 'text-gray-400' : 'text-gray-500'}`}>
                    Click icons to copy
                  </p>
                </aside>
              )}
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
                    {t('project_details.tech_stack')}
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
                  {t('project_details.details')}
                </h3>

                <div className="space-y-4">
                  {project.duration && (
                    <div className="flex items-center gap-3">
                      <Clock className={`w-5 h-5 ${drakeMode ? 'text-gray-400' : 'text-gray-600'
                        }`} />
                      <div>
                        <p className={`text-sm font-medium ${drakeMode ? 'text-gray-300' : 'text-gray-700'
                          }`}>
                          {t('project_details.duration')}
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
                          {t('project_details.team_size')}
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
                          {t('project_details.my_role')}
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
                    {t('project_details.challenges_solutions')}
                  </h3>

                  {project.challenges && (
                    <div className="mb-4">
                      <h4 className={`text-sm font-semibold mb-2 ${drakeMode ? 'text-gray-300' : 'text-gray-700'
                        }`}>
                        {t('project_details.challenges')}
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
                        {t('project_details.solutions')}
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
                    {t('project_details.cta_title')}
                  </h2>
                  <p className={`text-lg md:text-xl ${drakeMode ? 'text-gray-300' : 'text-blue-50'
                    }`}>
                    {t('project_details.cta_subtitle')}
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
                    {t('project_details.get_in_touch')}
                  </Link>
                  <button
                    onClick={handleBack}
                    className={`inline-flex items-center justify-center gap-2 px-8 py-4 rounded-2xl font-bold transition-all duration-300 transform hover:scale-105 active:scale-95 border-2 ${drakeMode
                      ? 'border-white/20 hover:bg-white/10 text-white backdrop-blur-sm'
                      : 'border-white/30 hover:bg-white/10 text-white backdrop-blur-sm'
                      }`}
                  >
                    <Rocket className="w-5 h-5" />
                    {t('project_details.view_more')}
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