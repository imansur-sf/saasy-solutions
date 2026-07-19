# SaaSy Solutions

An 8-bit themed landing page listing the tools I've built across MeshMesh, Slack, and GitHub.

## Local preview

Any static server works. Two easy options:

```bash
# Python 3
python3 -m http.server 8080

# Node
npx serve .
```

Then open <http://localhost:8080>.

## Files

- `index.html` — single page with Home / Tools / About sections
- `styles.css` — 8-bit theme (pixel fonts, chunky borders, scanline overlay)
- `tools.js` — **edit this to add/remove tools** (see comments inside)
- `app.js` — renders tool cards, tab filter, nav highlight
- `assets/logo.gif` — your SaaSy Solutions logo (drop it here)
- `assets/background.png` — the dungeon stone background (drop it here)

## Adding your images

Save the two images you have to:

- `assets/logo.gif` — the SaaSy Solutions pixel-art logo
- `assets/background.png` — the dungeon stone floor/wall background

Filenames must match exactly, or update the references in `index.html` (favicon + `<img>` tags) and `styles.css` (`body { background-image }`).

## Adding a tool

Open `tools.js` and add an entry:

```js
{
  category: 'meshmesh',            // 'meshmesh' | 'slackbot' | 'github'
  name: 'My Tool',
  icon: '⚡',                       // any character or emoji
  desc: 'What it does in one line.',
  url: 'https://link-to-tool'
}
```

## Editing the About page

Open `index.html`, find the `<section id="about">` block, and replace the placeholder text and social links.

## Deploying to GitHub Pages

1. Create a new GitHub repo (e.g. `saasy-solutions`) — can be public or private (private requires a Pro plan for Pages).
2. From this folder:
   ```bash
   git init
   git add .
   git commit -m "Initial SaaSy Solutions site"
   git branch -M main
   git remote add origin git@github.com:YOUR_USERNAME/saasy-solutions.git
   git push -u origin main
   ```
3. On GitHub, go to **Settings → Pages**.
4. Under **Build and deployment**, set **Source** to `Deploy from a branch`, **Branch** to `main` / `/ (root)`, and Save.
5. Wait ~1 minute; your site will be at `https://YOUR_USERNAME.github.io/saasy-solutions/`.

For a custom domain, add a `CNAME` file with your domain and configure DNS per GitHub's docs.
