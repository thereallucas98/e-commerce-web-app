import { createBrowserRouter } from 'react-router-dom'

import { AppLayout } from './pages/_layouts/app'
import { PrivateRoute } from './pages/_layouts/private-route'
import { NotFound } from './pages/404'
import { Dashboard } from './pages/app/dashboard'
import { Shop } from './pages/app/shop'

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
      {
        path: '/shop/:slug',
        element: <PrivateRoute element={<Shop />} />,
      },
    ],
  },
])
