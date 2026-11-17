# StreamList — INT499 Final Project Part 1 (Security Demo)

This project preserves the Week 5 React movie search, watchlist, cart, and PWA work and adds a **Google sign-in demonstration**, route redirect, **Checkout** button, and **fictional test card** management. No real payment is processed.

## 1. Open the correct project directory
In VS Code, open the folder **StreamList_Security_Part1** (the one with `package.json`).

## 2. Set up Google login (required for the real Google button)
1. Visit https://console.cloud.google.com/ and create/select a project.
2. Go to Google Auth Platform / Clients (or APIs & Services / Credentials) and create an OAuth client ID, **Web application**.
3. Set **Authorized JavaScript origins** to `http://localhost:5173` and `http://localhost:4173` (also add any alternate local ports actually used). No redirect URI is required for this popup callback flow.
4. Configure the Google Auth consent screen. If the app is in testing mode, add your own Google account as a test user.
5. Copy `.env.example` to `.env`. Set `VITE_GOOGLE_CLIENT_ID` to your new Web Client ID. Add your existing TMDB development token to `VITE_TMDB_READ_TOKEN` if you want movie search. **Never put a Google client secret or private API token in frontend code**. The Web Client ID itself is public.
6. Restart Vite after changing `.env`.

## 3. Run it on Windows
From the folder with `package.json`:
```
npm.cmd install
npm.cmd run dev
```
Open `http://localhost:5173/` or the localhost URL shown by Vite. For the PWA production preview use:
```
npm.cmd run build
npm.cmd run preview
```

## 4. Show these three screens in your class video
- **Login:** open the app in a private window, show the redirect to `/login`, sign in with Google.
- **Cart:** go to Shop, add popcorn, open Cart, and click Checkout.
- **Checkout:** enter fictional `4242 4242 4242 4242`, a future `MM/YY`, and a made-up 3-digit CVV. Show number formatting and the masked saved test card, then click Remove.

Use fictional data only. This project restricts entry to two common payment sandbox test numbers; no live payments are possible. The browser stores the **fictional test number**, name, and expiry in localStorage, in order to demonstrate the classroom assignment requirement. It never stores the CVV.

## Important limitations
- **Not production authentication:** the browser checks basic token claims but does not cryptographically verify Google ID tokens. Protected routes are a **front-end user-interface gate**, not real server authorization. A production backend must verify ID tokens and issue secure sessions before allowing private data access.
- **Not production payment handling:** never put real payment card details in localStorage, even masked. Use a hosted payment provider and store only payment tokens / last four digits in production.
- **Google sign-in and TMDB search require internet access**; the PWA's offline shell does not make those services work offline.
- Demo users should clear saved test cards after recording. The login state resets when the page is refreshed; this avoids representing the prototype as a secure persistent session.

## GitHub
Repository: https://github.com/COMESS0560/StreamList-React-App
Upload source files (including `src` and `public`) without `.env`, `node_modules`, or `dist`. Preserve their folder paths.
