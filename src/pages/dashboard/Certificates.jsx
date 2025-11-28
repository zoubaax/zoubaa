import { useState, useEffect } from 'react'
import { Award, Calendar, ExternalLink, Plus, Edit, Trash2, X } from 'lucide-react'
import TargetCursor from '../../hooks/TargetCursor'
import { getCertificates, createCertificate, updateCertificate, deleteCertificate } from '../../services/certificatesService'
import CertificateForm from '../../components/dashboard/CertificateForm'

function Certificates() {
  const [certificates, setCertificates] = useState([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [editingCertificate, setEditingCertificate] = useState(null)
  const [formLoading, setFormLoading] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    loadCertificates()
  }, [])

  const loadCertificates = async () => {
    setLoading(true)
    setError(null)
    const { data, error: fetchError } = await getCertificates()
    if (fetchError) {
      setError('Failed to load certificates')
      console.error(fetchError)
    } else {
      setCertificates(data || [])
    }
    setLoading(false)
  }

  const handleCreate = () => {
    setEditingCertificate(null)
    setShowForm(true)
    setError(null)
  }

  const handleEdit = (certificate) => {
    setEditingCertificate(certificate)
    setShowForm(true)
    setError(null)
  }

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this certificate?')) {
      return
    }

    setError(null)
    const { success, error: deleteError } = await deleteCertificate(id)
    if (deleteError) {
      setError('Failed to delete certificate')
      console.error(deleteError)
    } else {
      await loadCertificates()
    }
  }

  const handleSave = async (formData, imageFile) => {
    setFormLoading(true)
    setError(null)

    try {
      if (editingCertificate) {
        // Update existing certificate
        const { data, error: updateError } = await updateCertificate(
          editingCertificate.id,
          formData,
          imageFile,
          true // delete old image
        )
        if (updateError) {
          setError('Failed to update certificate')
          console.error(updateError)
        } else {
          setShowForm(false)
          setEditingCertificate(null)
          await loadCertificates()
        }
      } else {
        // Create new certificate
        const { data, error: createError } = await createCertificate(formData, imageFile)
        if (createError) {
          setError('Failed to create certificate')
          console.error(createError)
        } else {
          setShowForm(false)
          await loadCertificates()
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
    setEditingCertificate(null)
    setError(null)
  }

  if (loading) {
    return (
      <div className="relative min-h-full flex items-center justify-center">
        <div className="text-white text-lg">Loading certificates...</div>
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
                <div className="w-12 h-0.5 bg-gradient-to-r from-cyan-400 to-blue-500"></div>
                <span className="text-sm font-semibold tracking-widest uppercase text-cyan-400">
                  Achievements
                </span>
                <div className="w-12 h-0.5 bg-gradient-to-r from-blue-500 to-cyan-400"></div>
              </div>
              <h1 className="text-4xl font-bold text-white mb-4">My Certificates</h1>
              <p className="text-gray-300 text-lg">
                Manage your professional certifications
              </p>
            </div>
            {!showForm && (
              <button
                onClick={handleCreate}
                className="cursor-target flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-semibold hover:shadow-lg hover:shadow-cyan-500/25 transition-all"
              >
                <Plus className="w-5 h-5" />
                Add Certificate
              </button>
            )}
          </div>

          {/* Error Message */}
          {error && (
            <div className="mb-6 p-4 rounded-xl bg-red-500/20 border border-red-500/50 text-red-200">
              {error}
            </div>
          )}

          {/* Form Modal */}
          {showForm && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
              <div className="bg-gray-900 rounded-2xl border border-white/10 p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-white">
                    {editingCertificate ? 'Edit Certificate' : 'Create New Certificate'}
                  </h2>
                  <button
                    onClick={handleCancel}
                    className="p-2 rounded-lg text-white hover:bg-white/10 transition-all"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
                <CertificateForm
                  certificate={editingCertificate}
                  onSave={handleSave}
                  onCancel={handleCancel}
                  loading={formLoading}
                />
              </div>
            </div>
          )}

          {/* Certificates Grid */}
          {!showForm && (
            <>
              {certificates.length === 0 ? (
                <div className="text-center py-20">
                  <Award className="w-20 h-20 text-gray-500 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-gray-400 mb-2">No Certificates Yet</h3>
                  <p className="text-gray-500 mb-6">Get started by adding your first certificate.</p>
                  <button
                    onClick={handleCreate}
                    className="cursor-target inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-semibold hover:shadow-lg hover:shadow-cyan-500/25 transition-all"
                  >
                    <Plus className="w-5 h-5" />
                    Add Your First Certificate
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {certificates.map((cert) => (
                    <div
                      key={cert.id}
                      className="cursor-target group relative bg-white/5 backdrop-blur-lg rounded-2xl border border-white/10 p-6 hover:border-cyan-400/50 hover:shadow-2xl hover:shadow-cyan-500/10 transition-all duration-500 transform hover:-translate-y-2"
                    >
                      {/* Certificate Image */}
                      {cert.image_url ? (
                        <div className="mb-4 rounded-xl overflow-hidden">
                          <img
                            src={cert.image_url}
                            alt={cert.title}
                            className="w-full h-48 object-contain bg-white/5"
                          />
                        </div>
                      ) : (
                        <div className="mb-4 flex justify-center">
                          <div className="w-20 h-20 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                            <Award className="w-10 h-10 text-white" />
                          </div>
                        </div>
                      )}

                      {/* Certificate Info */}
                      <div className="space-y-3">
                        <h3 className="text-xl font-bold text-white group-hover:text-cyan-400 transition-colors">
                          {cert.title}
                        </h3>
                        
                        <div className="space-y-2">
                          <div className="flex items-center gap-2 text-gray-300">
                            <Calendar className="w-4 h-4" />
                            <span className="text-sm">
                              {new Date(cert.created_at).toLocaleDateString('en-US', {
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric'
                              })}
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Actions */}
                      <div className="mt-6 flex gap-3">
                        {cert.show_url && (
                          <a
                            href={cert.show_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="cursor-target flex-1 flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-blue-600/20 hover:bg-blue-600/30 text-blue-300 border border-blue-500/30 transition-all group-hover:border-cyan-400/50"
                          >
                            <ExternalLink className="w-4 h-4" />
                            <span className="text-sm font-medium">Verify</span>
                          </a>
                        )}
                        <div className="flex gap-2">
                          <button
                            onClick={() => handleEdit(cert)}
                            className="cursor-target p-2 rounded-lg bg-blue-600/20 hover:bg-blue-600/30 text-blue-300 border border-blue-500/30 transition-all"
                            aria-label="Edit certificate"
                          >
                            <Edit className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDelete(cert.id)}
                            className="cursor-target p-2 rounded-lg bg-red-600/20 hover:bg-red-600/30 text-red-300 border border-red-500/30 transition-all"
                            aria-label="Delete certificate"
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

export default Certificates
