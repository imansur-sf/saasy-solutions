# saasy-solutions Session Handoff

Last updated: 2026-08-08. **Read this first.** No PROGRESS.md exists yet for this repo — `git log` is the history; this file is current state + what's left.

## Where we are

- **Working directory**: `/Users/imansur/claude/saasy-solutions`.
- **Branch**: `main`. Fully in sync with `origin/main` — nothing pending push. Working tree clean (only the hook-managed `.claude/` directory is untracked, intentionally left that way).
- **Role**: the landing page / catalog listing every SaaSy Solutions tool (Unified Profile Generator, Loyalty Portal Generator, Interactive Customer Presentations, plus MeshMesh/Slackbot/GitHub tools from `tools.js`). Static site, deployed via GitHub Pages (see README's "Deploying to GitHub Pages" section — unchanged, still accurate).
- **Cross-property save/sign-in initiative is fully complete.** This catalog is one of five repos — alongside UPG, LPG, ICP, and the shared backend `saasy-accounts` — in that initiative. This repo's piece is the **"My Projects" cross-tool aggregation section** (`c06b5d7`): unlike each generator's own per-tool My-Projects panel, this one pulls saved projects from *all three* tools into a single view and deep-links back into whichever generator owns each one.
- Also added: a Google Analytics 4 tag (`2bf2ea2`, measurement ID `G-P1VVG2CEET`).
- **No open backlog items.** Watch for regressions the user flags after reviewing the My Projects section, since it shipped without a design check-in.

## "My Projects" section (`c06b5d7`)

- **Markup** (`index.html`): nav link `<a href="#my-projects" data-section="my-projects">My Projects</a>` (line 34); `<section id="my-projects">` (line 85) with two mutually-exclusive states — `#my-projects-signed-out` (sign-in prompt + `#btn-my-projects-signin`) and `#my-projects-signed-in` (email display `#my-projects-email` + `#btn-my-projects-signout` + `#my-projects-grid`), toggled via a `hidden` class.
- **Logic** (`app.js`, `~line 89` onward): `PROJECT_TOOLS` maps `upg`/`lpg`/`icp` to each generator's live Heroku URL + display label. `loadMyProjects()` calls `window.SaasyAuth.listProjects({ tool })` once per tool in parallel (`Promise.all`, each with `.catch(() => [])` so one tool's outage doesn't blank the whole grid), flattens/tags results with their tool, sorts by `updated_at`/`created_at` descending, and renders cards. Each card's "Reopen »" link is `${toolInfo.url}?projectId=${p.id}` opened in a new tab — this is what the three generators' `?projectId=` auto-hydration (see their own HANDOFF.md files) picks up. Delete goes through `window.SaasyAuth.deleteProject(id)` with a `confirm()` guard. Sign-in/out wiring (`initMyProjects()`) just calls `window.SaasyAuth.signIn()` / `signOut()` then re-syncs the UI.
- **Shared widget script tag**: `<script src="https://sassysolutions-accounts-8215113235cf.aster-virginia.herokuapp.com/saasy-auth.js"></script>` (`index.html:128`) — same widget UPG/LPG/ICP use, served by `saasy-accounts`.
- See `saasy-accounts/HANDOFF.md` (sibling repo) for the backend side (OTP/JWT/Postgres) this section calls into.

## Standing directives

1. **Auto-push**: for this repo, run `git add`/`commit`/`push` directly rather than handing the user terminal commands (established convention, mirrors the sibling generator repos).
2. **No secrets in committed source.**
3. Do not commit the hook-managed `.claude/` directory — it's intentionally untracked local session state.

## Key files

- **`index.html`** — single page with Home / Tools / My Projects / About sections. My Projects markup at line ~85.
- **`app.js`** — `renderTools`/`initTabs`/`initNavHighlight` (pre-existing catalog rendering), `PROJECT_TOOLS`, `syncMyProjectsUI`, `loadMyProjects`, `deleteMyProject`, `initMyProjects` (all new, from `c06b5d7`).
- **`tools.js`** — edit this to add/remove tool cards (see README for the entry shape); unrelated to My Projects.
- **`styles.css`** — 8-bit theme; includes My Projects grid/card styling added alongside `c06b5d7`.
- **`README.md`** — setup/deploy instructions only (local preview, adding a tool, GitHub Pages deploy). Still accurate but predates My Projects/GA4 — this HANDOFF.md is where those live, not the README.

## What to do next session

1. No known open backlog items. If the user raises new findings after reviewing the My Projects section, triage those first.
2. For the shared-backend side of any My-Projects/SaasyAuth issue, see `saasy-accounts/HANDOFF.md` (sibling repo) — it owns the OTP/JWT/Postgres logic this section calls into.
