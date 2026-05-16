# raulbuibas.dev

Personal website built with SvelteKit, deployed on Vercel.

## Stack

- [SvelteKit](https://kit.svelte.dev) + Svelte 5
- [mdsvex](https://mdsvex.com) for Markdown blog posts
- [Anthropic API](https://anthropic.com) for the IRC-style chat widget
- Deployed on [Vercel](https://vercel.com)

## Development

```bash
cp .env.example .env   # add your ANTHROPIC_API_KEY
npm install
npm run dev            # http://localhost:5173
```

## Writing a post

Add a `.md` file to `src/posts/` with this frontmatter:

```yaml
---
title: "Post title"
date: "2026-05-01"
readTime: "4 min read"
description: "One-line description"
---
```

That's it — the post appears automatically on the home page and `/blog`.

## Deployment

Hosted on Vercel. Every push to `main` triggers a redeploy. Set `ANTHROPIC_API_KEY` in Vercel project settings → Environment Variables.
