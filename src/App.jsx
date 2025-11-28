import { Routes, Route } from 'react-router-dom'
import './App.css'
import './i18n'; // ...initialize i18n before the app

import { AuthProvider } from './contexts/AuthContext'
import Portfolio from './components/Portfolio.jsx'
import Login from './pages/auth/Login.jsx'
import DashboardLayout from './components/dashboard/DashboardLayout.jsx'
import Dashboard from './pages/dashboard/Dashboard.jsx'
import Certificates from './pages/dashboard/Certificates.jsx'
import Projects from './pages/dashboard/Projects.jsx'
import ProtectedRoute from './components/dashboard/ProtectedRoute.jsx'

function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/" element={<Portfolio />} />
        <Route path="/login" element={<Login />} />
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
        </Route>
      </Routes>
    </AuthProvider>
  )
}

export default App