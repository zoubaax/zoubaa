import { useState, useEffect } from 'react'
import { X, Image as ImageIcon, Plus, Trash2, Check } from 'lucide-react'
import { getTechnologies } from '../../services/technologiesService'

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
const YEARS = Array.from({ length: 30 }, (_, i) => new Date().getFullYear() - i)
const JOB_TYPES = ['Full-time', 'Part-time', 'Contract', 'Freelance', 'Internship']

function ExperienceForm({ experience = null, onSave, onCancel, loading = false }) {
  const [formData, setFormData] = useState({
    title: '',
    company: '',
    type: 'Full-time',
    location: '',
    startMonth: 'Jan',
    startYear: new Date().getFullYear().toString(),
    endMonth: 'Present',
    endYear: '',
    description: '',
    achievements: [],
    skills: [],
    order: 0,
    image_path: null,
  })
  const [imageFile, setImageFile] = useState(null)
  const [imagePreview, setImagePreview] = useState(null)
  const [errors, setErrors] = useState({})
  
  const [availableTechs, setAvailableTechs] = useState([])
  const [techLoading, setTechLoading] = useState(true)

  useEffect(() => {
    getTechnologies().then(({ data }) => {
      if (data) setAvailableTechs(data)
      setTechLoading(false)
    })
  }, [])

  useEffect(() => {
    if (experience) {
      // Try to parse duration string (e.g. "Jan 2024 - Present" or "Jan 2024 — Dec 2024")
      let sMonth = 'Jan', sYear = new Date().getFullYear().toString(), eMonth = 'Present', eYear = ''
      if (experience.duration) {
        const parts = experience.duration.split(/[-—]/).map(p => p.trim())
        if (parts.length === 2) {
          const startParts = parts[0].split(' ')
          if (startParts.length >= 2) {
            sMonth = startParts[0]
            sYear = startParts[1]
          }
          if (parts[1].toLowerCase() === 'present') {
            eMonth = 'Present'
          } else {
            const endParts = parts[1].split(' ')
            if (endParts.length >= 2) {
              eMonth = endParts[0]
              eYear = endParts[1]
            }
          }
        }
      }

      setFormData({
        title: experience.title || '',
        company: experience.company || '',
        type: experience.type || 'Full-time',
        location: experience.location || '',
        startMonth: sMonth,
        startYear: sYear,
        endMonth: eMonth,
        endYear: eYear,
        description: experience.description || '',
        achievements: experience.achievements || [],
        skills: experience.skills || [],
        order: experience.order || 0,
        image_path: experience.image_path || null,
      })
      setImagePreview(experience.image_url || null)
    }
  }, [experience])

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: name === 'order' ? parseInt(value) || 0 : value }))
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: '' }))
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
      
      const reader = new FileReader()
      reader.onloadend = () => setImagePreview(reader.result)
      reader.readAsDataURL(file)
    }
  }

  const handleRemoveImage = () => {
    setImageFile(null)
    setImagePreview(experience?.image_url || null)
  }

  const addAchievement = () => {
    setFormData(prev => ({ ...prev, achievements: [...prev.achievements, ''] }))
  }

  const updateAchievement = (index, value) => {
    const newAchievements = [...formData.achievements]
    newAchievements[index] = value
    setFormData(prev => ({ ...prev, achievements: newAchievements }))
  }

  const removeAchievement = (index) => {
    setFormData(prev => ({
      ...prev,
      achievements: prev.achievements.filter((_, i) => i !== index)
    }))
  }

  const toggleSkill = (skillName) => {
    setFormData(prev => {
      const skills = prev.skills.includes(skillName)
        ? prev.skills.filter(s => s !== skillName)
        : [...prev.skills, skillName]
      return { ...prev, skills }
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    
    const newErrors = {}
    if (!formData.title.trim()) newErrors.title = 'Title is required'
    if (!formData.company.trim()) newErrors.company = 'Company is required'

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }

    // Construct duration string
    const endStr = formData.endMonth === 'Present' ? 'Present' : `${formData.endMonth} ${formData.endYear}`
    const durationStr = `${formData.startMonth} ${formData.startYear} — ${endStr}`

    // Clean empty achievements
    const cleanAchievements = formData.achievements.filter(a => a.trim() !== '')

    const processedFormData = {
      ...formData,
      duration: durationStr,
      achievements: cleanAchievements
    }

    onSave(processedFormData, imageFile)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Title */}
        <div>
          <label className="block text-sm font-semibold text-white mb-2">Job Title *</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleInputChange}
            className={`w-full px-4 py-3 rounded-xl bg-white/5 border-2 ${errors.title ? 'border-red-500/50' : 'border-white/10 focus:border-cyan-400'} text-white placeholder-gray-400 focus:outline-none transition-all`}
            placeholder="e.g. Full-Stack Developer"
          />
          {errors.title && <p className="mt-1 text-sm text-red-400">{errors.title}</p>}
        </div>

        {/* Company */}
        <div>
          <label className="block text-sm font-semibold text-white mb-2">Company *</label>
          <input
            type="text"
            name="company"
            value={formData.company}
            onChange={handleInputChange}
            className={`w-full px-4 py-3 rounded-xl bg-white/5 border-2 ${errors.company ? 'border-red-500/50' : 'border-white/10 focus:border-cyan-400'} text-white placeholder-gray-400 focus:outline-none transition-all`}
            placeholder="e.g. Fiverr - Freelance"
          />
          {errors.company && <p className="mt-1 text-sm text-red-400">{errors.company}</p>}
        </div>

        {/* Type */}
        <div>
          <label className="block text-sm font-semibold text-white mb-2">Job Type</label>
          <select
            name="type"
            value={formData.type}
            onChange={handleInputChange}
            className="w-full px-4 py-3 rounded-xl bg-[#0A1A4D] border-2 border-white/10 focus:border-cyan-400 text-white focus:outline-none transition-all"
          >
            {JOB_TYPES.map(type => <option key={type} value={type}>{type}</option>)}
          </select>
        </div>

        {/* Location */}
        <div>
          <label className="block text-sm font-semibold text-white mb-2">Location</label>
          <input
            type="text"
            name="location"
            value={formData.location}
            onChange={handleInputChange}
            className="w-full px-4 py-3 rounded-xl bg-white/5 border-2 border-white/10 focus:border-cyan-400 text-white placeholder-gray-400 focus:outline-none transition-all"
            placeholder="e.g. Remote"
          />
        </div>
      </div>

      {/* Duration Selectors */}
      <div>
        <label className="block text-sm font-semibold text-white mb-2">Duration *</label>
        <div className="flex flex-col sm:flex-row items-center gap-4">
          <div className="flex w-full sm:w-auto gap-2">
            <select name="startMonth" value={formData.startMonth} onChange={handleInputChange} className="w-full sm:w-auto px-4 py-3 rounded-xl bg-[#0A1A4D] border-2 border-white/10 focus:border-cyan-400 text-white focus:outline-none transition-all">
              {MONTHS.map(m => <option key={m} value={m}>{m}</option>)}
            </select>
            <select name="startYear" value={formData.startYear} onChange={handleInputChange} className="w-full sm:w-auto px-4 py-3 rounded-xl bg-[#0A1A4D] border-2 border-white/10 focus:border-cyan-400 text-white focus:outline-none transition-all">
              {YEARS.map(y => <option key={y} value={y}>{y}</option>)}
            </select>
          </div>
          <span className="text-gray-400 font-bold">—</span>
          <div className="flex w-full sm:w-auto gap-2">
            <select name="endMonth" value={formData.endMonth} onChange={handleInputChange} className="w-full sm:w-auto px-4 py-3 rounded-xl bg-[#0A1A4D] border-2 border-white/10 focus:border-cyan-400 text-white focus:outline-none transition-all">
              <option value="Present">Present</option>
              {MONTHS.map(m => <option key={m} value={m}>{m}</option>)}
            </select>
            {formData.endMonth !== 'Present' && (
              <select name="endYear" value={formData.endYear} onChange={handleInputChange} className="w-full sm:w-auto px-4 py-3 rounded-xl bg-[#0A1A4D] border-2 border-white/10 focus:border-cyan-400 text-white focus:outline-none transition-all">
                {YEARS.map(y => <option key={y} value={y}>{y}</option>)}
              </select>
            )}
          </div>
        </div>
      </div>

      {/* Description */}
      <div>
        <label className="block text-sm font-semibold text-white mb-2">Description</label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleInputChange}
          rows={3}
          className="w-full px-4 py-3 rounded-xl bg-white/5 border-2 border-white/10 focus:border-cyan-400 text-white placeholder-gray-400 focus:outline-none transition-all"
          placeholder="Providing full-stack development services..."
        />
      </div>

      {/* Key Achievements */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <label className="block text-sm font-semibold text-white">Key Achievements</label>
          <button type="button" onClick={addAchievement} className="text-xs flex items-center gap-1 text-cyan-400 hover:text-cyan-300">
            <Plus className="w-3 h-3" /> Add Bullet
          </button>
        </div>
        <div className="space-y-2">
          {formData.achievements.map((achievement, index) => (
            <div key={index} className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-blue-500 shrink-0"></div>
              <input
                type="text"
                value={achievement}
                onChange={(e) => updateAchievement(index, e.target.value)}
                className="flex-1 px-4 py-2 rounded-lg bg-white/5 border border-white/10 focus:border-cyan-400 text-white placeholder-gray-500 focus:outline-none"
                placeholder="Delivered successful projects..."
              />
              <button type="button" onClick={() => removeAchievement(index)} className="p-2 text-red-400 hover:text-red-300">
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          ))}
          {formData.achievements.length === 0 && (
            <p className="text-sm text-gray-500 italic">No achievements added. Click "Add Bullet" to create one.</p>
          )}
        </div>
      </div>

      {/* Technologies Multi-Select */}
      <div>
        <label className="block text-sm font-semibold text-white mb-2">Technologies / Skills</label>
        {techLoading ? (
          <p className="text-sm text-gray-400">Loading technologies...</p>
        ) : (
          <div className="flex flex-wrap gap-2 max-h-48 overflow-y-auto p-4 border-2 border-white/10 rounded-xl bg-white/5">
            {availableTechs.map(tech => {
              const isSelected = formData.skills.includes(tech.name)
              return (
                <button
                  type="button"
                  key={tech.id}
                  onClick={() => toggleSkill(tech.name)}
                  className={`flex items-center gap-2 px-3 py-1.5 rounded-lg border transition-all ${
                    isSelected
                      ? 'bg-blue-500/20 border-blue-400 text-white'
                      : 'bg-white/5 border-transparent text-gray-400 hover:bg-white/10'
                  }`}
                >
                  {tech.image_url ? (
                    <img src={tech.image_url} alt={tech.name} className="w-4 h-4 object-contain" />
                  ) : null}
                  <span className="text-sm font-medium">{tech.name}</span>
                  {isSelected && <Check className="w-3 h-3 text-blue-400" />}
                </button>
              )
            })}
            {availableTechs.length === 0 && (
              <p className="text-sm text-gray-500">No technologies found in the dashboard.</p>
            )}
          </div>
        )}
      </div>

      {/* Image Upload & Order */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-semibold text-white mb-2">Company Logo</label>
          {imagePreview ? (
            <div className="relative">
              <img src={imagePreview} alt="Preview" className="w-full h-32 object-contain rounded-xl border-2 border-white/10 bg-white/5 p-4" />
              <button type="button" onClick={handleRemoveImage} className="absolute top-2 right-2 p-2 rounded-lg bg-red-600/20 hover:bg-red-600/30 text-red-300 border border-red-500/30 transition-all">
                <X className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <label className="cursor-target flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-white/20 rounded-xl bg-white/5 hover:bg-white/10 transition-all">
              <ImageIcon className="w-8 h-8 text-gray-400 mb-2" />
              <p className="text-sm text-gray-400 font-semibold">Click to upload logo</p>
              <input type="file" accept="image/*" onChange={handleImageChange} className="hidden" />
            </label>
          )}
          {errors.image && <p className="mt-1 text-sm text-red-400">{errors.image}</p>}
        </div>

        <div>
          <label className="block text-sm font-semibold text-white mb-2">Display Order (Higher = First)</label>
          <input
            type="number"
            name="order"
            value={formData.order}
            onChange={handleInputChange}
            className="w-full px-4 py-3 rounded-xl bg-white/5 border-2 border-white/10 focus:border-cyan-400 text-white focus:outline-none transition-all"
          />
        </div>
      </div>

      {/* Actions */}
      <div className="flex gap-3 pt-4 border-t border-white/10">
        <button
          type="submit"
          disabled={loading}
          className="flex-1 px-6 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-semibold hover:shadow-lg hover:shadow-cyan-500/25 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? 'Saving...' : experience ? 'Update Experience' : 'Create Experience'}
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

export default ExperienceForm
