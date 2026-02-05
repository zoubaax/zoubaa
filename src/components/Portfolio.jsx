import { useState, useEffect } from 'react'
import Navbar from './Navbar.jsx'
import Home from './Home.jsx'
import About from './About.jsx'
import MySkills from './MySkills.jsx'
import Contact from './Contact.jsx'
import Preloader from './Preloader.jsx'
import ChatBot from './ChatBot.jsx'
import TargetCursor from '../hooks/TargetCursor'

function Portfolio() {
  const [loading, setLoading] = useState(true);
  const [drakeMode, setDrakeMode] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 3500);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return <Preloader drakeMode={drakeMode} setDrakeMode={setDrakeMode} />;
  }

  return (
    // Single-page layout: render sections with IDs for in-page scrolling
    <div style={{
      backgroundColor: drakeMode ? '#1A1A1A' : '#EBE6E0',
      minHeight: '100vh',
      width: '100vw',
      position: 'relative',
    }}>
      {/* Global Custom Cursor */}
      <TargetCursor
        spinDuration={2}
        hideDefaultCursor={true}
      />

      <Navbar drakeMode={drakeMode} setDrakeMode={setDrakeMode} />
      <main className="relative z-10">
        <section id="home" className="min-h-screen">
          <Home drakeMode={drakeMode} />
        </section>

        <section id="about" className="min-h-screen">
          <About drakeMode={drakeMode} />
        </section>

        <section id="skills" className="min-h-screen">
          <MySkills drakeMode={drakeMode} />
        </section>

        <section id="contact" className="min-h-screen">
          <Contact drakeMode={drakeMode} />
        </section>
      </main>

      {/* Persistent ChatBot */}
      <ChatBot drakeMode={drakeMode} />
    </div>
  )
}

export default Portfolio


