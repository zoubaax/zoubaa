import { useState, useEffect } from 'react'
import { Code, Plus, Edit, Trash2, X } from 'lucide-react'
import TargetCursor from '../../hooks/TargetCursor'
import { getTechnologies, createTechnology, updateTechnology, deleteTechnology } from '../../services/technologiesService'
import TechnologyForm from '../../components/dashboard/TechnologyForm'
import { useTheme } from '../../contexts/ThemeContext'

function Technologies() {
  const [technologies, setTechnologies] = useState([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [editingTechnology, setEditingTechnology] = useState(null)
  const [formLoading, setFormLoading] = useState(false)
  const [error, setError] = useState(null)
  const { isDarkMode } = useTheme()

  useEffect(() => {
    loadTechnologies()
  }, [])

  const loadTechnologies = async () => {
    setLoading(true)
    setError(null)
    const { data, error: fetchError } = await getTechnologies()
    if (fetchError) {
      setError('Failed to load technologies')
      console.error(fetchError)
    } else {
      setTechnologies(data || [])
    }
    setLoading(false)
  }

  const handleCreate = () => {
    setEditingTechnology(null)
    setShowForm(true)
    setError(null)
  }

  const handleEdit = (technology) => {
    setEditingTechnology(technology)
    setShowForm(true)
    setError(null)
  }

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this technology? This will remove it from all linked projects.')) {
      return
    }

    setError(null)
    const { success, error: deleteError } = await deleteTechnology(id)
    if (deleteError) {
      setError('Failed to delete technology')
      console.error(deleteError)
    } else {
      await loadTechnologies()
    }
  }

  const handleSave = async (formData, imageFile) => {
    setFormLoading(true)
    setError(null)

    try {
      if (editingTechnology) {
        // Update existing technology
        const { data, error: updateError } = await updateTechnology(
          editingTechnology.id,
          formData,
          imageFile,
          true // delete old image
        )
        if (updateError) {
          setError('Failed to update technology')
          console.error(updateError)
        } else {
          setShowForm(false)
          setEditingTechnology(null)
          await loadTechnologies()
        }
      } else {
        // Create new technology
        const { data, error: createError } = await createTechnology(formData, imageFile)
        if (createError) {
          setError('Failed to create technology')
          console.error(createError)
        } else {
          setShowForm(false)
          await loadTechnologies()
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
    setEditingTechnology(null)
    setError(null)
  }

  if (loading) {
    return (
      <div className={`relative min-h-full flex items-center justify-center ${
        isDarkMode ? 'text-white' : 'text-gray-900'
      }`}>
        <div className="text-lg">Loading technologies...</div>
      </div>
    )
  }

  return (
    <div className="relative min-h-full">
      <TargetCursor
        spinDuration={2}
        hideDefaultCursor={true}
      />
      
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
                  Tech Stack
                </span>
                <div className={`w-12 h-0.5 bg-gradient-to-r ${
                  isDarkMode ? 'from-blue-500 to-cyan-400' : 'from-cyan-500 to-blue-500'
                }`}></div>
              </div>
              <h1 className={`text-4xl font-bold mb-4 ${
                isDarkMode ? 'text-white' : 'text-gray-900'
              }`}>
                Technologies
              </h1>
              <p className={`text-lg ${
                isDarkMode ? 'text-cyan-300' : 'text-gray-700'
              }`}>
                Manage your technology stack and logos
              </p>
            </div>
            {!showForm && (
              <button
                onClick={handleCreate}
                className="cursor-target flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-semibold hover:shadow-lg hover:shadow-cyan-500/25 transition-all"
              >
                <Plus className="w-5 h-5" />
                Add Technology
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
                    {editingTechnology ? 'Edit Technology' : 'Create New Technology'}
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
                <TechnologyForm
                  technology={editingTechnology}
                  onSave={handleSave}
                  onCancel={handleCancel}
                  loading={formLoading}
                />
              </div>
            </div>
          )}

          {/* Technologies Grid */}
          {!showForm && (
            <>
              {technologies.length === 0 ? (
                <div className="text-center py-20">
                  <Code className={`w-20 h-20 mx-auto mb-4 ${
                    isDarkMode ? 'text-gray-500' : 'text-gray-400'
                  }`} />
                  <h3 className={`text-xl font-semibold mb-2 ${
                    isDarkMode ? 'text-gray-400' : 'text-gray-600'
                  }`}>
                    No Technologies Yet
                  </h3>
                  <p className={`mb-6 ${
                    isDarkMode ? 'text-gray-500' : 'text-gray-500'
                  }`}>
                    Get started by adding your first technology.
                  </p>
                  <button
                    onClick={handleCreate}
                    className="cursor-target inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-semibold hover:shadow-lg hover:shadow-cyan-500/25 transition-all"
                  >
                    <Plus className="w-5 h-5" />
                    Add Your First Technology
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                  {technologies.map((tech) => (
                    <div
                      key={tech.id}
                      className={`cursor-target group relative backdrop-blur-lg rounded-2xl border p-6 transition-all duration-500 transform hover:-translate-y-2 ${
                        isDarkMode
                          ? 'bg-white/5 border-blue-500/30 hover:border-cyan-400/50 hover:shadow-2xl hover:shadow-cyan-500/10'
                          : 'bg-white border-blue-200 hover:border-blue-400 hover:shadow-2xl hover:shadow-blue-500/10'
                      }`}
                    >
                      {/* Technology Image/Icon */}
                      <div className="mb-4 flex justify-center">
                        {tech.image_url ? (
                          <img
                            src={tech.image_url}
                            alt={tech.name}
                            className="w-20 h-20 object-contain group-hover:scale-110 transition-transform duration-300"
                          />
                        ) : (
                          <div className="w-20 h-20 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                            <Code className="w-10 h-10 text-white" />
                          </div>
                        )}
                      </div>

                      {/* Technology Name */}
                      <h3 className={`text-center text-lg font-bold group-hover:text-cyan-400 transition-colors mb-4 ${
                        isDarkMode ? 'text-white' : 'text-gray-900'
                      }`}>
                        {tech.name}
                      </h3>

                      {/* Actions */}
                      <div className={`flex items-center justify-center gap-2 pt-4 border-t ${
                        isDarkMode ? 'border-white/10' : 'border-gray-200'
                      }`}>
                        <button
                          onClick={() => handleEdit(tech)}
                          className={`cursor-target p-2 rounded-lg border transition-all ${
                            isDarkMode
                              ? 'bg-blue-600/20 hover:bg-blue-600/30 text-blue-300 border-blue-500/30'
                              : 'bg-blue-50 hover:bg-blue-100 text-blue-700 border-blue-200'
                          }`}
                          aria-label="Edit technology"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(tech.id)}
                          className={`cursor-target p-2 rounded-lg border transition-all ${
                            isDarkMode
                              ? 'bg-red-600/20 hover:bg-red-600/30 text-red-300 border-red-500/30'
                              : 'bg-red-50 hover:bg-red-100 text-red-700 border-red-200'
                          }`}
                          aria-label="Delete technology"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
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

export default Technologies