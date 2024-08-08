import './global.css'

import { Helmet, HelmetProvider } from 'react-helmet-async'
import { Provider as ReduxProvider } from 'react-redux'
import { RouterProvider } from 'react-router-dom'
import { PersistGate } from 'redux-persist/integration/react'
import { Toaster } from 'sonner'

import { persistor, store } from './redux/store'
import { router } from './routes'

export function App() {
  return (
    <HelmetProvider>
      <Helmet titleTemplate="%s | Fliters" />
      <Toaster richColors />
      <ReduxProvider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <RouterProvider router={router} />
        </PersistGate>
      </ReduxProvider>
    </HelmetProvider>
  )
}
