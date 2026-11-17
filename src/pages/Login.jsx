import { useEffect, useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;

export default function Login({ onLogin }) {
  const buttonRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();
  const [error, setError] = useState('');
  useEffect(() => {
    if (!clientId || clientId.includes('PASTE_')) return;
    let disposed = false;
    const script = document.createElement('script');
    script.src = 'https://accounts.google.com/gsi/client';
    script.async = true;
    script.defer = true;
    script.onload = () => {
      if (disposed || !window.google || !buttonRef.current) return;
      window.google.accounts.id.initialize({
        client_id: clientId,
        callback: response => {
          try {
            // Class demo only: JWT payload is decoded, NOT cryptographically verified.
            // A real application must send the ID token to a backend for validation.
            const payload = response.credential.split('.')[1];
            const decoded = JSON.parse(atob(payload.replace(/-/g, '+').replace(/_/g, '/')));
            if (decoded.aud !== clientId || decoded.iss !== 'https://accounts.google.com' && decoded.iss !== 'accounts.google.com' || decoded.exp * 1000 < Date.now() || !decoded.sub) throw new Error('Token fields are invalid');
            onLogin({ name: decoded.name || decoded.email || 'Google user', email: decoded.email || '' });
            navigate(location.state?.from || '/', { replace: true });
          } catch {
            setError('Google sign-in could not be completed. Please try again.');
          }
        }
      });
      window.google.accounts.id.renderButton(buttonRef.current, { theme: 'outline', size: 'large', width: 300, text: 'signin_with' });
    };
    script.onerror = () => setError('Could not load Google sign-in. Check your internet connection.');
    document.head.appendChild(script);
    return () => { disposed = true; script.remove(); };
  }, [onLogin, navigate, location.state]);
  return <main className="auth-wrap"><div className="auth-panel">
    <div className="eyebrow">STREAMLIST · FINAL SECURITY PROJECT</div>
    <h1>Welcome back.</h1>
    <p>Sign in with Google to access movie search, watchlists, shopping cart, and checkout.</p>
    {!clientId || clientId.includes('PASTE_') ? <div className="notice"><strong>One-time setup required:</strong> Add your Google Web Client ID to <code>VITE_GOOGLE_CLIENT_ID</code> in <code>.env</code>, then restart Vite. See README_SECURITY_SETUP.md.</div> : <div ref={buttonRef} className="google-button" />}
    {error && <p role="alert" className="error">{error}</p>}
    <p className="privacy-hint">Classroom prototype: login is gated in React only. Real secure access requires server-side Google token verification.</p>
  </div></main>;
}
