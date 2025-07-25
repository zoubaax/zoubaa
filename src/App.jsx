import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

import Navbar from './components/Navbar.jsx'
import Home from './components/Home.jsx'
import About from './components/About.jsx'
import MySkills from './components/MySkills.jsx'
import Contact from './components/Contact.jsx'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div style={{
      backgroundColor: '#EBE6E0',
      minHeight: '100vh',
      width: '100vw',
      position: 'relative',
    }}>
   
      <Navbar />
      <main className="relative z-10">
        <section id="top" style={{ position: 'relative', zIndex: 1 }}>
          <Home />
        </section>
        {/* Remove Silk background from other sections */}
        <section id="about">
          <About />
        </section>
        <section id="services">
          <MySkills />
        </section>
        <section id="contact">
          <Contact />
        </section>
      </main>
    </div>
  )
}

export default App