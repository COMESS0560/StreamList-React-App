import { useEffect, useRef, useState } from 'react';
import MovieCard from '../components/MovieCard';
import { hasTmdbToken, searchMovies } from '../lib/tmdb';
export default function MovieSearch({ watchlist, onSave, onRemove, logEvent }) {
  const [query,setQuery] = useState('');
  const [results,setResults] = useState([]);
  const [loading,setLoading] = useState(false);
  const [error,setError] = useState('');
  const [searched,setSearched] = useState(false);
  const requestRef = useRef(null);
  useEffect(() => () => requestRef.current?.abort(), []);
  const submit = async event => {
    event.preventDefault();
    const term = query.trim();
    if (!term) { setError('Enter a movie title first.'); return; }
    requestRef.current?.abort();
    const controller = new AbortController(); requestRef.current = controller;
    setLoading(true); setError(''); setSearched(true); setResults([]);
    logEvent(`Searched for “${term}”`);
    try { const movies = await searchMovies(term, controller.signal); setResults(movies); }
    catch (err) { if (err.name !== 'AbortError') setError(err.message || 'Something went wrong.'); }
    finally { if (requestRef.current === controller) setLoading(false); }
  };
  return <section>
    <div className="section-heading"><div><span className="eyebrow">TMDB API</span><h2>Find your next favorite movie</h2><p>Search titles, explore ratings, and save picks for later.</p></div></div>
    {!hasTmdbToken && <div className="notice" role="status">To enable live search, add your TMDB Read Access Token to the local <code>.env</code> file and restart the app. See README.md.</div>}
    <form className="search-form" onSubmit={submit}><label className="sr-only" htmlFor="movie-query">Movie title</label><input id="movie-query" value={query} onChange={e => setQuery(e.target.value)} placeholder="Try Spider-Man, Barbie, or The Batman"/><button disabled={loading}>{loading ? 'Searching…' : 'Search movies'}</button></form>
    {error && <div className="error" role="alert">{error}</div>}
    {loading && <p role="status">Searching TMDB…</p>}
    {!loading && !error && searched && results.length === 0 && <p>No movies found. Try a different title.</p>}
    <div className="movie-grid">{results.map(movie => <MovieCard key={movie.id} movie={movie} saved={watchlist.some(item => item.id === movie.id)} onSave={onSave} onRemove={onRemove}/>)}</div>
    <p className="attribution">Movie information provided by TMDB. This product uses the TMDB API but is not endorsed or certified by TMDB.</p>
  </section>;
}
