import { useEffect } from 'react'
import './App.css'
import Navbar from './components/Navbar'
import { Routes, Route , Navigate} from "react-router-dom"
import HomePage from './pages/HomePage.jsx'
import LoginPage from './pages/LoginPage.jsx'
import SignUpPage from './pages/SignUpPage.jsx'
import ProfilePage from './pages/ProfilePage.jsx'
import { useAuthStore } from './store/useAuthStore.js'
import { Loader} from "lucide-react"
import { useThemeStore } from './store/useThemeStore.js'
import {Toaster} from "react-hot-toast"

function App() {
  const { authUser, checkAuth, isCheckingAuth } = useAuthStore()
  const {theme}= useThemeStore()

  useEffect(() => {
    checkAuth()
  }, [checkAuth])
  if (isCheckingAuth && !authUser) {
    return (
      <div data-theme={theme} className="flex items-center justify-center h-screen">
        <Loader className="size-10 animate-spin" />
      </div>
    )
  }

  return (
    <div data-theme={theme}>
      <Navbar />
      <Routes>
        <Route path="/" element={authUser?<HomePage /> : <Navigate to="/login"/>} />
        <Route path="/signup" element={!authUser?<SignUpPage /> : <Navigate to="/"/>} />
        <Route path="/login" element={!authUser?<LoginPage /> :  <Navigate to="/"/>} />
        <Route path="/profile" element={authUser?<ProfilePage /> :  <Navigate to="/login"/>} />
      </Routes>
      <Toaster />
    </div>
  )
}

export default App
