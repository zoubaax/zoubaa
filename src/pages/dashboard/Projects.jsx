import { useState, useEffect } from 'react'
import { FolderKanban, Calendar, Tag, Plus, Edit, Trash2, X, Github } from 'lucide-react'
import TargetCursor from '../../hooks/TargetCursor'
import { getProjects, createProject, updateProject, deleteProject } from '../../services/projectsService'
import ProjectForm from '../../components/dashboard/ProjectForm'
import { useTheme } from '../../contexts/ThemeContext'

function Projects() {
  const [projects, setProjects] = useState([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [editingProject, setEditingProject] = useState(null)
  const [formLoading, setFormLoading] = useState(false)
  const [error, setError] = useState(null)
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)
  const [projectToDelete, setProjectToDelete] = useState(null)
  const { isDarkMode } = useTheme()

  useEffect(() => {
    loadProjects()
  }, [])

  const loadProjects = async () => {
    setLoading(true)
    setError(null)
    const { data, error: fetchError } = await getProjects()
    if (fetchError) {
      setError('Failed to load projects')
      console.error(fetchError)
    } else {
      setProjects(data || [])
    }
    setLoading(false)
  }

  const handleCreate = () => {
    setEditingProject(null)
    setShowForm(true)
    setError(null)
  }

  const handleEdit = (project) => {
    setEditingProject(project)
    setShowForm(true)
    setError(null)
  }

  const handleDeleteClick = (project) => {
    setProjectToDelete(project)
    setShowDeleteConfirm(true)
  }

  const handleConfirmDelete = async () => {
    if (!projectToDelete) return

    setError(null)
    const { success, error: deleteError } = await deleteProject(projectToDelete.id)
    if (deleteError) {
      setError('Failed to delete project')
      console.error(deleteError)
    } else {
      await loadProjects()
    }
    setShowDeleteConfirm(false)
    setProjectToDelete(null)
  }

  const handleCancelDelete = () => {
    setShowDeleteConfirm(false)
    setProjectToDelete(null)
  }

  const handleSave = async (formData, imageFile) => {
    setFormLoading(true)
    setError(null)

    try {
      if (editingProject) {
        // Update existing project
        const { data, error: updateError } = await updateProject(
          editingProject.id,
          formData,
          imageFile,
          true // delete old image
        )
        if (updateError) {
          setError('Failed to update project')
          console.error(updateError)
        } else {
          setShowForm(false)
          setEditingProject(null)
          await loadProjects()
        }
      } else {
        // Create new project
        const { data, error: createError } = await createProject(formData, imageFile)
        if (createError) {
          setError('Failed to create project')
          console.error(createError)
        } else {
          setShowForm(false)
          await loadProjects()
        }
      }
    } catch (err) {
      setError('An unexpected error occurred')
      console.error(err)
    } finally {
      setFormLoading(false)
    }
  }

  const handleCancel = () => {
    setShowForm(false)
    setEditingProject(null)
    setError(null)
  }

  if (loading) {
    return (
      <div className={`relative min-h-full flex items-center justify-center ${
        isDarkMode ? 'text-white' : 'text-gray-900'
      }`}>
        <div className="text-lg">Loading projects...</div>
      </div>
    )
  }

  return (
    <div className="relative min-h-full">
      <TargetCursor
        spinDuration={2}
        hideDefaultCursor={true}
      />
      
      {/* Delete Confirmation Pop-up */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div 
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={handleCancelDelete}
          />
          <div className={`relative z-10 w-full max-w-md rounded-2xl p-6 shadow-2xl border transition-colors duration-300 ${
            isDarkMode 
              ? 'bg-[#0A1A4D] border-red-500/30' 
              : 'bg-white border-red-200'
          }`}>
            <div className="text-center">
              <div className={`mx-auto flex items-center justify-center h-12 w-12 rounded-full ${
                isDarkMode ? 'bg-red-500/20' : 'bg-red-100'
              }`}>
                <Trash2 className={`h-6 w-6 ${isDarkMode ? 'text-red-400' : 'text-red-600'}`} />
              </div>
              <h3 className={`mt-4 text-lg font-semibold transition-colors duration-300 ${
                isDarkMode ? 'text-white' : 'text-gray-900'
              }`}>
                Delete Project
              </h3>
              <p className={`mt-2 text-sm transition-colors duration-300 ${
                isDarkMode ? 'text-cyan-200' : 'text-gray-600'
              }`}>
                Are you sure you want to delete <strong>"{projectToDelete?.title}"</strong>? This action cannot be undone.
              </p>
            </div>
            <div className="mt-6 flex gap-3">
              <button
                onClick={handleCancelDelete}
                className={`cursor-target flex-1 py-2 px-4 rounded-lg border transition-all duration-300 hover:scale-105 ${
                  isDarkMode
                    ? 'bg-gray-600/20 hover:bg-gray-600/30 text-gray-300 border-gray-500/30'
                    : 'bg-gray-100 hover:bg-gray-200 text-gray-700 border-gray-300'
                }`}
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmDelete}
                className={`cursor-target flex-1 py-2 px-4 rounded-lg border transition-all duration-300 hover:scale-105 ${
                  isDarkMode
                    ? 'bg-red-500/20 hover:bg-red-500/30 text-red-400 border-red-400/30'
                    : 'bg-red-500/20 hover:bg-red-500/30 text-red-700 border-red-400/30'
                }`}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
      
      <div className="p-6 sm:p-8 lg:p-12">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-8 flex items-center justify-between">
            <div>
              <div className="cursor-target inline-flex items-center gap-4 mb-6">
                <div className={`w-12 h-0.5 bg-gradient-to-r ${
                  isDarkMode ? 'from-cyan-400 to-blue-500' : 'from-blue-500 to-cyan-500'
                }`}></div>
                <span className={`text-sm font-semibold tracking-widest uppercase ${
                  isDarkMode ? 'text-cyan-400' : 'text-blue-600'
                }`}>
                  Portfolio
                </span>
                <div className={`w-12 h-0.5 bg-gradient-to-r ${
                  isDarkMode ? 'from-blue-500 to-cyan-400' : 'from-cyan-500 to-blue-500'
                }`}></div>
              </div>
              <h1 className={`text-4xl font-bold mb-4 ${
                isDarkMode ? 'text-white' : 'text-gray-900'
              }`}>
                My Projects
              </h1>
              <p className={`text-lg ${
                isDarkMode ? 'text-cyan-300' : 'text-gray-700'
              }`}>
                Manage your development projects
              </p>
            </div>
            {!showForm && (
              <button
                onClick={handleCreate}
                className="cursor-target flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-semibold hover:shadow-lg hover:shadow-cyan-500/25 transition-all"
              >
                <Plus className="w-5 h-5" />
                Add Project
              </button>
            )}
          </div>

          {/* Error Message */}
          {error && (
            <div className={`mb-6 p-4 rounded-xl border ${
              isDarkMode 
                ? 'bg-red-500/20 border-red-500/50 text-red-200' 
                : 'bg-red-50 border-red-200 text-red-700'
            }`}>
              {error}
            </div>
          )}

          {/* Form Modal */}
          {showForm && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
              <div className={`rounded-2xl border p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto ${
                isDarkMode ? 'bg-gray-900 border-white/10' : 'bg-white border-blue-200'
              }`}>
                <div className="flex items-center justify-between mb-6">
                  <h2 className={`text-2xl font-bold ${
                    isDarkMode ? 'text-white' : 'text-gray-900'
                  }`}>
                    {editingProject ? 'Edit Project' : 'Create New Project'}
                  </h2>
                  <button
                    onClick={handleCancel}
                    className={`p-2 rounded-lg transition-all ${
                      isDarkMode ? 'text-white hover:bg-white/10' : 'text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
                <ProjectForm
                  project={editingProject}
                  onSave={handleSave}
                  onCancel={handleCancel}
                  loading={formLoading}
                />
              </div>
            </div>
          )}

          {/* Projects Grid */}
          {!showForm && (
            <>
              {projects.length === 0 ? (
                <div className="text-center py-20">
                  <FolderKanban className={`w-20 h-20 mx-auto mb-4 ${
                    isDarkMode ? 'text-gray-500' : 'text-gray-400'
                  }`} />
                  <h3 className={`text-xl font-semibold mb-2 ${
                    isDarkMode ? 'text-gray-400' : 'text-gray-600'
                  }`}>
                    No Projects Yet
                  </h3>
                  <p className={`mb-6 ${
                    isDarkMode ? 'text-gray-500' : 'text-gray-500'
                  }`}>
                    Get started by adding your first project.
                  </p>
                  <button
                    onClick={handleCreate}
                    className="cursor-target inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-semibold hover:shadow-lg hover:shadow-cyan-500/25 transition-all"
                  >
                    <Plus className="w-5 h-5" />
                    Add Your First Project
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {projects.map((project) => (
                    <div
                      key={project.id}
                      className={`cursor-target group relative backdrop-blur-lg rounded-2xl border p-6 transition-all duration-500 transform hover:-translate-y-2 ${
                        isDarkMode
                          ? 'bg-white/5 border-blue-500/30 hover:border-cyan-400/50 hover:shadow-2xl hover:shadow-cyan-500/10'
                          : 'bg-white border-blue-200 hover:border-blue-400 hover:shadow-2xl hover:shadow-blue-500/10'
                      }`}
                    >
                      {/* Image */}
                      {project.image_url && (
                        <div className="mb-4 rounded-xl overflow-hidden">
                          <img
                            src={project.image_url}
                            alt={project.title}
                            className="w-full h-48 object-cover"
                          />
                        </div>
                      )}

                      {/* Header */}
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            {!project.image_url && (
                              <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                                <FolderKanban className="w-6 h-6 text-white" />
                              </div>
                            )}
                            <div>
                              <h3 className={`text-xl font-bold group-hover:text-cyan-400 transition-colors ${
                                isDarkMode ? 'text-white' : 'text-gray-900'
                              }`}>
                                {project.title}
                              </h3>
                              <div className="flex items-center gap-2 mt-1">
                                <Tag className={`w-3 h-3 ${
                                  isDarkMode ? 'text-gray-400' : 'text-gray-500'
                                }`} />
                                <span className={`text-xs capitalize ${
                                  isDarkMode ? 'text-gray-400' : 'text-gray-500'
                                }`}>
                                  {project.category}
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Description */}
                      <p className={`mb-4 line-clamp-3 ${
                        isDarkMode ? 'text-gray-300' : 'text-gray-700'
                      }`}>
                        {project.description}
                      </p>

                      {/* Technologies */}
                      {project.technologies && project.technologies.length > 0 && (
                        <div className="flex flex-wrap gap-2 mb-4">
                          {project.technologies.map((tech, index) => {
                            const techName = typeof tech === 'string' ? tech : tech.name
                            const techImage = typeof tech === 'object' && tech.image_url ? tech.image_url : null
                            return (
                              <span
                                key={index}
                                className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-lg border text-xs font-medium ${
                                  isDarkMode
                                    ? 'bg-white/5 border-white/10 text-gray-300'
                                    : 'bg-gray-50 border-gray-200 text-gray-700'
                                }`}
                              >
                                {techImage && (
                                  <img src={techImage} alt={techName} className="w-4 h-4 object-contain" />
                                )}
                                {techName}
                              </span>
                            )
                          })}
                        </div>
                      )}

                      {/* Footer */}
                      <div className={`flex items-center justify-between pt-4 border-t ${
                        isDarkMode ? 'border-white/10' : 'border-gray-200'
                      }`}>
                        <div className={`flex items-center gap-2 text-sm ${
                          isDarkMode ? 'text-gray-400' : 'text-gray-500'
                        }`}>
                          <Calendar className="w-4 h-4" />
                          <span>
                            {new Date(project.created_at).toLocaleDateString('en-US', {
                              year: 'numeric',
                              month: 'short'
                            })}
                          </span>
                        </div>
                        
                        <div className="flex items-center gap-2">
                          {project.github_url && (
                            <a
                              href={project.github_url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className={`cursor-target p-2 rounded-lg border transition-all hover:border-cyan-400/50 ${
                                isDarkMode
                                  ? 'bg-white/10 hover:bg-white/20 text-white border-white/20'
                                  : 'bg-gray-100 hover:bg-gray-200 text-gray-700 border-gray-300'
                              }`}
                              aria-label="View on GitHub"
                            >
                              <Github className="w-4 h-4" />
                            </a>
                          )}
                          <button
                            onClick={() => handleEdit(project)}
                            className={`cursor-target p-2 rounded-lg border transition-all ${
                              isDarkMode
                                ? 'bg-blue-600/20 hover:bg-blue-600/30 text-blue-300 border-blue-500/30'
                                : 'bg-blue-50 hover:bg-blue-100 text-blue-700 border-blue-200'
                            }`}
                            aria-label="Edit project"
                          >
                            <Edit className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDeleteClick(project)}
                            className={`cursor-target p-2 rounded-lg border transition-all ${
                              isDarkMode
                                ? 'bg-red-600/20 hover:bg-red-600/30 text-red-300 border-red-500/30'
                                : 'bg-red-50 hover:bg-red-100 text-red-700 border-red-200'
                            }`}
                            aria-label="Delete project"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  )
}

export default Projects