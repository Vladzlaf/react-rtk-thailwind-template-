import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  useNavigate,
} from 'react-router-dom'
import { MainLayout } from '@shared/ui/main-layout/main-layout'
import { useAuth } from '@app/providers/auth-provider'
import { AuthPage } from '@/pages/auth'
import { LoadingSpinner } from '@/shared/ui/loading-spinner/loading-spinner'
import { ProfilePage } from '@/pages/profile'
import { ReactElement, useEffect } from 'react'
import { SettingsPage } from '@/pages/settings'
function ProtectedRoute({ children }: { children: ReactElement }) {
  const { user, loading } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    if (!loading && !user) {
      navigate('/auth', { replace: true })
    }
  }, [user, loading, navigate])

  if (loading) {
    return <LoadingSpinner />
  }

  return user ? children : null
}

function AuthRoute({ children }: { children: ReactElement }) {
  const { user, loading } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    if (!loading && user) {
      navigate('/home', { replace: true })
    }
  }, [user, loading, navigate])

  if (loading) {
    return <LoadingSpinner />
  }

  return !user ? children : null
}

export function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route
            path="/auth"
            element={
              <AuthRoute>
                <AuthPage />
              </AuthRoute>
            }
          />

          <Route
            element={
              <ProtectedRoute>
                <MainLayout />
              </ProtectedRoute>
            }
          >
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/profile/settings" element={<SettingsPage />} />
          </Route>

          <Route path="/" element={<Navigate to="/auth" replace />} />
          <Route path="*" element={<Navigate to="/auth" replace />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}
