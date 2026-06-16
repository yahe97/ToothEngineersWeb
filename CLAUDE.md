# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

A static HTML/CSS/JS website for **Tooth Engineers** (https://toothengineers.com) — a dental science content creator that bridges dentistry and bioengineering. This repo is the replacement for their WordPress site, intended to be deployed as a static host (GitHub Pages, Netlify, Firebase Hosting, etc.).

## File Structure

```
index.html       # Homepage: hero, mission strip, featured articles, shop teaser, newsletter
about.html       # About page: founder story, values, team
articles.html    # Articles listing with JS category filter + sidebar
shop.html        # Shop (coming soon): product teasers + notify form
contact.html     # Contact form with client-side validation
css/style.css    # All styles (single file, CSS variables, mobile-first responsive)
js/main.js       # Shared JS: mobile nav, filter, counters, form validation, scroll-reveal
images/          # Place images here; currently empty (emoji placeholders used throughout)
```

## Development

No build step — open any `.html` file directly in a browser, or serve with:

```bash
npx serve .          # Node-based static server
python -m http.server # Python alternative
```

## Architecture

**Single CSS file** — `css/style.css` uses CSS custom properties (`:root` variables) for all colors, spacing, and shadows. All page-specific styles are namespaced by class and live in clearly marked sections with `/* ══ SECTION ══ */` banners.

**Single JS file** — `js/main.js` is loaded at the bottom of every page via `<script src="js/main.js">`. It feature-detects before acting (checks element existence, uses `IntersectionObserver` with a guard) so unused features on a given page silently no-op.

**No framework, no dependencies** — pure HTML5/CSS3/JS. Google Fonts (Inter + Playfair Display) are the only external resource.

## Content Source

All content was sourced from https://toothengineers.com. Article titles, dates, authors, and company copy are verbatim from the live WordPress site. Article body excerpts in the cards are summaries based on each title — not the original article text, which lives on WordPress.

## Key Design Tokens (css/style.css `:root`)

| Variable | Value | Use |
|---|---|---|
| `--primary` | `#005F8E` | Buttons, links, nav active |
| `--accent` | `#00C2A8` | Accent buttons, category labels, highlights |
| `--dark` | `#0D1B2A` | Hero backgrounds, footer |
| `--light` | `#F0F8FF` | Section alternates, sidebar, tags |

## Article Categories

The articles filter (`data-category` attribute on each `.article-list-card`) maps to these filter keys: `innovation`, `science`, `health`, `experiments`, `vitamins`, `announcements`.

## Deploying

Push to GitHub and connect to Netlify, GitHub Pages, or Firebase Hosting. No build step needed — the repo root is the publish directory.

For GitHub Pages: Settings → Pages → Source: `main` branch, `/ (root)`.
