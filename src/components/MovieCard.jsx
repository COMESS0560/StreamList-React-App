import { posterUrl } from '../lib/tmdb';
export default function MovieCard({ movie, saved, onSave, onRemove }) {
  const poster = posterUrl(movie.poster_path);
  return <article className="movie-card">
    {poster ? <img className="poster" src={poster} alt={`${movie.title} poster`} loading="lazy"/> : <div className="poster missing">No poster available</div>}
    <div className="movie-content">
      <h3>{movie.title}</h3>
      <p className="meta">{movie.release_date?.slice(0,4) || 'Year unknown'} · ★ {Number(movie.vote_average || 0).toFixed(1)}/10</p>
      <p className="overview">{movie.overview || 'No description available.'}</p>
      {saved ? <button className="secondary" onClick={() => onRemove(movie.id)}>Remove from watchlist</button> : <button onClick={() => onSave(movie)}>Add to watchlist</button>}
    </div>
  </article>;
}
