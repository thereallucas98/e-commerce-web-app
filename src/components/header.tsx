import { Menu, Search, ShoppingBag } from 'lucide-react'
import { Link } from 'react-router-dom'

import { NavLink } from './header/nav-link'

export function Header() {
  return (
    <header className="container-fluid d-flex align-items-center justify-content-between px-4 py-2 bg-dark border-bottom border-secondary">
      <Link to="/" className="text-decoration-none">
        <h1 className="fs-4 fs-bold text-light">Lifters Shop</h1>
      </Link>

      <div className="d-none d-md-flex gap-4">
        <ul className="nav">
          <NavLink path="/" to="/" label="Shop" />
          <NavLink path="/stories" to="/stories" label="Stories" />
          <NavLink path="/about" to="/about" label="About" />
        </ul>

        <label
          id="searchProduct"
          className="d-none d-lg-flex bg-light d-flex align-items-center justify-content-center gap-2 rounded-2 px-2 py-2"
        >
          <Search size={16} />
          <input
            type="text"
            className="border-0 bg-transparent"
            placeholder="Search"
            aria-label="Search"
            id="searchProduct"
          />
        </label>
      </div>

      <div className="d-flex">
        <div className="dropdown">
          <button
            className="btn text-light"
            type="button"
            id="dropdownMenuButton"
            data-bs-toggle="dropdown"
            aria-expanded="false"
            aria-haspopup="true"
          >
            <Menu size={24} />
          </button>
          <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton">
            <NavLink path="/shop" to="/shop" label="Shop" />
            <NavLink path="/stories" to="/stories" label="Stories" />
            <NavLink path="/about" to="/about" label="About" />
          </ul>
        </div>
        {/* CART */}
        <button className="btn text-light" type="button">
          <ShoppingBag size={24} />
        </button>
        {/* LOGIN BUTTON */}
        <button className="btn text-light" type="button">
          Login
        </button>
      </div>
    </header>
  )
}
