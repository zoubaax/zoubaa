# Zoubaa — Vite + React Starter

A minimal Vite + React starter configured with Tailwind, ESLint and a small single-page layout with sections (Home, About, Skills, Contact) and a preloader.

## Features
- Vite dev server with React
- Tailwind CSS (via @tailwindcss packages)
- ESLint configuration (react hooks + vite refresh)
- Simple SPA layout with anchorable sections
- Preloader and dark ("drake") mode toggle support

## Prerequisites
- Node.js (16+ recommended)
- npm

## Install
1. Install dependencies:
   npm install

## Available scripts
- npm run dev — start Vite dev server
- npm run build — build production bundle
- npm run preview — locally preview production build
- npm run lint — run ESLint (if configured in package.json)

(If these scripts are not yet defined in package.json, add them as needed:
```
"scripts": {
  "dev": "vite",
  "build": "vite build",
  "preview": "vite preview",
  "lint": "eslint . --ext .js,.jsx"
}
```)

## Project structure (key files)
- index.html — app entry
- src/main.jsx — React bootstrap
- src/App.jsx — main single-page layout and routing sections
- src/components/ — Navbar, Home, About, MySkills, Contact, Preloader
- src/index.css — Tailwind entry
- vite.config.js — Vite config (create/update if needed)
- eslint.config.js — ESLint configuration
- package.json / package-lock.json — dependencies and lockfile
- LICENSE — MIT license

## Tailwind notes
- src/index.css currently imports Tailwind. Ensure Tailwind is configured (tailwind.config.js) and postcss setup exists if you plan to use custom utilities.

## Tips
- Use section IDs (`#home`, `#about`, etc.) to scroll between sections from the Navbar.
- The app sets a 3.5s preloader by default — adjust in `App.jsx` useEffect timeout.
- If you enable drake/dark mode, background colors are controlled in `App.jsx`.

## License
MIT — see LICENSE file.
