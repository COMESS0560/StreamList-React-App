import { useState } from 'react';
import { Link } from 'react-router-dom';

const KEY = 'streamlist.classroom.testcard.v1';
const TEST_CARDS = new Set(['4242424242424242', '4111111111111111']);
const getSaved = () => { try { const item = JSON.parse(localStorage.getItem(KEY) || 'null'); return item && TEST_CARDS.has(item.number) ? item : null; } catch { return null; } };
const digits = value => value.replace(/\D/g, '').slice(0,16);
const grouped = value => digits(value).replace(/(.{4})/g, '$1 ').trim();
export default function Checkout({cart, total}) {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');
  const [expiry, setExpiry] = useState('');
  const [cvv, setCvv] = useState('');
  const [saved, setSaved] = useState(getSaved);
  const [message, setMessage] = useState('');
  const saveCard = event => {
    event.preventDefault();
    const clean = digits(number);
    const match = expiry.match(/^(0[1-9]|1[0-2])\/(\d{2})$/);
    const validExpiry = match && (2000 + Number(match[2]) > new Date().getFullYear() || 2000 + Number(match[2]) === new Date().getFullYear() && Number(match[1]) >= new Date().getMonth() + 1);
    if (!name.trim() || !TEST_CARDS.has(clean) || !validExpiry || !/^\d{3,4}$/.test(cvv)) {
      setMessage('Use a name, test card 4242 4242 4242 4242, a future MM/YY date, and a 3–4 digit demo CVV.');
      return;
    }
    // Homework-only storage of a fictional test card, never a live payment credential.
    const card = { name: name.trim(), number: clean, expiry };
    localStorage.setItem(KEY, JSON.stringify(card));
    setSaved(card);
    setNumber(''); setCvv(''); setMessage('Fictional test card saved locally. No payment was processed.');
  };
  const removeCard = () => { localStorage.removeItem(KEY); setSaved(null); setMessage('Saved test card removed.'); };
  return <section className="checkout-page">
    <h2>Checkout · Classroom Demo</h2>
    <p>This is a sample checkout. <strong>No purchase or payment is processed.</strong> Never enter a real card number.</p>
    <div className="notice">For the assignment, this form saves only a fictional test card in localStorage. A real application must use a hosted payment processor and never store full card numbers in the browser.</div>
    <div className="checkout-grid"><div className="checkout-card">
      <h3>Demo payment card</h3>
      <form onSubmit={saveCard} className="checkout-form">
        <label>Cardholder name<input autoComplete="off" value={name} onChange={e => setName(e.target.value)} required placeholder="Example Student" /></label>
        <label>Test card number<input autoComplete="off" inputMode="numeric" value={grouped(number)} onChange={e => setNumber(digits(e.target.value))} required placeholder="4242 4242 4242 4242" maxLength={19} /></label>
        <div className="form-inline"><label>Expiration (MM/YY)<input autoComplete="off" value={expiry} onChange={e => { let val = e.target.value.replace(/\D/g, '').slice(0,4); setExpiry(val.length > 2 ? `${val.slice(0,2)}/${val.slice(2)}` : val); }} placeholder="12/29" required /></label><label>CVV (never stored)<input autoComplete="off" value={cvv} onChange={e => setCvv(e.target.value.replace(/\D/g,'').slice(0,4))} type="password" inputMode="numeric" required placeholder="123" /></label></div>
        <button type="submit">Save fictional test card</button>
      </form>
      {message && <p role="status" className="notice">{message}</p>}
    </div><div className="checkout-card"><h3>Order summary</h3>
      {cart.length ? cart.map(item=><p key={item.id}>{item.name} × {item.quantity}: ${(item.price*item.quantity).toFixed(2)}</p>) : <p>Your cart is empty. <Link to="/shop">Add a sample item</Link>.</p>}
      <strong>Total: ${total.toFixed(2)}</strong>
      <hr/><h3>Saved test card</h3>
      {saved ? <><p>{saved.name}</p><p>•••• •••• •••• {saved.number.slice(-4)} · Expires {saved.expiry}</p><button className="secondary" onClick={removeCard}>Remove saved card</button></> : <p>No test card saved yet.</p>}
    </div></div>
  </section>;
}
