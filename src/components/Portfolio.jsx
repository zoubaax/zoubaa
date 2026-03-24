import { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import Navbar from './Navbar.jsx'
import Home from './Home.jsx'
import About from './About.jsx'
import MySkills from './MySkills.jsx'
import Contact from './Contact.jsx'
import Preloader from './Preloader.jsx'
import ChatBot from './ChatBot.jsx'
import GitHubStats from './GitHubStats.jsx'


import { useTheme } from '../contexts/ThemeContext'

function Portfolio() {
  const { isDarkMode: drakeMode } = useTheme()
  const location = useLocation()
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

  // Handle scroll based on pathname or hash
  useEffect(() => {
    if (!loading) {
      // Prioritize hash if present, otherwise check pathname for section routes
      const hashId = window.location.hash.replace('#', '');
      const pathId = location.pathname.substring(1); // e.g., 'contact' from '/contact'
      
      const targetId = hashId || (['about', 'projects', 'contact'].includes(pathId) ? pathId : null);
      
      if (targetId) {
        const element = document.getElementById(targetId);
        if (element) {
          setTimeout(() => {
            element.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }, 100);
        }
      } else if (location.pathname === '/' || location.pathname === '/zoubaa/' || location.pathname === '/zoubaa') {
        // Scroll to top for root home
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }
  }, [loading, location.pathname, location.hash]);

  if (loading) {
    return <Preloader />;
  }

  return (
    // Single-page layout: render sections with IDs for in-page scrolling
    <div className={`relative min-h-screen w-full transition-colors duration-1000 ${drakeMode ? 'bg-[#050A30]' : 'bg-[#eff9ff]'}`}>
      <Navbar />
      <main className="relative z-10 bg-transparent">
        <section id="home" className="min-h-screen bg-transparent">
          <Home />
        </section>

        <section id="about" className="bg-transparent">
          <About />
        </section>

        <section id="projects" className="bg-transparent">
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


