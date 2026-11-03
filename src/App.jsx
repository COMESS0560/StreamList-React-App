import { Routes, Route } from 'react-router-dom';
import Navigation from './components/Navigation.jsx';
import StreamList from './pages/StreamList.jsx';
import Movies from './pages/Movies.jsx';
import Cart from './pages/Cart.jsx';
import Shop from './pages/Shop.jsx';
import About from './pages/About.jsx';
import { CartProvider } from './cart/CartContext.jsx';
import './cart/cart.css';

export default function App() {
  return (
    <CartProvider>
      <div className="app-shell">
        <Navigation />
        <main id="main-content" className="main-content">
          <Routes>
            <Route path="/" element={<StreamList />} />
            <Route path="/movies" element={<Movies />} />
            <Route path="/shop" element={<Shop />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/about" element={<About />} />
            <Route path="*" element={<StreamList />} />
          </Routes>
        </main>
        <footer className="footer">StreamList • Week 3 Shopping Cart Demo • No account or payment processing</footer>
      </div>
    </CartProvider>
  );
}
