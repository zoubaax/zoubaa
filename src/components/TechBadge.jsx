import { memo } from 'react'

const TechBadge = ({ name, imageUrl, darkMode }) => {
  if (!name) return null

  return (
    <span
      className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium border transition-colors ${
        darkMode
          ? 'bg-gray-900/70 border-gray-700 text-gray-100'
          : 'bg-white border-gray-200 text-gray-800'
      }`}
    >
      {imageUrl ? (
        <img
          src={imageUrl}
          alt={name}
          className="w-4 h-4 object-contain rounded-sm"
          onError={(e) => {
            e.target.style.display = 'none'
          }}
        />
      ) : (
        <span className="w-4 h-4 flex items-center justify-center text-[9px] font-bold rounded bg-current/10">
          {name.charAt(0).toUpperCase()}
        </span>
      )}
      <span className="truncate max-w-[120px]">{name}</span>
    </span>
  )
}

export default memo(TechBadge)


