# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev        # dev server at http://localhost:5173
npm run build      # production build (symlink step fails on Windows — works fine on Vercel/Linux)
npm run preview    # preview the production build locally
npm run check      # TypeScript + Svelte diagnostics
```

## Architecture

SvelteKit personal site deployed on Vercel at **raulbuibas.dev**.

**Stack:** SvelteKit 2 + Svelte 5 + TypeScript + mdsvex + `@sveltejs/adapter-vercel`

### Key data flows

**Blog posts** — Markdown files in `src/posts/*.md` are processed by mdsvex into Svelte components. Each file requires frontmatter: `title`, `date`, `readTime`, `description`. Posts are loaded via `import.meta.glob('/src/posts/*.md')` — adding a new `.md` file is all that's needed to publish a post.

**Home page writing section** — `src/routes/+page.ts` loads the 3 most recent posts (sorted by `date`) and passes them to the `Writing` component as a prop.

**IRC chat widget** — `src/lib/components/IrcChat.svelte` sends `POST /api/chat` with `{ message, history }`. The server route `src/routes/api/chat/+server.ts` proxies to the Anthropic API (Haiku model) using `ANTHROPIC_API_KEY` from `$env/static/private`. The system prompt / persona lives entirely in that server file. To swap in a RAG backend, replace the Anthropic call in `+server.ts` — the client component doesn't need to change.

**Scroll reveal** — `.reveal` CSS class (defined in `src/app.css`) starts elements invisible. `src/routes/+layout.svelte` sets up an `IntersectionObserver` on mount and after each navigation that adds `.visible` to trigger the transition.

### Environment

Requires a `.env` file (copy from `.env.example`) with:
```
ANTHROPIC_API_KEY=sk-ant-...
```

On Vercel, set this in Project Settings → Environment Variables.
