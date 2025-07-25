import React, { useState, useEffect } from 'react';

const Preloader = () => {
  const [progress, setProgress] = useState(0);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isExiting, setIsExiting] = useState(false);

  // Simulate loading progress with more realistic timing
  useEffect(() => {
    const timer = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(timer);
          setTimeout(() => {
            setIsExiting(true);
            setTimeout(() => setIsLoaded(true), 800);
          }, 300);
          return 100;
        }
        // More realistic loading curve
        const increment = prev < 30 ? Math.random() * 5 : 
                         prev < 70 ? Math.random() * 3 : 
                         Math.random() * 1.5;
        return Math.min(prev + increment, 100);
      });
    }, 80);

    return () => clearInterval(timer);
  }, []);

  // Check for system dark mode preference
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    setIsDarkMode(mediaQuery.matches);
    
    const handleChange = (e) => setIsDarkMode(e.matches);
    mediaQuery.addEventListener('change', handleChange);
    
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  const theme = {
    light: {
      bg: '#F8F5F0',
      accent: '#4C7766',
      accentLight: '#6B9B7A',
      text: '#4C7766',
      textSecondary: '#8BA898',
      shadow: 'rgba(76, 119, 102, 0.15)',
      glowShadow: 'rgba(107, 155, 122, 0.4)',
      cardBg: 'rgba(255, 255, 255, 0.7)',
      progressTrack: 'rgba(107, 155, 122, 0.1)'
    },
    dark: {
      bg: '#0A0A0A',
      accent: '#7AB88F',
      accentLight: '#9DD4A8',
      text: '#7AB88F',
      textSecondary: '#5A8A6B',
      shadow: 'rgba(122, 184, 143, 0.2)',
      glowShadow: 'rgba(157, 212, 168, 0.5)',
      cardBg: 'rgba(20, 20, 20, 0.7)',
      progressTrack: 'rgba(122, 184, 143, 0.1)'
    }
  };

  const currentTheme = isDarkMode ? theme.dark : theme.light;

  const nameLetters = ['Z', 'O', 'U', 'B', 'A', 'A'];

  if (isLoaded) return null;

  return (
    <div 
      className={`fixed inset-0 flex items-center justify-center transition-all duration-500 z-50 ${
        isExiting ? 'opacity-0 scale-95' : 'opacity-100 scale-100'
      }`}
      style={{ 
        backgroundColor: currentTheme.bg,
        fontFamily: '"Poppins", "Inter", "Helvetica Neue", sans-serif',
        willChange: 'opacity, transform'
      }}
      role="status"
      aria-live="polite"
      aria-label={`Loading ${Math.round(progress)}% complete`}
    >
      {/* Animated background gradient */}
      <div 
        className="absolute inset-0 opacity-20 transition-opacity duration-1000"
        style={{
          background: `radial-gradient(circle at 50% 50%, ${currentTheme.accent}20 0%, transparent 70%)`,
          animation: 'gradientPulse 8s ease infinite alternate'
        }}
      />

      {/* Main container with glass morphism effect */}
      <div 
        className={`relative flex flex-col items-center space-y-12 p-8 sm:p-12 rounded-3xl backdrop-blur-lg border transition-all duration-300 ${
          isExiting ? 'scale-90 opacity-0' : 'scale-100 opacity-100'
        }`}
        style={{ 
          backgroundColor: currentTheme.cardBg,
          borderColor: `${currentTheme.accent}30`,
          boxShadow: `0 25px 50px ${currentTheme.shadow}, 
                     inset 0 1px 1px ${isDarkMode ? 'rgba(255,255,255,0.05)' : 'rgba(255,255,255,0.3)'}`,
          minWidth: '300px',
          maxWidth: '90vw'
        }}
      >
        
        {/* Brand name with letter animation */}
        <div className="flex items-center space-x-1 sm:space-x-2 mb-2 sm:mb-4">
          {nameLetters.map((letter, index) => (
            <span
              key={index}
              className="text-3xl sm:text-4xl font-bold tracking-wider transform transition-all duration-300"
              style={{
                color: currentTheme.accent,
                textShadow: `0 0 15px ${currentTheme.glowShadow}`,
                animation: `letterFloat ${2 + index * 0.1}s ease-in-out infinite`,
                animationDelay: `${index * 0.1}s`,
                fontWeight: '700'
              }}
            >
              {letter}
            </span>
          ))}
        </div>

        {/* Enhanced morphing loader */}
        <div className="relative w-24 h-24 sm:w-32 sm:h-32 flex items-center justify-center">
          {/* Outer orbit rings */}
          {[0, 1, 2].map((ring) => (
            <div
              key={ring}
              className="absolute rounded-full border transition-all duration-500"
              style={{
                width: `${100 + ring * 20}%`,
                height: `${100 + ring * 20}%`,
                borderColor: `${currentTheme.accent}${ring === 0 ? '40' : ring === 1 ? '30' : '20'}`,
                animation: `orbit${ring} ${4 + ring}s linear infinite`,
                opacity: 0.6 - ring * 0.2
              }}
            />
          ))}
          
          {/* Main morphing elements */}
          <div className="relative w-12 h-12 sm:w-16 sm:h-16 flex items-center justify-center">
            {[0, 1, 2, 3, 4].map((index) => (
              <div
                key={index}
                className="absolute rounded-full transition-all duration-300"
                style={{
                  width: `${10 + index * 2}px`,
                  height: `${10 + index * 2}px`,
                  background: `linear-gradient(135deg, ${currentTheme.accent}, ${currentTheme.accentLight})`,
                  boxShadow: `0 0 ${15 + index * 5}px ${currentTheme.glowShadow}`,
                  animation: `perfectMorph${index} ${2.5 + index * 0.3}s ease-in-out infinite`,
                  animationDelay: `${index * 0.15}s`,
                  opacity: 0.9 - index * 0.1
                }}
              />
            ))}
          </div>
          
          {/* Central core */}
          <div 
            className="absolute w-5 h-5 sm:w-6 sm:h-6 rounded-full flex items-center justify-center transition-all duration-300"
            style={{
              background: `radial-gradient(circle, ${currentTheme.accent}, ${currentTheme.accentLight})`,
              boxShadow: `0 0 25px ${currentTheme.glowShadow}, inset 0 2px 4px rgba(255,255,255,0.3)`,
              animation: 'coreBreath 2s ease-in-out infinite'
            }}
          >
            <div 
              className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full transition-all duration-300"
              style={{
                backgroundColor: 'rgba(255,255,255,0.9)',
                animation: 'sparkle 1.5s ease-in-out infinite'
              }}
            />
          </div>
        </div>

        {/* Enhanced progress section */}
        <div className="w-full max-w-xs space-y-4 sm:space-y-6">
          {/* Progress bar container */}
          <div className="relative">
            <div 
              className="w-full h-1.5 sm:h-2 rounded-full overflow-hidden backdrop-blur-sm transition-all duration-300"
              style={{ 
                backgroundColor: currentTheme.progressTrack,
                boxShadow: `inset 0 1px 2px ${currentTheme.shadow}`
              }}
            >
              <div 
                className="h-full rounded-full transition-all duration-300 ease-out relative overflow-hidden"
                style={{ 
                  width: `${progress}%`,
                  background: `linear-gradient(90deg, ${currentTheme.accent}, ${currentTheme.accentLight})`,
                  boxShadow: `0 0 15px ${currentTheme.glowShadow}`,
                  backgroundSize: '200% 100%',
                  animation: 'shimmer 2s linear infinite'
                }}
              >
                <div 
                  className="absolute inset-0 rounded-full"
                  style={{
                    background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent)',
                    animation: 'progressGlow 1.5s ease-in-out infinite'
                  }}
                />
              </div>
            </div>
            
            {/* Progress glow effect */}
            <div 
              className="absolute top-0 h-1.5 sm:h-2 rounded-full transition-all duration-300 ease-out blur-[3px]"
              style={{ 
                width: `${progress}%`,
                background: currentTheme.accentLight,
                opacity: 0.4
              }}
            />
          </div>

          {/* Status text */}
          <div className="text-center space-y-2 sm:space-y-3">
            <div 
              className="text-xs sm:text-sm font-medium tracking-widest uppercase opacity-80 transition-all duration-300"
              style={{ color: currentTheme.textSecondary }}
            >
              {progress < 20 ? 'Starting up...' : 
               progress < 40 ? 'Loading components...' : 
               progress < 60 ? 'Processing assets...' : 
               progress < 80 ? 'Optimizing performance...' : 
               progress < 95 ? 'Final touches...' : 'Ready to go!'}
            </div>
            <div 
              className="text-2xl sm:text-3xl font-light tabular-nums transition-all duration-300"
              style={{ 
                color: currentTheme.accent,
                textShadow: `0 0 8px ${currentTheme.glowShadow}`
              }}
            >
              {Math.round(progress)}%
              <span className="text-sm sm:text-base opacity-70 ml-1">loaded</span>
            </div>
          </div>
        </div>

        {/* Floating ambient particles */}
        {[...Array(16)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full pointer-events-none"
            style={{
              width: `${1.5 + (i % 4)}px`,
              height: `${1.5 + (i % 4)}px`,
              background: currentTheme.accentLight,
              left: `${5 + (i * 7) % 85}%`,
              top: `${10 + (i * 11) % 75}%`,
              opacity: 0.3 + (i % 3) * 0.1,
              filter: 'blur(0.5px)',
              animation: `ambientFloat${i % 4} ${5 + i * 0.4}s ease-in-out infinite`,
              animationDelay: `${i * 0.3}s`,
              willChange: 'transform, opacity'
            }}
          />
        ))}
      </div>

      {/* Dark mode toggle */}
      <button
        onClick={() => setIsDarkMode(!isDarkMode)}
        className={`absolute top-6 right-6 p-3 rounded-full transition-all duration-300 hover:scale-110 backdrop-blur-sm ${
          isExiting ? 'opacity-0' : 'opacity-100'
        }`}
        style={{
          backgroundColor: currentTheme.cardBg,
          color: currentTheme.accent,
          border: `1px solid ${currentTheme.accent}30`,
          boxShadow: `0 5px 20px ${currentTheme.shadow}`,
          willChange: 'transform, opacity'
        }}
        aria-label={`Switch to ${isDarkMode ? 'light' : 'dark'} mode`}
      >
        <span className="text-base">
          {isDarkMode ? '☀️' : '🌙'}
        </span>
      </button>

      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;600;700&display=swap');
        
        @keyframes letterFloat {
          0%, 100% { transform: translateY(0px) rotateX(0deg); }
          50% { transform: translateY(-6px) rotateX(5deg); }
        }
        
        @keyframes perfectMorph0 {
          0%, 100% { transform: translate(0, -20px) scale(1) rotateZ(0deg); }
          25% { transform: translate(15px, -10px) scale(0.8) rotateZ(90deg); }
          50% { transform: translate(15px, 10px) scale(1.1) rotateZ(180deg); }
          75% { transform: translate(-15px, 10px) scale(0.9) rotateZ(270deg); }
        }
        
        @keyframes perfectMorph1 {
          0%, 100% { transform: translate(15px, -10px) scale(0.8) rotateZ(45deg); }
          25% { transform: translate(15px, 10px) scale(1.1) rotateZ(135deg); }
          50% { transform: translate(-15px, 10px) scale(0.9) rotateZ(225deg); }
          75% { transform: translate(0, -20px) scale(1) rotateZ(315deg); }
        }
        
        @keyframes perfectMorph2 {
          0%, 100% { transform: translate(15px, 10px) scale(1.1) rotateZ(90deg); }
          25% { transform: translate(-15px, 10px) scale(0.9) rotateZ(180deg); }
          50% { transform: translate(0, -20px) scale(1) rotateZ(270deg); }
          75% { transform: translate(15px, -10px) scale(0.8) rotateZ(360deg); }
        }
        
        @keyframes perfectMorph3 {
          0%, 100% { transform: translate(-15px, 10px) scale(0.9) rotateZ(135deg); }
          25% { transform: translate(0, -20px) scale(1) rotateZ(225deg); }
          50% { transform: translate(15px, -10px) scale(0.8) rotateZ(315deg); }
          75% { transform: translate(15px, 10px) scale(1.1) rotateZ(405deg); }
        }
        
        @keyframes perfectMorph4 {
          0%, 100% { transform: translate(0, 0) scale(0.7) rotateZ(180deg); }
          50% { transform: translate(0, 0) scale(1.3) rotateZ(540deg); }
        }
        
        @keyframes orbit0 {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        
        @keyframes orbit1 {
          from { transform: rotate(360deg); }
          to { transform: rotate(0deg); }
        }
        
        @keyframes orbit2 {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        
        @keyframes coreBreath {
          0%, 100% { transform: scale(1); opacity: 1; }
          50% { transform: scale(1.15); opacity: 0.8; }
        }
        
        @keyframes sparkle {
          0%, 100% { opacity: 0.7; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.3); }
        }
        
        @keyframes shimmer {
          0% { background-position: -200% 0; }
          100% { background-position: 200% 0; }
        }
        
        @keyframes progressGlow {
          0%, 100% { transform: translateX(-100%); }
          50% { transform: translateX(100%); }
        }
        
        @keyframes ambientFloat0 {
          0%, 100% { transform: translateY(0px) translateX(0px) rotate(0deg); opacity: 0.3; }
          50% { transform: translateY(-15px) translateX(8px) rotate(180deg); opacity: 0.6; }
        }
        
        @keyframes ambientFloat1 {
          0%, 100% { transform: translateY(0px) translateX(0px) rotate(0deg); opacity: 0.4; }
          50% { transform: translateY(-12px) translateX(-6px) rotate(-180deg); opacity: 0.7; }
        }
        
        @keyframes ambientFloat2 {
          0%, 100% { transform: translateY(0px) translateX(0px) rotate(0deg); opacity: 0.2; }
          50% { transform: translateY(-18px) translateX(4px) rotate(90deg); opacity: 0.5; }
        }
        
        @keyframes ambientFloat3 {
          0%, 100% { transform: translateY(0px) translateX(0px) rotate(0deg); opacity: 0.5; }
          50% { transform: translateY(-15px) translateX(-10px) rotate(-90deg); opacity: 0.8; }
        }
        
        @keyframes gradientPulse {
          0% { opacity: 0.15; }
          50% { opacity: 0.25; }
          100% { opacity: 0.15; }
        }
      `}</style>
    </div>
  );
};

export default Preloader;