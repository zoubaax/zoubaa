import { AlertTriangle } from 'lucide-react'
import { useTheme } from '../contexts/ThemeContext'

const ErrorState = ({ message, onRetry, onBack }) => {
  const { isDarkMode: darkMode } = useTheme()
  return (
    <div className="text-center space-y-6">
      <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-red-100 dark:bg-red-900/30">
        <AlertTriangle className="w-8 h-8 text-red-500 dark:text-red-400" />
      </div>
      <div className="space-y-2">
        <h2
          className={`text-xl font-semibold ${darkMode ? 'text-white' : 'text-gray-900'
            }`}
        >
          Something went wrong
        </h2>
        <p
          className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'
            }`}
        >
          {message}
        </p>
      </div>
      <div className="flex flex-wrap justify-center gap-3">
        {onRetry && (
          <button
            type="button"
            onClick={onRetry}
            className={`inline-flex items-center justify-center px-5 py-2.5 rounded-xl text-sm font-medium shadow-sm transition-colors ${darkMode
                ? 'bg-blue-600 hover:bg-blue-500 text-white'
                : 'bg-blue-600 hover:bg-blue-500 text-white'
              }`}
          >
            Try again
          </button>
        )}
        {onBack && (
          <button
            type="button"
            onClick={onBack}
            className={`inline-flex items-center justify-center px-5 py-2.5 rounded-xl text-sm font-medium border transition-colors ${darkMode
                ? 'border-gray-700 hover:bg-gray-800 text-gray-200'
                : 'border-gray-300 hover:bg-white text-gray-700'
              }`}
          >
            Go back
          </button>
        )}
      </div>
    </div>
  )
}

export default ErrorState


