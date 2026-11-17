import { Link, NavLink, Route, Routes, Navigate, useLocation } from 'react-router-dom';
import { useState } from 'react';
import Login from './pages/Login.jsx';
import Checkout from './pages/Checkout.jsx';
import MovieSearch from './pages/MovieSearch';
import MovieCard from './components/MovieCard';
import usePersistentState from './hooks/usePersistentState';

const PRODUCTS = [
  { id:'popcorn', name:'Movie Night Popcorn', price:6, emoji:'🍿', description:'Classic snack for a great movie night.' },
  { id:'soda', name:'Fizzy Drink', price:4, emoji:'🥤', description:'A refreshing drink while you watch.' },
  { id:'candy', name:'Movie Candy', price:5, emoji:'🍬', description:'A little something sweet for your marathon.' }
];
const dollars = amount => `$${amount.toFixed(2)}`;
export default function App() {
  // Front-end demonstration session only. A production app must validate tokens on a server.
  const [user, setUser] = useState(null);
  const location = useLocation();
  if (!user) {
    return <Routes>
      <Route path="/login" element={<Login onLogin={setUser}/>} />
      <Route path="*" element={<Navigate to="/login" state={{ from: location.pathname }} replace />} />
    </Routes>;
  }
  return <AuthenticatedApp user={user} onLogout={() => setUser(null)} />;
}
function AuthenticatedApp({ user, onLogout }) {
  const [watchlist,setWatchlist] = usePersistentState('streamlist.watchlist.v3', []);
  const [cart,setCart] = usePersistentState('streamlist.cart.v3', []);
  const [events,setEvents] = usePersistentState('streamlist.events.v3', []);
  const [note,setNote] = usePersistentState('streamlist.note.v3', '');
  const logEvent = description => setEvents(previous => [{id:`${Date.now()}-${Math.random()}`,description,time:new Date().toLocaleString()},...previous].slice(0,30));
  const addMovie = movie => {
    if (watchlist.some(item => item.id === movie.id)) return;
    setWatchlist(previous => [...previous, movie]); logEvent(`Added “${movie.title}” to watchlist`);
  };
  const removeMovie = id => {
    const movie=watchlist.find(item => item.id === id);
    setWatchlist(previous=>previous.filter(item=>item.id !== id));
    if (movie) logEvent(`Removed “${movie.title}” from watchlist`);
  };
  const addToCart = product => {
    setCart(previous => { const found=previous.find(item=>item.id===product.id); return found ? previous.map(item=>item.id===product.id?{...item,quantity:item.quantity+1}:item) : [...previous,{...product,quantity:1}]; });
    logEvent(`Added ${product.name} to cart`);
  };
  const removeCart = id => {setCart(previous=>previous.filter(item=>item.id!==id));logEvent('Removed an item from cart');};
  const cartCount = cart.reduce((sum,item)=>sum+item.quantity,0);
  return <div className="site">
    <header className="topbar"><Link className="brand" to="/">▶ Stream<span>List</span></Link><nav aria-label="Main navigation"><NavLink end to="/">Home</NavLink><NavLink to="/movies">Movie Search</NavLink><NavLink to="/watchlist">Watchlist <small>{watchlist.length}</small></NavLink><NavLink to="/shop">Shop</NavLink><NavLink to="/cart">Cart <small>{cartCount}</small></NavLink><NavLink to="/activity">Activity</NavLink></nav></header>
    <main className="container"><Routes>
      <Route path="/" element={<><div className="hero"><span className="eyebrow">MOVIE NIGHT, MADE SIMPLE</span><h1>Watch more. Search smarter.<br/><em>Keep your favorites.</em></h1><p>Explore movies with TMDB, build a personal watchlist, and stock your movie-night cart. Your choices remain after a refresh.</p><div className="actions"><Link className="button" to="/movies">Find movies</Link><Link className="button secondary" to="/watchlist">My watchlist</Link></div></div><div className="stats"><div><strong>{watchlist.length}</strong><span>Saved movies</span></div><div><strong>{cartCount}</strong><span>Cart items</span></div><div><strong>{events.length}</strong><span>Recent actions stored</span></div></div></>}/>
      <Route path="/movies" element={<MovieSearch watchlist={watchlist} onSave={addMovie} onRemove={removeMovie} logEvent={logEvent}/>}/>
      <Route path="/watchlist" element={<section><h2>My Watchlist</h2><p>Your saved movie picks are stored in your browser.</p>{watchlist.length ? <div className="movie-grid">{watchlist.map(movie=><MovieCard key={movie.id} movie={movie} saved onRemove={removeMovie}/>)}</div> : <div className="empty">No saved movies yet. <Link to="/movies">Search for a movie</Link> to get started.</div>}<div className="note"><label htmlFor="watch-note">Movie-night notes (also saved after refresh)</label><textarea id="watch-note" value={note} onChange={e=>setNote(e.target.value)} placeholder="What should we watch next?"/></div></section>}/>
      <Route path="/shop" element={<section><h2>Movie Night Shop</h2><p>This sample shop demonstrates how React cart actions are kept in localStorage. Checkout is a classroom demo using fictional test cards only; no real payments are processed.</p><div className="product-grid">{PRODUCTS.map(product=><article className="product" key={product.id}><div className="emoji" aria-hidden="true">{product.emoji}</div><h3>{product.name}</h3><p>{product.description}</p><strong>{dollars(product.price)}</strong><button onClick={()=>addToCart(product)}>Add to cart</button></article>)}</div></section>}/>
      <Route path="/cart" element={<section><h2>My Cart</h2><p>Cart items stay here after you refresh or revisit this browser.</p>{cart.length ? <><div className="cart-list">{cart.map(item=><div className="cart-row" key={item.id}><span>{item.emoji} {item.name} × {item.quantity}</span><strong>{dollars(item.price*item.quantity)}</strong><button className="secondary" onClick={()=>removeCart(item.id)}>Remove</button></div>)}</div><p className="total">Total: {dollars(cart.reduce((sum,item)=>sum+item.price*item.quantity,0))}</p><div className="cart-actions"><button className="secondary" onClick={()=>{setCart([]);logEvent('Cleared shopping cart');}}>Clear cart</button><Link className="button" to="/checkout">Checkout</Link></div></> : <div className="empty">Your cart is empty. <Link to="/shop">Browse the sample shop</Link>.</div>}</section>}/>
      <Route path="/checkout" element={<Checkout cart={cart} total={cart.reduce((sum,item)=>sum+item.price*item.quantity,0)} />} />
      <Route path="/login" element={<Navigate to="/" replace />} />
      <Route path="/activity" element={<section><h2>Activity History</h2><p>These recent events are saved in localStorage, too.</p>{events.length ? <><ol className="events">{events.map(event=><li key={event.id}><span>{event.description}</span><small>{event.time}</small></li>)}</ol><button className="secondary" onClick={()=>setEvents([])}>Clear activity</button></> : <div className="empty">No recorded activity yet. Try searching for a movie!</div>}</section>}/>
      <Route path="*" element={<section><h2>Page not found</h2><Link to="/">Back to home</Link></section>}/>
    </Routes></main><footer>StreamList • A class project · Movie data © TMDB contributors</footer>
  </div>;
}
