import { ComponentProps } from 'react'
import { Link, LinkProps, useLocation } from 'react-router-dom'

type NavLinkProps = ComponentProps<'a'> &
  LinkProps & {
    path: string
    label: string
  }

export function NavLink({ path, label }: NavLinkProps) {
  const location = useLocation()

  const currentRouterIncludes =
    location.pathname.split('/')[1] === path.split('/')[1]
  const isActive = path === location.pathname || currentRouterIncludes

  return (
    <Link
      className={`nav-link text-light text-decoration-none fs-6 fw-normal ${isActive ? 'text-decoration-underline' : ''}`}
      to={path}
    >
      <li>{label}</li>
    </Link>
  )
}
