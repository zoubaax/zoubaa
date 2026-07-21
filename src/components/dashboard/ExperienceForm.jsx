import { useState, useEffect } from 'react'
import { X, Image as ImageIcon, Plus, Trash2, Check } from 'lucide-react'
import { getTechnologies } from '../../services/technologiesService'
import { useTheme } from '../../contexts/ThemeContext'

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
const YEARS = Array.from({ length: 30 }, (_, i) => new Date().getFullYear() - i)
const JOB_TYPES = ['Full-time', 'Part-time', 'Contract', 'Freelance', 'Internship']

function ExperienceForm({ experience = null, onSave, onCancel, loading = false }) {
  const { isDarkMode } = useTheme()
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

  // Reusable theme-aware class helpers
  const label = `block text-sm font-semibold mb-2 ${isDarkMode ? 'text-white' : 'text-gray-700'}`
  const input = `w-full px-4 py-3 rounded-xl border-2 focus:outline-none transition-all ${isDarkMode ? 'bg-white/5 border-white/10 focus:border-cyan-400 text-white placeholder-gray-400' : 'bg-white border-gray-300 focus:border-blue-500 text-gray-900 placeholder-gray-400'}`
  const select = `w-full px-4 py-3 rounded-xl border-2 focus:outline-none transition-all ${isDarkMode ? 'bg-[#0A1A4D] border-white/10 focus:border-cyan-400 text-white' : 'bg-white border-gray-300 focus:border-blue-500 text-gray-900'}`

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Title */}
        <div>
          <label className={label}>Job Title *</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleInputChange}
            className={`${input} ${errors.title ? 'border-red-500' : ''}`}
            placeholder="e.g. Full-Stack Developer"
          />
          {errors.title && <p className="mt-1 text-sm text-red-500">{errors.title}</p>}
        </div>

        {/* Company */}
        <div>
          <label className={label}>Company *</label>
          <input
            type="text"
            name="company"
            value={formData.company}
            onChange={handleInputChange}
            className={`${input} ${errors.company ? 'border-red-500' : ''}`}
            placeholder="e.g. Fiverr - Freelance"
          />
          {errors.company && <p className="mt-1 text-sm text-red-500">{errors.company}</p>}
        </div>

        {/* Type */}
        <div>
          <label className={label}>Job Type</label>
          <select name="type" value={formData.type} onChange={handleInputChange} className={select}>
            {JOB_TYPES.map(type => <option key={type} value={type}>{type}</option>)}
          </select>
        </div>

        {/* Location */}
        <div>
          <label className={label}>Location</label>
          <input
            type="text"
            name="location"
            value={formData.location}
            onChange={handleInputChange}
            className={input}
            placeholder="e.g. Remote"
          />
        </div>
      </div>

      {/* Duration Selectors */}
      <div>
        <label className={label}>Duration *</label>
        <div className="flex flex-col sm:flex-row items-center gap-4">
          <div className="flex w-full sm:w-auto gap-2">
            <select name="startMonth" value={formData.startMonth} onChange={handleInputChange} className={`${select} sm:w-auto`}>
              {MONTHS.map(m => <option key={m} value={m}>{m}</option>)}
            </select>
            <select name="startYear" value={formData.startYear} onChange={handleInputChange} className={`${select} sm:w-auto`}>
              {YEARS.map(y => <option key={y} value={y}>{y}</option>)}
            </select>
          </div>
          <span className={`font-bold ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>—</span>
          <div className="flex w-full sm:w-auto gap-2">
            <select name="endMonth" value={formData.endMonth} onChange={handleInputChange} className={`${select} sm:w-auto`}>
              <option value="Present">Present</option>
              {MONTHS.map(m => <option key={m} value={m}>{m}</option>)}
            </select>
            {formData.endMonth !== 'Present' && (
              <select name="endYear" value={formData.endYear} onChange={handleInputChange} className={`${select} sm:w-auto`}>
                {YEARS.map(y => <option key={y} value={y}>{y}</option>)}
              </select>
            )}
          </div>
        </div>
      </div>

      {/* Description */}
      <div>
        <label className={label}>Description</label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleInputChange}
          rows={3}
          className={input}
          placeholder="Providing full-stack development services..."
        />
      </div>

      {/* Key Achievements */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <label className={label}>Key Achievements</label>
          <button type="button" onClick={addAchievement} className="text-xs flex items-center gap-1 text-cyan-500 hover:text-cyan-400">
            <Plus className="w-3 h-3" /> Add Bullet
          </button>
        </div>
        <div className="space-y-2">
          {formData.achievements.map((achievement, index) => (
            <div key={index} className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-blue-500 shrink-0" />
              <input
                type="text"
                value={achievement}
                onChange={(e) => updateAchievement(index, e.target.value)}
                className={`flex-1 px-4 py-2 rounded-lg border focus:outline-none transition-all ${isDarkMode ? 'bg-white/5 border-white/10 focus:border-cyan-400 text-white placeholder-gray-500' : 'bg-white border-gray-300 focus:border-blue-500 text-gray-900 placeholder-gray-400'}`}
                placeholder="Delivered successful projects..."
              />
              <button type="button" onClick={() => removeAchievement(index)} className="p-2 text-red-400 hover:text-red-500">
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          ))}
          {formData.achievements.length === 0 && (
            <p className={`text-sm italic ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`}>No achievements added. Click "Add Bullet" to create one.</p>
          )}
        </div>
      </div>

      {/* Technologies Multi-Select */}
      <div>
        <label className={label}>Technologies / Skills</label>
        {techLoading ? (
          <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Loading technologies...</p>
        ) : (
          <div className={`flex flex-wrap gap-2 max-h-48 overflow-y-auto p-4 border-2 rounded-xl ${isDarkMode ? 'border-white/10 bg-white/5' : 'border-gray-200 bg-gray-50'}`}>
            {availableTechs.map(tech => {
              const isSelected = formData.skills.includes(tech.name)
              return (
                <button
                  type="button"
                  key={tech.id}
                  onClick={() => toggleSkill(tech.name)}
                  className={`flex items-center gap-2 px-3 py-1.5 rounded-lg border transition-all ${
                    isSelected
                      ? isDarkMode
                        ? 'bg-blue-500/20 border-blue-400 text-white'
                        : 'bg-blue-50 border-blue-400 text-blue-700'
                      : isDarkMode
                        ? 'bg-white/5 border-transparent text-gray-400 hover:bg-white/10'
                        : 'bg-white border-gray-200 text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  {tech.image_url && <img src={tech.image_url} alt={tech.name} className="w-4 h-4 object-contain" />}
                  <span className="text-sm font-medium">{tech.name}</span>
                  {isSelected && <Check className="w-3 h-3 text-blue-400" />}
                </button>
              )
            })}
            {availableTechs.length === 0 && (
              <p className={`text-sm ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`}>No technologies found in the dashboard.</p>
            )}
          </div>
        )}
      </div>

      {/* Image Upload & Order */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className={label}>Company Logo</label>
          {imagePreview ? (
            <div className="relative">
              <img src={imagePreview} alt="Preview" className={`w-full h-32 object-contain rounded-xl border-2 p-4 ${isDarkMode ? 'border-white/10 bg-white/5' : 'border-gray-200 bg-gray-50'}`} />
              <button type="button" onClick={handleRemoveImage} className="absolute top-2 right-2 p-2 rounded-lg bg-red-500/20 hover:bg-red-500/30 text-red-400 border border-red-400/30 transition-all">
                <X className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <label className={`cursor-target flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-xl transition-all ${isDarkMode ? 'border-white/20 bg-white/5 hover:bg-white/10' : 'border-gray-300 bg-gray-50 hover:bg-gray-100'}`}>
              <ImageIcon className={`w-8 h-8 mb-2 ${isDarkMode ? 'text-gray-400' : 'text-gray-400'}`} />
              <p className={`text-sm font-semibold ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Click to upload logo</p>
              <input type="file" accept="image/*" onChange={handleImageChange} className="hidden" />
            </label>
          )}
          {errors.image && <p className="mt-1 text-sm text-red-500">{errors.image}</p>}
        </div>

        <div>
          <label className={label}>Display Order (Higher = First)</label>
          <input
            type="number"
            name="order"
            value={formData.order}
            onChange={handleInputChange}
            className={input}
          />
        </div>
      </div>

      {/* Actions */}
      <div className={`flex gap-3 pt-4 border-t ${isDarkMode ? 'border-white/10' : 'border-gray-200'}`}>
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
          className={`px-6 py-3 rounded-xl border transition-all disabled:opacity-50 ${isDarkMode ? 'bg-white/10 hover:bg-white/20 text-white border-white/20' : 'bg-gray-100 hover:bg-gray-200 text-gray-700 border-gray-300'}`}
        >
          Cancel
        </button>
      </div>
    </form>
  )
}

export default ExperienceForm
