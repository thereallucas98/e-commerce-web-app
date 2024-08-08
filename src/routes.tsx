import { createBrowserRouter } from 'react-router-dom'

import { AppLayout } from './pages/_layouts/app'
import { PrivateRoute } from './pages/_layouts/private-route'
import { NotFound } from './pages/404'
import { Dashboard } from './pages/app/dashboard'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <AppLayout />,
    errorElement: <NotFound />,
    children: [
      {
        path: '/',
        element: <PrivateRoute element={<Dashboard />} />,
      },
    ],
  },
])
