import { useEffect, useState } from 'react';

const starter = [
  {id:'sample-1', title:'The Princess Bride', done:false},
  {id:'sample-2', title:'Finding Nemo', done:true}
];
const KEY = 'streamlist-week2-watchlist';
export default function StreamList() {
  const [entry, setEntry] = useState('');
  const [items, setItems] = useState(() => {
    try { const value = localStorage.getItem(KEY); return value ? JSON.parse(value) : starter; }
    catch { return starter; }
  });
  const [editing, setEditing] = useState(null);
  const [editText, setEditText] = useState('');
  const [message, setMessage] = useState('');
  const [filter, setFilter] = useState('all');
  useEffect(() => { try { localStorage.setItem(KEY, JSON.stringify(items)); } catch {} }, [items]);
  const shown = items.filter(item => filter === 'all' || (filter === 'done' ? item.done : !item.done));
  function add(e) {
    e.preventDefault(); const title = entry.trim();
    if (!title) { setMessage('Please enter a movie or show title.'); return; }
    setItems(old => [{ id: crypto.randomUUID?.() || String(Date.now()), title, done:false }, ...old]);
    setEntry(''); setMessage(`Added “${title}” to your list!`);
  }
  function startEdit(item) { setEditing(item.id); setEditText(item.title); setMessage(''); }
  function saveEdit(e) {
    e.preventDefault(); const title = editText.trim();
    if (!title) { setMessage('A title cannot be empty.'); return; }
    setItems(old => old.map(item => item.id === editing ? {...item,title} : item));
    setEditing(null); setMessage('Title updated.');
  }
  function remove(item) { setItems(old => old.filter(x => x.id !== item.id)); setMessage(`Removed “${item.title}”.`); }
  return <>
    <section className="hero"><div className="eyebrow"><span className="dot"/> YOUR MOVIE NIGHT STARTS HERE</div><h1>Stop scrolling. <span className="gradient-text">Start the show.</span></h1><p className="hero-copy">Build a personal movie-night list. Add, edit, complete, and remove titles in one easy place.</p></section>
    <section className="content-card input-card" aria-labelledby="add-title"><div className="card-icon" aria-hidden="true">＋</div><div className="card-main"><h2 id="add-title">Add something to watch</h2><p>Your list is stored locally in this browser for this class demo.</p><form className="entry-form" onSubmit={add}><label htmlFor="stream-entry" className="sr-only">Movie or show title</label><input id="stream-entry" placeholder="e.g., The Mandalorian" value={entry} onChange={e=>setEntry(e.target.value)} maxLength={120}/><button type="submit">＋ Add title</button></form>{message && <p role="status" className="form-message">{message}</p>}</div></section>
    <section className="watchlist content-card" aria-label="Watchlist"><div className="list-heading"><div><h2>🎞 My Watchlist</h2><p>{items.length} saved title{items.length===1?'':'s'} · {items.filter(x=>x.done).length} watched</p></div><div className="filter-buttons" aria-label="Filter list">{[['all','All'],['todo','To watch'],['done','Watched']].map(([id,label])=><button type="button" key={id} className={filter===id?'filter active-filter':'filter'} onClick={()=>setFilter(id)}>{label}</button>)}</div></div>
    {shown.length===0?<p className="empty-state">No titles in this view yet. Add one above or try another filter.</p>:<ul className="movie-list">{shown.map(item=><li key={item.id} className={item.done?'movie-item complete':'movie-item'}>{editing===item.id?<form className="edit-form" onSubmit={saveEdit}><label className="sr-only" htmlFor={'edit-'+item.id}>Edit title</label><input id={'edit-'+item.id} value={editText} maxLength={120} onChange={e=>setEditText(e.target.value)}/><button type="submit">Save</button><button type="button" className="secondary" onClick={()=>setEditing(null)}>Cancel</button></form>:<><span className="movie-name">{item.done?'✓':'○'} <span>{item.title}</span></span><div className="movie-actions"><button type="button" className="secondary" onClick={()=>setItems(old=>old.map(x=>x.id===item.id?{...x,done:!x.done}:x))}>{item.done?'↺ Unwatch':'✓ Watched'}</button><button type="button" className="secondary" onClick={()=>startEdit(item)}>✎ Edit</button><button type="button" className="danger" onClick={()=>remove(item)}>✕ Delete</button></div></>}</li>)}</ul>}</section>
    <section className="feature-grid" aria-label="Project features"><div className="mini-card"><div className="mini-icon">✓</div><h3>Interactive list</h3><p>Add, edit, delete, and mark watched using React state.</p></div><div className="mini-card"><div className="mini-icon">▣</div><h3>Helpful navigation</h3><p>Visit Movies, Cart, and About using the top menu.</p></div><div className="mini-card"><div className="mini-icon">⌂</div><h3>Saved in your browser</h3><p>Local storage keeps this class demo list after a refresh. No user account is created.</p></div></section>
  </>;
}
