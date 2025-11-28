import { useState, useEffect } from 'react'
import { X, Image as ImageIcon, Check } from 'lucide-react'
import { getTechnologies } from '../../services/technologiesService'

function ProjectForm({ project = null, onSave, onCancel, loading = false }) {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    technologyIds: [],
    category: 'fullstack',
    github_url: '',
    image_path: null,
  })
  const [availableTechnologies, setAvailableTechnologies] = useState([])
  const [loadingTechnologies, setLoadingTechnologies] = useState(true)
  const [imageFile, setImageFile] = useState(null)
  const [imagePreview, setImagePreview] = useState(null)
  const [errors, setErrors] = useState({})

  useEffect(() => {
    const fetchTechnologies = async () => {
      setLoadingTechnologies(true)
      const { data } = await getTechnologies()
      if (data) {
        setAvailableTechnologies(data)
      }
      setLoadingTechnologies(false)
    }
    fetchTechnologies()
  }, [])

  useEffect(() => {
    if (project) {
      setFormData({
        title: project.title || '',
        description: project.description || '',
        technologyIds: project.technologies ? project.technologies.map(t => t.id) : [],
        category: project.category || 'fullstack',
        github_url: project.github_url || '',
        image_path: project.image_path || null,
      })
      setImagePreview(project.image_url || null)
    }
  }, [project])

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
    setImagePreview(project?.image_url || null)
  }

  const handleToggleTechnology = (techId) => {
    setFormData((prev) => {
      const isSelected = prev.technologyIds.includes(techId)
      return {
        ...prev,
        technologyIds: isSelected
          ? prev.technologyIds.filter((id) => id !== techId)
          : [...prev.technologyIds, techId],
      }
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    
    // Validation
    const newErrors = {}
    if (!formData.title.trim()) {
      newErrors.title = 'Title is required'
    }
    if (!formData.description.trim()) {
      newErrors.description = 'Description is required'
    }
    if (!formData.category) {
      newErrors.category = 'Category is required'
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
          placeholder="Enter project title"
        />
        {errors.title && (
          <p className="mt-1 text-sm text-red-400">{errors.title}</p>
        )}
      </div>

      {/* Description */}
      <div>
        <label className="block text-sm font-semibold text-white mb-2">
          Description *
        </label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleInputChange}
          rows={4}
          className={`w-full px-4 py-3 rounded-xl bg-white/5 border-2 ${
            errors.description
              ? 'border-red-500/50'
              : 'border-white/10 focus:border-cyan-400'
          } text-white placeholder-gray-400 focus:outline-none transition-all resize-none`}
          placeholder="Enter project description"
        />
        {errors.description && (
          <p className="mt-1 text-sm text-red-400">{errors.description}</p>
        )}
      </div>

      {/* Category */}
      <div>
        <label className="block text-sm font-semibold text-white mb-2">
          Category *
        </label>
        <select
          name="category"
          value={formData.category}
          onChange={handleInputChange}
          className={`w-full px-4 py-3 rounded-xl bg-white/5 border-2 ${
            errors.category
              ? 'border-red-500/50'
              : 'border-white/10 focus:border-cyan-400'
          } text-white focus:outline-none transition-all`}
        >
          <option value="fullstack">Fullstack</option>
          <option value="AI/ML">AI/ML</option>
          <option value="data">Data</option>
        </select>
        {errors.category && (
          <p className="mt-1 text-sm text-red-400">{errors.category}</p>
        )}
      </div>

      {/* GitHub URL */}
      <div>
        <label className="block text-sm font-semibold text-white mb-2">
          GitHub URL
        </label>
        <input
          type="url"
          name="github_url"
          value={formData.github_url}
          onChange={handleInputChange}
          className="w-full px-4 py-3 rounded-xl bg-white/5 border-2 border-white/10 focus:border-cyan-400 text-white placeholder-gray-400 focus:outline-none transition-all"
          placeholder="https://github.com/username/repo"
        />
      </div>

      {/* Technologies Selection */}
      <div>
        <label className="block text-sm font-semibold text-white mb-2">
          Technologies
        </label>
        {loadingTechnologies ? (
          <div className="text-gray-400 text-sm">Loading technologies...</div>
        ) : availableTechnologies.length === 0 ? (
          <div className="text-gray-400 text-sm mb-2">
            No technologies available. Add technologies first to link them to projects.
          </div>
        ) : (
          <div className="max-h-48 overflow-y-auto border-2 border-white/10 rounded-xl bg-white/5 p-3 space-y-2">
            {availableTechnologies.map((tech) => {
              const isSelected = formData.technologyIds.includes(tech.id)
              return (
                <button
                  key={tech.id}
                  type="button"
                  onClick={() => handleToggleTechnology(tech.id)}
                  className={`cursor-target w-full flex items-center gap-3 px-4 py-2 rounded-lg transition-all ${
                    isSelected
                      ? 'bg-blue-600/30 border-2 border-blue-500/50'
                      : 'bg-white/5 border-2 border-white/10 hover:border-cyan-400/50'
                  }`}
                >
                  {tech.image_url ? (
                    <img
                      src={tech.image_url}
                      alt={tech.name}
                      className="w-8 h-8 object-contain"
                    />
                  ) : (
                    <div className="w-8 h-8 rounded bg-white/10 flex items-center justify-center">
                      <span className="text-xs text-white">{tech.name.charAt(0)}</span>
                    </div>
                  )}
                  <span className="flex-1 text-left text-white font-medium">{tech.name}</span>
                  {isSelected && (
                    <Check className="w-5 h-5 text-blue-400" />
                  )}
                </button>
              )
            })}
          </div>
        )}
        {formData.technologyIds.length > 0 && (
          <p className="mt-2 text-sm text-gray-400">
            {formData.technologyIds.length} technology{formData.technologyIds.length !== 1 ? 'ies' : ''} selected
          </p>
        )}
      </div>

      {/* Image Upload */}
      <div>
        <label className="block text-sm font-semibold text-white mb-2">
          Project Image
        </label>
        {imagePreview ? (
          <div className="relative">
            <img
              src={imagePreview}
              alt="Preview"
              className="w-full h-48 object-cover rounded-xl border-2 border-white/10"
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
          <label className="cursor-target flex flex-col items-center justify-center w-full h-48 border-2 border-dashed border-white/20 rounded-xl bg-white/5 hover:bg-white/10 transition-all">
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
      </div>

      {/* Actions */}
      <div className="flex gap-3 pt-4">
        <button
          type="submit"
          disabled={loading}
          className="flex-1 px-6 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-semibold hover:shadow-lg hover:shadow-cyan-500/25 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? 'Saving...' : project ? 'Update Project' : 'Create Project'}
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

export default ProjectForm
