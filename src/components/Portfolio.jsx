import { useState, useEffect } from 'react'
import Navbar from './Navbar.jsx'
import Home from './Home.jsx'
import About from './About.jsx'
import MySkills from './MySkills.jsx'
import Contact from './Contact.jsx'
import Preloader from './Preloader.jsx'
import ChatBot from './ChatBot.jsx'
import TargetCursor from '../hooks/TargetCursor'

import { useTheme } from '../contexts/ThemeContext'

function Portfolio() {
  const { isDarkMode: drakeMode } = useTheme()
  const [loading, setLoading] = useState(() => {
    // Check if we've already shown the preloader in this session
    return !sessionStorage.getItem('has-loaded');
  });

  useEffect(() => {
    if (loading) {
      const timer = setTimeout(() => {
        setLoading(false);
        sessionStorage.setItem('has-loaded', 'true');
      }, 3500);
      return () => clearTimeout(timer);
    }
  }, [loading]);

  if (loading) {
    return <Preloader />;
  }

  return (
    // Single-page layout: render sections with IDs for in-page scrolling
    <div style={{
      backgroundColor: drakeMode ? '#050A30' : '#eff9ff',
      minHeight: '100vh',
      width: '100vw',
      position: 'relative',
    }}>
      {/* Global Custom Cursor */}
      <TargetCursor
        spinDuration={2}
        hideDefaultCursor={true}
      />

      <Navbar />
      <main className="relative z-10">
        <section id="home" className="min-h-screen">
          <Home />
        </section>

        <section id="about" className="min-h-screen">
          <About />
        </section>

        <section id="skills" className="min-h-screen">
          <MySkills />
        </section>

        <section id="contact" className="min-h-screen">
          <Contact />
        </section>
      </main>

      {/* Persistent ChatBot */}
      <ChatBot />
    </div>
  )
}

export default Portfolio


