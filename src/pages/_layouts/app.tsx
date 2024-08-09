import { Outlet } from 'react-router-dom'

import { Header } from '~/components/header'

export function AppLayout() {
  return (
    <div className="container-100">
      <Header />

      <div className="container-100 h-100">
        <Outlet />
      </div>
    </div>
  )
}
