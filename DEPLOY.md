# Deploying to Vercel

## One-time setup

1. Copy `.env.example` to `.env` and add your Anthropic key:
   ```
   ANTHROPIC_API_KEY=sk-ant-...
   ```

2. Push the repo to GitHub (or GitLab / Bitbucket).

3. Import the project in [vercel.com/new](https://vercel.com/new).

4. In the Vercel project settings → **Environment Variables**, add:
   - `ANTHROPIC_API_KEY` = your key

5. Deploy. Vercel auto-detects SvelteKit and uses the right build command.

## Local development

```bash
npm run dev          # http://localhost:5173
npm run build        # production build (Linux/CI only — symlinks fail on Windows)
npm run preview      # preview the production build
npm run check        # TypeScript + Svelte diagnostics
```

## Swapping in your RAG backend

The IRC chat calls `POST /api/chat` (see `src/routes/api/chat/+server.ts`).
Replace the Anthropic SDK call there with your own RAG logic — the client-side
component doesn't need to change.

Expected contract:
- **Request body**: `{ message: string, history: [{role, content}][] }`
- **Response**: `{ reply: string }`
