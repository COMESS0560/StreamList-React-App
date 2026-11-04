const BASE = 'https://api.themoviedb.org/3';
const TOKEN = (import.meta.env.VITE_TMDB_READ_TOKEN || '').trim();
export const hasTmdbToken = Boolean(TOKEN) && !TOKEN.startsWith('PASTE_');
export function posterUrl(path) { return path ? `https://image.tmdb.org/t/p/w342${path}` : null; }
export async function searchMovies(query, signal) {
  if (!hasTmdbToken) throw new Error('TMDB is not configured. Add VITE_TMDB_READ_TOKEN to your .env file and restart npm run dev.');
  const url = new URL(`${BASE}/search/movie`);
  url.searchParams.set('query', query);
  url.searchParams.set('include_adult', 'false');
  url.searchParams.set('language', 'en-US');
  url.searchParams.set('page', '1');
  const response = await fetch(url, { headers: { Authorization: `Bearer ${TOKEN}`, Accept: 'application/json' }, signal });
  if (!response.ok) throw new Error(response.status === 401 ? 'TMDB rejected the token. Check your Read Access Token.' : `TMDB request failed (${response.status}).`);
  const data = await response.json();
  return (Array.isArray(data.results) ? data.results : []).filter(movie => movie && movie.id && movie.title);
}
