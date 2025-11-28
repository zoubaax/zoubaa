import { Routes, Route } from 'react-router-dom'
import './App.css'
import './i18n'; // ...initialize i18n before the app

import { AuthProvider } from './contexts/AuthContext'
import Portfolio from './components/Portfolio.jsx'
import Login from './components/Login.jsx'
import Dashboard from './components/Dashboard.jsx'
import ProtectedRoute from './components/ProtectedRoute.jsx'

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
              <Dashboard />
            </ProtectedRoute>
          }
        />
      </Routes>
    </AuthProvider>
  )
}

export default App