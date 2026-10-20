import { Routes, Route } from 'react-router-dom';
import Navigation from './components/Navigation.jsx';
import StreamList from './pages/StreamList.jsx';
import Movies from './pages/Movies.jsx';
import Cart from './pages/Cart.jsx';
import About from './pages/About.jsx';

export default function App() {
  return (
    <div className="app-shell">
      <Navigation />
      <main id="main-content" className="main-content">
        <Routes>
          <Route path="/" element={<StreamList />} />
          <Route path="/movies" element={<Movies />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/about" element={<About />} />
          <Route path="*" element={<StreamList />} />
        </Routes>
      </main>
      <footer className="footer">StreamList • React App Setup — Part 1</footer>
    </div>
  );
}
