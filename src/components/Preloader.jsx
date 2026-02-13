import { useState, useEffect } from 'react';
import { useTheme } from '../contexts/ThemeContext';
import logoLight from '../assets/img/1.png';
import logoDark from '../assets/img/2.png';

const Preloader = () => {
  const { isDarkMode: drakeMode } = useTheme();
  const [progress, setProgress] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(timer);
          setTimeout(() => {
            setIsExiting(true);
            setTimeout(() => setIsLoaded(true), 600);
          }, 400);
          return 100;
        }
        // Smooth logarithmic progression
        const remaining = 100 - prev;
        const increment = Math.min(remaining * 0.1 + 0.5, 4);
        return prev + increment;
      });
    }, 60);

    return () => clearInterval(timer);
  }, []);

  const theme = {
    light: {
      bg: '#ffffff',
      surface: '#f8fafc',
      primary: '#2563eb',
      primaryLight: '#3b82f6',
      text: '#1e293b',
      textSecondary: '#64748b',
      border: '#e2e8f0'
    },
    dark: {
      bg: '#0f172a',
      surface: '#1e293b',
      primary: '#60a5fa',
      primaryLight: '#93c5fd',
      text: '#f1f5f9',
      textSecondary: '#94a3b8',
      border: '#334155'
    }
  };

  const currentTheme = drakeMode ? theme.dark : theme.light;

  if (isLoaded) return null;

  return (
    <div
      className={`fixed inset-0 flex items-center justify-center z-50 transition-all duration-500 ${isExiting ? 'opacity-0' : 'opacity-100'
        }`}
      style={{
        backgroundColor: currentTheme.bg,
        fontFamily: 'system-ui, -apple-system, sans-serif'
      }}
    >
      {/* Main Content */}
      <div className="flex flex-col items-center space-y-8 max-w-sm w-full px-8">

        {/* Logo with Elegant Animation */}
        <div className={`transition-all duration-700 ${isExiting ? 'scale-90 opacity-0 -translate-y-4' : 'scale-100 opacity-100 translate-y-0'
          }`}>
          <div className="relative">
            <img
              src={drakeMode ? logoDark : logoLight}
              alt="Zoubaa"
              className="h-12 w-auto mx-auto filter"
              style={{
                filter: `drop-shadow(0 4px 12px ${drakeMode ? 'rgba(96, 165, 250, 0.2)' : 'rgba(37, 99, 235, 0.15)'})`
              }}
            />
          </div>
        </div>

        {/* Progress Indicator */}
        <div className="w-full space-y-6">

          {/* Progress Bar */}
          <div className="relative">
            {/* Track */}
            <div
              className="w-full h-1 rounded-full overflow-hidden"
              style={{
                backgroundColor: drakeMode ? '#334155' : '#e2e8f0'
              }}
            >
              {/* Progress Fill */}
              <div
                className="h-full rounded-full transition-all duration-150 ease-out relative"
                style={{
                  width: `${progress}%`,
                  background: `linear-gradient(90deg, ${currentTheme.primary}, ${currentTheme.primaryLight})`,
                  boxShadow: `0 0 20px ${currentTheme.primary}40`
                }}
              >
                {/* Shimmer Effect */}
                <div
                  className="absolute inset-0 rounded-full bg-gradient-to-r from-transparent via-white/30 to-transparent"
                  style={{
                    animation: 'shimmer 1.5s ease-in-out infinite'
                  }}
                />
              </div>
            </div>

            {/* Progress Dots */}
            <div className="flex justify-between w-full mt-2">
              {[0, 25, 50, 75, 100].map((point) => (
                <div
                  key={point}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${progress >= point ? 'scale-125' : 'scale-100'
                    }`}
                  style={{
                    backgroundColor: progress >= point ? currentTheme.primary : currentTheme.textSecondary,
                    opacity: progress >= point ? 1 : 0.3
                  }}
                />
              ))}
            </div>
          </div>

          {/* Status Text */}
          <div className="text-center space-y-2">
            <div
              className="text-lg font-semibold transition-colors duration-300"
              style={{ color: currentTheme.text }}
            >
              {Math.round(progress)}%
            </div>
            <div
              className="text-sm transition-colors duration-300"
              style={{ color: currentTheme.textSecondary }}
            >
              {progress < 20 ? 'Loading resources' :
                progress < 40 ? 'Processing data' :
                  progress < 60 ? 'Optimizing performance' :
                    progress < 80 ? 'Finalizing setup' :
                      'Ready to launch'}
            </div>
          </div>
        </div>

        {/* Loading Animation */}
        <div className="relative w-16 h-16">
          {/* Outer Ring */}
          <div
            className="absolute inset-0 rounded-full border-2 transition-colors duration-300"
            style={{
              borderColor: `${currentTheme.primary}20`,
              animation: 'spin 3s linear infinite'
            }}
          />

          {/* Progress Ring */}
          <div
            className="absolute inset-0 rounded-full border-2 border-transparent transition-colors duration-300"
            style={{
              borderTopColor: currentTheme.primary,
              borderRightColor: currentTheme.primary,
              animation: 'spin 1.5s ease-in-out infinite',
              clipPath: `inset(0 0 0 ${100 - progress}%)`
            }}
          />

          {/* Center Dot */}
          <div
            className="absolute inset-0 m-auto w-1 h-1 rounded-full transition-colors duration-300"
            style={{
              backgroundColor: currentTheme.primary,
              animation: 'pulse 2s ease-in-out infinite'
            }}
          />
        </div>
      </div>

      {/* Background Pattern */}
      <div
        className="absolute inset-0 opacity-5 pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(${currentTheme.primary} 1px, transparent 1px)`,
          backgroundSize: '32px 32px'
        }}
      />

      <style>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        
        @keyframes pulse {
          0%, 100% { 
            opacity: 1;
            transform: scale(1);
          }
          50% { 
            opacity: 0.7;
            transform: scale(1.3);
          }
        }
        
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
      `}</style>
    </div>
  );
};

export default Preloader;