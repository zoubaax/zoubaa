import { useState, useEffect } from 'react'
import { Briefcase, Plus, Edit, Trash2, X } from 'lucide-react'

import { getExperiences, createExperience, updateExperience, deleteExperience } from '../../services/experiencesService'
import ExperienceForm from '../../components/dashboard/ExperienceForm'
import { useTheme } from '../../contexts/ThemeContext'

function Experiences() {
  const [experiences, setExperiences] = useState([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [editingExperience, setEditingExperience] = useState(null)
  const [formLoading, setFormLoading] = useState(false)
  const [error, setError] = useState(null)
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)
  const [expToDelete, setExpToDelete] = useState(null)
  const { isDarkMode } = useTheme()

  useEffect(() => {
    loadExperiences()
  }, [])

  const loadExperiences = async () => {
    setLoading(true)
    setError(null)
    const { data, error: fetchError } = await getExperiences()
    if (fetchError) {
      setError('Failed to load professional experiences')
      console.error(fetchError)
    } else {
      setExperiences(data || [])
    }
    setLoading(false)
  }

  const handleCreate = () => {
    setEditingExperience(null)
    setShowForm(true)
    setError(null)
  }

  const handleEdit = (experience) => {
    setEditingExperience(experience)
    setShowForm(true)
    setError(null)
  }

  const handleDeleteClick = (experience) => {
    setExpToDelete(experience)
    setShowDeleteConfirm(true)
  }

  const handleConfirmDelete = async () => {
    if (!expToDelete) return

    setError(null)
    const { success, error: deleteError } = await deleteExperience(expToDelete.id)
    if (deleteError) {
      setError('Failed to delete experience')
      console.error(deleteError)
    } else {
      await loadExperiences()
    }
    setShowDeleteConfirm(false)
    setExpToDelete(null)
  }

  const handleCancelDelete = () => {
    setShowDeleteConfirm(false)
    setExpToDelete(null)
  }

  const handleSave = async (formData, imageFile) => {
    setFormLoading(true)
    setError(null)

    try {
      if (editingExperience) {
        const { error: updateError } = await updateExperience(
          editingExperience.id,
          formData,
          imageFile,
          true
        )
        if (updateError) {
          setError('Failed to update experience')
          console.error(updateError)
        } else {
          setShowForm(false)
          setEditingExperience(null)
          await loadExperiences()
        }
      } else {
        const { error: createError } = await createExperience(formData, imageFile)
        if (createError) {
          setError('Failed to create experience')
          console.error(createError)
        } else {
          setShowForm(false)
          await loadExperiences()
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
    setEditingExperience(null)
    setError(null)
  }

  if (loading) {
    return (
      <div className={`relative min-h-full flex items-center justify-center ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
        <div className="text-lg">Loading experiences...</div>
      </div>
    )
  }

  return (
    <div className="relative min-h-full">
      {/* Delete Confirmation Pop-up */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={handleCancelDelete} />
          <div className={`relative z-10 w-full max-w-md rounded-2xl p-6 shadow-2xl border transition-colors duration-300 ${isDarkMode ? 'bg-[#0A1A4D] border-red-500/30' : 'bg-white border-red-200'}`}>
            <div className="text-center">
              <div className={`mx-auto flex items-center justify-center h-12 w-12 rounded-full ${isDarkMode ? 'bg-red-500/20' : 'bg-red-100'}`}>
                <Trash2 className={`h-6 w-6 ${isDarkMode ? 'text-red-400' : 'text-red-600'}`} />
              </div>
              <h3 className={`mt-4 text-lg font-semibold transition-colors duration-300 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                Delete Experience
              </h3>
              <p className={`mt-2 text-sm transition-colors duration-300 ${isDarkMode ? 'text-cyan-200' : 'text-gray-600'}`}>
                Are you sure you want to delete <strong>"{expToDelete?.title} at {expToDelete?.company}"</strong>? This action cannot be undone.
              </p>
            </div>
            <div className="mt-6 flex gap-3">
              <button
                onClick={handleCancelDelete}
                className={`cursor-target flex-1 py-2 px-4 rounded-lg border transition-all duration-300 hover:scale-105 ${isDarkMode ? 'bg-gray-600/20 hover:bg-gray-600/30 text-gray-300 border-gray-500/30' : 'bg-gray-100 hover:bg-gray-200 text-gray-700 border-gray-300'}`}
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmDelete}
                className={`cursor-target flex-1 py-2 px-4 rounded-lg border transition-all duration-300 hover:scale-105 ${isDarkMode ? 'bg-red-500/20 hover:bg-red-500/30 text-red-400 border-red-400/30' : 'bg-red-500/20 hover:bg-red-500/30 text-red-700 border-red-400/30'}`}
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
                <div className={`w-12 h-0.5 bg-gradient-to-r ${isDarkMode ? 'from-cyan-400 to-blue-500' : 'from-blue-500 to-cyan-500'}`}></div>
                <span className={`text-sm font-semibold tracking-widest uppercase ${isDarkMode ? 'text-cyan-400' : 'text-blue-600'}`}>
                  Work History
                </span>
                <div className={`w-12 h-0.5 bg-gradient-to-r ${isDarkMode ? 'from-blue-500 to-cyan-400' : 'from-cyan-500 to-blue-500'}`}></div>
              </div>
              <h1 className={`text-4xl font-bold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                Experiences
              </h1>
              <p className={`text-lg ${isDarkMode ? 'text-cyan-300' : 'text-gray-700'}`}>
                Manage your professional career history
              </p>
            </div>
            {!showForm && (
              <button
                onClick={handleCreate}
                className="cursor-target flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-semibold hover:shadow-lg hover:shadow-cyan-500/25 transition-all"
              >
                <Plus className="w-5 h-5" />
                Add Experience
              </button>
            )}
          </div>

          {/* Error Message */}
          {error && (
            <div className={`mb-6 p-4 rounded-xl border ${isDarkMode ? 'bg-red-500/20 border-red-500/50 text-red-200' : 'bg-red-50 border-red-200 text-red-700'}`}>
              {error}
            </div>
          )}

          {/* Form Modal */}
          {showForm && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
              <div className={`rounded-2xl border p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto ${isDarkMode ? 'bg-gray-900 border-white/10' : 'bg-white border-blue-200'}`}>
                <div className="flex items-center justify-between mb-6">
                  <h2 className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                    {editingExperience ? 'Edit Experience' : 'Create New Experience'}
                  </h2>
                  <button
                    onClick={handleCancel}
                    className={`p-2 rounded-lg transition-all ${isDarkMode ? 'text-white hover:bg-white/10' : 'text-gray-700 hover:bg-gray-200'}`}
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
                <ExperienceForm
                  experience={editingExperience}
                  onSave={handleSave}
                  onCancel={handleCancel}
                  loading={formLoading}
                />
              </div>
            </div>
          )}

          {/* Experiences Grid */}
          {!showForm && (
            <>
              {experiences.length === 0 ? (
                <div className="text-center py-20">
                  <Briefcase className={`w-20 h-20 mx-auto mb-4 ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`} />
                  <h3 className={`text-xl font-semibold mb-2 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                    No Experiences Yet
                  </h3>
                  <p className={`mb-6 ${isDarkMode ? 'text-gray-500' : 'text-gray-500'}`}>
                    Get started by adding your work history.
                  </p>
                  <button
                    onClick={handleCreate}
                    className="cursor-target inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-semibold hover:shadow-lg hover:shadow-cyan-500/25 transition-all"
                  >
                    <Plus className="w-5 h-5" />
                    Add Your First Experience
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {experiences.map((exp) => (
                    <div
                      key={exp.id}
                      className={`cursor-target group relative backdrop-blur-lg rounded-2xl border p-6 transition-all duration-500 transform hover:-translate-y-2 flex flex-col ${isDarkMode ? 'bg-white/5 border-blue-500/30 hover:border-cyan-400/50 hover:shadow-2xl hover:shadow-cyan-500/10' : 'bg-white border-blue-200 hover:border-blue-400 hover:shadow-2xl hover:shadow-blue-500/10'}`}
                    >
                      <div className="flex items-start gap-4 mb-4">
                        <div className="w-16 h-16 shrink-0 rounded-xl overflow-hidden bg-white flex items-center justify-center p-2">
                          {exp.image_url ? (
                            <img src={exp.image_url} alt={exp.company} className="w-full h-full object-contain" />
                          ) : (
                            <Briefcase className="w-8 h-8 text-gray-400" />
                          )}
                        </div>
                        <div>
                          <h3 className={`text-lg font-bold group-hover:text-cyan-400 transition-colors ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                            {exp.title}
                          </h3>
                          <p className={`font-medium ${isDarkMode ? 'text-cyan-300' : 'text-blue-600'}`}>
                            {exp.company}
                          </p>
                          <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                            {exp.duration}
                          </p>
                        </div>
                      </div>

                      {exp.description && (
                        <p className={`text-sm mb-4 line-clamp-3 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                          {exp.description}
                        </p>
                      )}

                      <div className="mt-auto pt-4 flex gap-2 flex-wrap">
                        {exp.skills?.slice(0, 3).map((skill, idx) => (
                          <span key={idx} className={`text-xs px-2 py-1 rounded-full ${isDarkMode ? 'bg-white/10 text-gray-300' : 'bg-gray-100 text-gray-600'}`}>
                            {skill}
                          </span>
                        ))}
                        {exp.skills?.length > 3 && (
                          <span className={`text-xs px-2 py-1 rounded-full ${isDarkMode ? 'bg-white/10 text-gray-300' : 'bg-gray-100 text-gray-600'}`}>
                            +{exp.skills.length - 3} more
                          </span>
                        )}
                      </div>

                      {/* Actions */}
                      <div className={`flex items-center justify-end gap-2 pt-4 mt-4 border-t ${isDarkMode ? 'border-white/10' : 'border-gray-200'}`}>
                        <button
                          onClick={() => handleEdit(exp)}
                          className={`cursor-target p-2 rounded-lg border transition-all ${isDarkMode ? 'bg-blue-600/20 hover:bg-blue-600/30 text-blue-300 border-blue-500/30' : 'bg-blue-50 hover:bg-blue-100 text-blue-700 border-blue-200'}`}
                          aria-label="Edit experience"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDeleteClick(exp)}
                          className={`cursor-target p-2 rounded-lg border transition-all ${isDarkMode ? 'bg-red-600/20 hover:bg-red-600/30 text-red-300 border-red-500/30' : 'bg-red-50 hover:bg-red-100 text-red-700 border-red-200'}`}
                          aria-label="Delete experience"
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

export default Experiences
