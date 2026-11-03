import { NavLink } from 'react-router-dom';
import { useCart } from '../cart/CartContext.jsx';

const links = [
  { to: '/', label: 'StreamList', end: true },
  { to: '/movies', label: 'Movies' },
  { to: '/shop', label: 'Shop' },
  { to: '/cart', label: 'Cart' },
  { to: '/about', label: 'About' },
];

export default function Navigation() {
  const { cartCount } = useCart();
  return (
    <header className="site-header">
      <div className="header-inner">
        <NavLink to="/" className="brand" aria-label="StreamList home">
          <span className="brand-icon" aria-hidden="true">▶</span>
          <span>Stream<span className="brand-accent">List</span></span>
        </NavLink>
        <nav aria-label="Main navigation" className="nav-links">
          {links.map(({ to, label, end }) => (
            <NavLink key={to} to={to} end={end} className={({ isActive }) => `nav-link${isActive ? ' active' : ''}`}>
              {label}{to === '/cart' && <span className="cart-count" aria-label={`${cartCount} items in cart`}>{cartCount}</span>}
            </NavLink>
          ))}
        </nav>
      </div>
    </header>
  );
}
