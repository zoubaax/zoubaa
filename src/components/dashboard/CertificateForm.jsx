import { useState, useEffect } from 'react'
import { X, Image as ImageIcon } from 'lucide-react'

function CertificateForm({ certificate = null, onSave, onCancel, loading = false }) {
  const [formData, setFormData] = useState({
    title: '',
    show_url: '',
    image_path: null,
  })
  const [imageFile, setImageFile] = useState(null)
  const [imagePreview, setImagePreview] = useState(null)
  const [errors, setErrors] = useState({})

  useEffect(() => {
    if (certificate) {
      setFormData({
        title: certificate.title || '',
        show_url: certificate.show_url || '',
        image_path: certificate.image_path || null,
      })
      setImagePreview(certificate.image_url || null)
    }
  }, [certificate])

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }))
    }
  }

  const handleImageChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      if (!file.type.startsWith('image/')) {
        setErrors((prev) => ({ ...prev, image: 'File must be an image' }))
        return
      }
      setImageFile(file)
      setErrors((prev) => ({ ...prev, image: '' }))
      
      // Create preview
      const reader = new FileReader()
      reader.onloadend = () => {
        setImagePreview(reader.result)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleRemoveImage = () => {
    setImageFile(null)
    setImagePreview(certificate?.image_url || null)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    
    // Validation
    const newErrors = {}
    if (!formData.title.trim()) {
      newErrors.title = 'Title is required'
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }

    onSave(formData, imageFile)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Title */}
      <div>
        <label className="block text-sm font-semibold text-white mb-2">
          Title *
        </label>
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleInputChange}
          className={`w-full px-4 py-3 rounded-xl bg-white/5 border-2 ${
            errors.title
              ? 'border-red-500/50'
              : 'border-white/10 focus:border-cyan-400'
          } text-white placeholder-gray-400 focus:outline-none transition-all`}
          placeholder="Enter certificate title"
        />
        {errors.title && (
          <p className="mt-1 text-sm text-red-400">{errors.title}</p>
        )}
      </div>

      {/* Show URL */}
      <div>
        <label className="block text-sm font-semibold text-white mb-2">
          Verification URL
        </label>
        <input
          type="url"
          name="show_url"
          value={formData.show_url}
          onChange={handleInputChange}
          className="w-full px-4 py-3 rounded-xl bg-white/5 border-2 border-white/10 focus:border-cyan-400 text-white placeholder-gray-400 focus:outline-none transition-all"
          placeholder="https://example.com/verify"
        />
      </div>

      {/* Image Upload */}
      <div>
        <label className="block text-sm font-semibold text-white mb-2">
          Certificate Image *
        </label>
        {imagePreview ? (
          <div className="relative">
            <img
              src={imagePreview}
              alt="Preview"
              className="w-full h-64 object-contain rounded-xl border-2 border-white/10 bg-white/5"
            />
            <button
              type="button"
              onClick={handleRemoveImage}
              className="absolute top-2 right-2 p-2 rounded-lg bg-red-600/20 hover:bg-red-600/30 text-red-300 border border-red-500/30 transition-all"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        ) : (
          <label className="cursor-target flex flex-col items-center justify-center w-full h-64 border-2 border-dashed border-white/20 rounded-xl bg-white/5 hover:bg-white/10 transition-all">
            <div className="flex flex-col items-center justify-center pt-5 pb-6">
              <ImageIcon className="w-10 h-10 text-gray-400 mb-2" />
              <p className="mb-2 text-sm text-gray-400">
                <span className="font-semibold">Click to upload</span> or drag and drop
              </p>
              <p className="text-xs text-gray-500">PNG, JPG, GIF (MAX. 5MB)</p>
            </div>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="hidden"
            />
          </label>
        )}
        {errors.image && (
          <p className="mt-1 text-sm text-red-400">{errors.image}</p>
        )}
        {!imagePreview && !imageFile && (
          <p className="mt-1 text-sm text-red-400">Certificate image is required</p>
        )}
      </div>

      {/* Actions */}
      <div className="flex gap-3 pt-4">
        <button
          type="submit"
          disabled={loading || (!imagePreview && !imageFile)}
          className="flex-1 px-6 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-semibold hover:shadow-lg hover:shadow-cyan-500/25 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? 'Saving...' : certificate ? 'Update Certificate' : 'Create Certificate'}
        </button>
        <button
          type="button"
          onClick={onCancel}
          disabled={loading}
          className="px-6 py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white border border-white/20 transition-all disabled:opacity-50"
        >
          Cancel
        </button>
      </div>
    </form>
  )
}

export default CertificateForm

