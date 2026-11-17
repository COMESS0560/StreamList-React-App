# StreamList – Week 5 Final PWA

This is the **uploaded Week 4 StreamList project** with Progressive Web App support integrated. The original movie search, watchlist, cart, activity history, notes and localStorage safety checks remain in place. No parts of the React pages were replaced.

## Setup (Windows / PowerShell)

1. Open this **StreamList_Week5** folder in VS Code (it contains `package.json`).
2. If you want TMDB search, copy `.env.example` to `.env` and insert your *own* TMDB API Read Access Token. `.env` is deliberately not included in this ZIP to avoid disclosing credentials.
3. In the VS Code terminal, run:

```powershell
npm.cmd install
npm.cmd run build
npm.cmd run preview
```

4. Open the localhost preview link shown (often `http://localhost:4173/`). **Use `build` + `preview` for PWA testing.** The service worker is not registered by `npm.cmd run dev`.
5. In Chrome or Edge, open DevTools (`F12`) → **Application** → **Manifest** and **Service Workers**. Check the installed manifest and running service worker. Use the browser's install icon/menu to install StreamList if offered.
6. While online, visit the homepage, watchlist, shop, cart and activity pages. Go to DevTools → Network → Offline and refresh a **previously visited** route; its app shell should load. Saved watchlist/cart content remains in your browser using localStorage. **Live TMDB search needs internet**, so it is *not* available offline.
7. Test movie search with a configured TMDB token, watchlist save/remove, notes, cart add/remove/total, page refresh, and activity history.

## What changed for Week 5

- `public/manifest.webmanifest`: installable desktop app name, scope, colors and icons.
- `public/icons/`: 192px and 512px PNGs plus 512px maskable icon.
- `public/sw.js`: service worker caching local app shell and bundled assets; excludes TMDB and external requests.
- `src/registerSW.js`: production-only registration.
- `src/main.jsx`: imports the registration module.
- `index.html`: manifest, theme and icon references.
- `scripts/inject-precache.mjs`: fills in exact hashed production assets after Vite builds.
- `package.json`: build command triggers the precache step.

## Notes and limitations

- Installability must be verified in the target browser. Modern browsers generally require a secure context (`localhost` qualifies) and a valid manifest; details may vary.
- Offline supports **previously cached app pages and local content**, not remote movie searches or images served by TMDB. Online search requires a valid API token.
- Service workers only control pages after activation; after the first load, refresh once before testing offline.
- Vite's client-side `VITE_` variables are public in the browser, so keep secrets out of them. `.env` was omitted from the ZIP and is ignored by Git.
- Host an SPA with a fallback to `index.html` for deep links.

GitHub project: https://github.com/COMESS0560/StreamList-React-App
