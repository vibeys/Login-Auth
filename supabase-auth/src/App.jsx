import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import LoginPage       from './pages/LoginPage'
import SignupPage      from './pages/SignupPage'
import ForgotPage      from './pages/ForgotPage'
import OtpPage         from './pages/OtpPage'
import NewPasswordPage from './pages/NewPasswordPage'
import SuccessPage     from './pages/SuccessPage'
import WelcomePage     from './pages/welcome'

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/"             element={<LoginPage />} />
          <Route path="/signup"       element={<SignupPage />} />
          <Route path="/forgot"       element={<ForgotPage />} />
          <Route path="/verify-otp"   element={<OtpPage />} />
          <Route path="/new-password" element={<NewPasswordPage />} />
          <Route path="/success"      element={<SuccessPage />} />
          <Route path="/welcome"      element={<WelcomePage />} />
          <Route path="*"             element={<Navigate to="/" />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  )
}