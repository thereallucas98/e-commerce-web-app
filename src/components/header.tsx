import { ShoppingBag } from 'lucide-react'
import { Link } from 'react-router-dom'

export function Header() {
  return (
    <header>
      <h1>Lifters Shop</h1>

      <nav>
        <ul>
          <li>
            <Link to="/shop">Shop</Link>
            <Link to="/stories">Stories</Link>
            <Link to="/about">About</Link>
          </li>
        </ul>
      </nav>

      <input type="text" />

      <div>
        {/* CART */}
        <button type="button">
          <ShoppingBag />
        </button>
        {/* LOGIN BUTTON */}
        <button type="button">Login</button>
      </div>
    </header>
  )
}
