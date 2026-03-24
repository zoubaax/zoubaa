import { Routes, Route, useLocation } from 'react-router-dom'
import './App.css'
import './i18n'; // ...initialize i18n before the app

import { AuthProvider } from './contexts/AuthContext'
import { ThemeProvider } from './contexts/ThemeContext'
import SplashCursor from './components/SplashCursor.jsx'
import Portfolio from './components/Portfolio.jsx'
import Login from './pages/auth/Login.jsx'
import CertificatesPage from './pages/CertificatesPage.jsx'
import DashboardLayout from './components/dashboard/DashboardLayout.jsx'
import Dashboard from './pages/dashboard/Dashboard.jsx'
import Certificates from './pages/dashboard/Certificates.jsx'
import Projects from './pages/dashboard/Projects.jsx'
import Technologies from './pages/dashboard/Technologies.jsx'
import ProtectedRoute from './components/dashboard/ProtectedRoute.jsx'
import ProjectDetails from './pages/ProjectDetails.jsx'

function App() {
  const location = useLocation()
  const isDashboard = location.pathname.startsWith('/dashboard')
  const isProjectDetails = location.pathname.startsWith('/projects/')
  const hideSplash = isDashboard || isProjectDetails

  return (
    <AuthProvider>
      <ThemeProvider>
        {!hideSplash && <SplashCursor />}
        <Routes>
          <Route path="/" element={<Portfolio />} />
          <Route path="/about" element={<Portfolio />} />
          <Route path="/projects" element={<Portfolio />} />
          <Route path="/contact" element={<Portfolio />} />
          <Route path="/login" element={<Login />} />
          <Route path="/certificates" element={<CertificatesPage />} />
          <Route path="/projects/:id" element={<ProjectDetails />} />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <DashboardLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<Dashboard />} />
            <Route path="certificates" element={<Certificates />} />
            <Route path="projects" element={<Projects />} />
            <Route path="technologies" element={<Technologies />} />
          </Route>
        </Routes>
      </ThemeProvider>
    </AuthProvider>
  )
}

export default App