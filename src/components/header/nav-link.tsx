import { ComponentProps } from 'react'
import { Link, LinkProps } from 'react-router-dom'

type NavLinkProps = ComponentProps<'a'> &
  LinkProps & {
    path: string
    label: string
  }

export function NavLink({ path, label }: NavLinkProps) {
  return (
    <Link
      className="nav-link text-light text-decoration-none fs-6 fw-normal"
      to={path}
    >
      <li>{label}</li>
    </Link>
  )
}
