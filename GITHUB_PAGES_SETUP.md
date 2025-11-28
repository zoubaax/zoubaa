# GitHub Pages Deployment Setup

This guide explains how the GitHub Pages routing is configured for this React SPA.

## Files Created for GitHub Pages

### 1. `public/404.html`
This file handles client-side routing for GitHub Pages. When someone navigates directly to a route like `/zoubaa/login`, GitHub Pages will serve the 404.html file, which then redirects to `index.html` with the correct path in the query string.

### 2. `index.html` (Updated)
Added a script that reads the redirect from the query string and restores the correct URL in the browser history, allowing React Router to handle the routing.

### 3. `public/.nojekyll`
Prevents GitHub Pages from processing the site with Jekyll, which can interfere with React apps.

## How It Works

1. User navigates to `https://zoubaax.github.io/zoubaa/login`
2. GitHub Pages doesn't find a file at that path, so it serves `404.html`
3. The `404.html` script redirects to `index.html?/login`
4. The script in `index.html` reads the query string and updates the browser history to `/zoubaa/login`
5. React Router then handles the route correctly

## Deployment Steps

1. **Build the project:**
   ```bash
   npm run build
   ```

2. **Deploy to GitHub Pages:**
   ```bash
   npm run deploy
   ```

   Or manually:
   ```bash
   git add dist -f
   git commit -m "Deploy to GitHub Pages"
   git subtree push --prefix dist origin gh-pages
   ```

3. **Verify the deployment:**
   - Go to your repository settings
   - Navigate to Pages
   - Make sure the source is set to `gh-pages` branch
   - Visit `https://zoubaax.github.io/zoubaa/login` to test

## Important Notes

- The `base: '/zoubaa'` in `vite.config.js` must match your GitHub Pages path
- The `basename="/zoubaa"` in `main.jsx` must also match
- After deploying, wait a few minutes for GitHub Pages to update
- Clear your browser cache if routes don't work immediately

## Troubleshooting

If routes still don't work:
1. Check that `404.html` is in the `dist` folder after building
2. Verify the `base` path in `vite.config.js` matches your repository name
3. Make sure `.nojekyll` is in the `dist` folder
4. Check browser console for any errors
5. Try accessing the route directly (not through navigation)

