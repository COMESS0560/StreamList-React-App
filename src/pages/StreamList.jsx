import { useState } from 'react';

export default function StreamList() {
  const [entry, setEntry] = useState('');
  const [message, setMessage] = useState('');

  function handleSubmit(event) {
    event.preventDefault();
    const cleanedEntry = entry.trim();
    if (!cleanedEntry) {
      setMessage('Enter a movie or show title first.');
      return;
    }
    console.log('StreamList item:', cleanedEntry);
    setMessage(`“${cleanedEntry}” was sent to the browser console.`);
    setEntry('');
  }

  return (
    <>
      <section className="hero">
        <div className="eyebrow"><span className="dot" /> YOUR ENTERTAINMENT HUB</div>
        <h1>Keep your next watch <span className="gradient-text">in sight.</span></h1>
        <p className="hero-copy">Movies, shows, and future favorites — one easy place to begin organizing what you want to watch.</p>
      </section>
      <section className="content-card input-card" aria-labelledby="add-title">
        <div className="card-icon" aria-hidden="true">＋</div>
        <div className="card-main">
          <h2 id="add-title">Start your StreamList</h2>
          <p>Type a movie or show name below. For Part 1, this button sends your entry to the browser console.</p>
          <form className="entry-form" onSubmit={handleSubmit}>
            <label htmlFor="stream-entry" className="sr-only">Movie or TV show title</label>
            <input id="stream-entry" type="text" placeholder="e.g., The Mandalorian" value={entry} onChange={(e) => setEntry(e.target.value)} maxLength={120} />
            <button type="submit">Add to Console <span aria-hidden="true">→</span></button>
          </form>
          {message && <p className="form-message" role="status">{message}</p>}
          <p className="small-note">Tip: Press F12 and select <strong>Console</strong> to see your submitted item.</p>
        </div>
      </section>
      <section className="feature-grid" aria-label="Upcoming features">
        <div className="mini-card"><div className="mini-icon">▣</div><h3>Movies</h3><p>Explore movie titles in a future project week.</p></div>
        <div className="mini-card"><div className="mini-icon">▤</div><h3>Cart</h3><p>Build your saved-item experience in a future week.</p></div>
        <div className="mini-card"><div className="mini-icon">✦</div><h3>About</h3><p>Learn more about the app as it develops.</p></div>
      </section>
    </>
  );
}
