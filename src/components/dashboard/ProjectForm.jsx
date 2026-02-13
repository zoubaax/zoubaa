import { useState, useEffect } from 'react'
import { X, Image as ImageIcon, Check } from 'lucide-react'
import { getTechnologies } from '../../services/technologiesService'

function ProjectForm({ project = null, onSave, onCancel, loading = false }) {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    tagline: '',
    featuresText: '',
    technologyIds: [],
    category: 'fullstack',
    github_url: '',
    image_path: null,
    live_url: '',
    duration: '',
    team_size: '',
    role: '',
    challenges: '',
    solutions: '',
  })
  const [availableTechnologies, setAvailableTechnologies] = useState([])
  const [loadingTechnologies, setLoadingTechnologies] = useState(true)
  const [imageFile, setImageFile] = useState(null)
  const [imagePreview, setImagePreview] = useState(null)
  const [galleryFiles, setGalleryFiles] = useState([])
  const [galleryPreviews, setGalleryPreviews] = useState([])
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
        tagline: project.tagline || '',
        featuresText: Array.isArray(project.features) ? project.features.join('\n') : '',
        technologyIds: project.technologies ? project.technologies.map(t => t.id) : [],
        category: project.category || 'fullstack',
        github_url: project.github_url || '',
        image_path: project.image_path || null,
        live_url: project.live_url || '',
        duration: project.duration || '',
        team_size: project.team_size || '',
        role: project.role || '',
        challenges: project.challenges || '',
        solutions: project.solutions || '',
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

  const handleGalleryChange = (e) => {
    const files = Array.from(e.target.files || [])
    const validImages = files.filter((file) => file.type.startsWith('image/'))

    if (validImages.length === 0) {
      setErrors((prev) => ({ ...prev, gallery: 'Please select image files only' }))
      return
    }

    setGalleryFiles(validImages)
    setErrors((prev) => ({ ...prev, gallery: '' }))

    // Create previews
    const readers = []
    const previews = []

    validImages.forEach((file, index) => {
      const reader = new FileReader()
      readers.push(reader)
      reader.onloadend = () => {
        previews[index] = reader.result
        // When all readers have loaded, update state
        if (previews.filter(Boolean).length === validImages.length) {
          setGalleryPreviews(previews)
        }
      }
      reader.readAsDataURL(file)
    })
  }

  const handleClearGallery = () => {
    setGalleryFiles([])
    setGalleryPreviews([])
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

    const features = formData.featuresText
      ? formData.featuresText
          .split('\n')
          .map((f) => f.trim())
          .filter(Boolean)
      : []

    onSave(
      {
        ...formData,
        features,
      },
      imageFile,
      galleryFiles
    )
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

      {/* Short Tagline */}
      <div>
        <label className="block text-sm font-semibold text-white mb-2">
          Short Tagline
        </label>
        <input
          type="text"
          name="tagline"
          value={formData.tagline}
          onChange={handleInputChange}
          className="w-full px-4 py-3 rounded-xl bg-white/5 border-2 border-white/10 focus:border-cyan-400 text-white placeholder-gray-400 focus:outline-none transition-all"
          placeholder="e.g. Secure patient management system for modern clinics"
        />
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

      {/* Live URL */}
      <div>
        <label className="block text-sm font-semibold text-white mb-2">
          Live Project URL
        </label>
        <input
          type="url"
          name="live_url"
          value={formData.live_url}
          onChange={handleInputChange}
          className="w-full px-4 py-3 rounded-xl bg-white/5 border-2 border-white/10 focus:border-cyan-400 text-white placeholder-gray-400 focus:outline-none transition-all"
          placeholder="https://your-live-project.com"
        />
      </div>

      {/* Key Features */}
      <div>
        <label className="block text-sm font-semibold text-white mb-2">
          Key Features (one per line)
        </label>
        <textarea
          name="featuresText"
          value={formData.featuresText}
          onChange={handleInputChange}
          rows={3}
          className="w-full px-4 py-3 rounded-xl bg-white/5 border-2 border-white/10 focus:border-cyan-400 text-white placeholder-gray-400 focus:outline-none transition-all resize-none"
          placeholder={`Real-time appointment scheduling\nRole-based access control\nAutomated reporting`}
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

      {/* Metadata: Duration, Team size, Role */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-semibold text-white mb-2">
            Duration
          </label>
          <input
            type="text"
            name="duration"
            value={formData.duration}
            onChange={handleInputChange}
            className="w-full px-4 py-3 rounded-xl bg-white/5 border-2 border-white/10 focus:border-cyan-400 text-white placeholder-gray-400 focus:outline-none transition-all"
            placeholder="e.g. 3 months"
          />
        </div>
        <div>
          <label className="block text-sm font-semibold text-white mb-2">
            Team Size
          </label>
          <input
            type="text"
            name="team_size"
            value={formData.team_size}
            onChange={handleInputChange}
            className="w-full px-4 py-3 rounded-xl bg-white/5 border-2 border-white/10 focus:border-cyan-400 text-white placeholder-gray-400 focus:outline-none transition-all"
            placeholder="e.g. Solo, 3 people"
          />
        </div>
        <div>
          <label className="block text-sm font-semibold text-white mb-2">
            My Role
          </label>
          <input
            type="text"
            name="role"
            value={formData.role}
            onChange={handleInputChange}
            className="w-full px-4 py-3 rounded-xl bg-white/5 border-2 border-white/10 focus:border-cyan-400 text-white placeholder-gray-400 focus:outline-none transition-all"
            placeholder="e.g. Full‑stack developer"
          />
        </div>
      </div>

      {/* Challenges & Solutions */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-semibold text-white mb-2">
            Main Challenges
          </label>
          <textarea
            name="challenges"
            value={formData.challenges}
            onChange={handleInputChange}
            rows={3}
            className="w-full px-4 py-3 rounded-xl bg-white/5 border-2 border-white/10 focus:border-cyan-400 text-white placeholder-gray-400 focus:outline-none transition-all resize-none"
            placeholder="What were the hardest parts of this project?"
          />
        </div>
        <div>
          <label className="block text-sm font-semibold text-white mb-2">
            Solutions / Impact
          </label>
          <textarea
            name="solutions"
            value={formData.solutions}
            onChange={handleInputChange}
            rows={3}
            className="w-full px-4 py-3 rounded-xl bg-white/5 border-2 border-white/10 focus:border-cyan-400 text-white placeholder-gray-400 focus:outline-none transition-all resize-none"
            placeholder="How did you solve those challenges? What was the result?"
          />
        </div>
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

      {/* Gallery Upload */}
      <div>
        <label className="block text-sm font-semibold text-white mb-2">
          Additional Project Images (Gallery)
        </label>
        {galleryPreviews.length > 0 ? (
          <div>
            <div className="grid grid-cols-2 gap-3 mb-3">
              {galleryPreviews.map((preview, index) => (
                <div key={index} className="relative">
                  <img
                    src={preview}
                    alt={`Gallery preview ${index + 1}`}
                    className="w-full h-32 object-cover rounded-xl border-2 border-white/10"
                  />
                </div>
              ))}
            </div>
            <button
              type="button"
              onClick={handleClearGallery}
              className="px-3 py-2 rounded-lg bg-white/10 hover:bg-white/20 text-white text-sm border border-white/20 transition-all"
            >
              Clear gallery selection
            </button>
            <p className="mt-2 text-xs text-gray-400">
              Uploading new gallery images will replace any existing gallery for this project.
            </p>
          </div>
        ) : (
          <label className="cursor-target flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-white/20 rounded-xl bg-white/5 hover:bg-white/10 transition-all">
            <div className="flex flex-col items-center justify-center pt-3 pb-4">
              <ImageIcon className="w-8 h-8 text-gray-400 mb-2" />
              <p className="mb-1 text-sm text-gray-400">
                <span className="font-semibold">Click to upload</span> or drag and drop
              </p>
              <p className="text-xs text-gray-500">You can select multiple images (MAX. 5MB each)</p>
            </div>
            <input
              type="file"
              accept="image/*"
              multiple
              onChange={handleGalleryChange}
              className="hidden"
            />
          </label>
        )}
        {errors.gallery && (
          <p className="mt-1 text-sm text-red-400">{errors.gallery}</p>
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
