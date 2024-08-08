import { Utensils } from 'lucide-react'
import { Outlet } from 'react-router-dom'

import SystemBackgroundImage from '~/assets/login-illustration.svg'

export function AuthLayout() {
  return (
    <div className="grid min-h-screen grid-cols-1 lg:grid-cols-2 antialiased">
      <div className="hidden lg:flex h-full flex-col justify-between border-r border-foreground/5 bg-muted p-10 text-muted-foreground">
        <div className="flex items-center gap-3 text-lg text-foreground">
          <Utensils className="h-5 w-5" />
          <span className="font-semibold">max.burguer</span>
        </div>

        <img src={SystemBackgroundImage} alt="max.burguer" />

        <footer className="text-sm">
          Painel do parceiro &copy; max.burguer - {new Date().getFullYear()}
        </footer>
      </div>

      <div className="relative flex flex-col items-center justify-center">
        <Outlet />
      </div>
    </div>
  )
}
