import { ReactElement } from 'react'
import { Navigate } from 'react-router-dom'

interface PrivateRouteProps {
  element: ReactElement
}

export function PrivateRoute({ element }: PrivateRouteProps) {
  const isAuthenticated = true

  return isAuthenticated ? element : <Navigate to="/sign-in" />
}
