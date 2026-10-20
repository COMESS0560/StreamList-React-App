# StreamList – React App Setup, Part 1

A starter React application built with Vite, React Router, and CSS for the Week 1 StreamList assignment.

## What is included

- A working navigation bar with four routes: **StreamList**, **Movies**, **Cart**, and **About**.
- The StreamList homepage has an input form. When submitted, its value is printed to the browser's **developer console**; it is intentionally not saved yet.
- Movies and Cart contain placeholder text for **Week 4**.
- About contains placeholder text for **Week 5**.
- Custom CSS, including a mobile-friendly layout.

## Run locally

1. Install the current LTS version of Node.js if needed.
2. Open this folder in Visual Studio Code.
3. Open the VS Code terminal (**Terminal > New Terminal**).
4. Run `npm install`.
5. Run `npm run dev`.
6. Open the local link printed in the terminal (usually `http://localhost:5173`).
7. Click each navigation link to check that it works.
8. Return to StreamList, press **F12**, select the **Console** tab, type a movie name, and click **Add to Console**. The entry will appear in the console.

## GitHub submission

Create a **new GitHub repository** for this project. Upload the source files and folders (do **not** upload `node_modules/` or `dist/`). Copy your GitHub repository URL into your Part 2 paper.

Useful terminal commands (after creating an empty repository on GitHub):

```bash
git init
git add .
git commit -m "Set up StreamList React application"
git branch -M main
git remote add origin YOUR_GITHUB_REPO_URL
git push -u origin main
```

## Assignment notes

This is **Part 1 only**: the Movies, Cart, and About content is intentionally reserved for the future weeks named in the assignment. The required 2–5 minute recorded screencast is not included as a finished video; use `WALKTHROUGH_SCRIPT.md` while recording your working app.
