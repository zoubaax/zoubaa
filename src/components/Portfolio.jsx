import { useState, useEffect } from 'react'
import Navbar from './Navbar.jsx'
import Home from './Home.jsx'
import About from './About.jsx'
import MySkills from './MySkills.jsx'
import Contact from './Contact.jsx'
import Preloader from './Preloader.jsx'
import ChatBot from './ChatBot.jsx'
import SplashCursor from './SplashCursor.jsx'
import GitHubStats from './GitHubStats.jsx'


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
    <div className={`relative min-h-screen w-full transition-colors duration-1000 ${drakeMode ? 'bg-[#050A30]' : 'bg-[#eff9ff]'}`}>
      <SplashCursor />
      <Navbar />
      <main className="relative z-10 bg-transparent">
        <section id="home" className="min-h-screen bg-transparent">
          <Home />
        </section>

        <section id="about" className="min-h-screen bg-transparent">
          <About />
        </section>

        <section id="skills" className="min-h-screen bg-transparent">
          <MySkills />
        </section>

        <section id="stats" className="bg-transparent py-10">
          <GitHubStats />
        </section>

        <section id="contact" className="min-h-screen bg-transparent">
          <Contact />
        </section>
      </main>


      {/* Persistent ChatBot */}
      <ChatBot />
    </div >
  )
}

export default Portfolio


