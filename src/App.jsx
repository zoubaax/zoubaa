import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

import Navbar from './components/Navbar.jsx'
import Home from './components/Home.jsx'
import About from './components/About.jsx'
import MySkills from './components/MySkills.jsx'
import Contact from './components/Contact.jsx'
import Preloader from './components/Preloader.jsx'

function App() {
  const [count, setCount] = useState(0)
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
    </div>
  )
}

export default App