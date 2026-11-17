// Register only in the production preview/deployment, not Vite development mode.
// Offline caching is intentionally limited to the local app shell and assets.
if (import.meta.env.PROD && 'serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js', { scope: '/' })
      .catch(error => console.warn('StreamList service worker could not register:', error));
  });
}
