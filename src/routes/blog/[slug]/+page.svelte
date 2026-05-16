<script lang="ts">
  export let data;
  const { content: Content, metadata } = data;

  function formatDate(dateStr: string) {
    return new Date(dateStr).toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric',
    });
  }
</script>

<svelte:head>
  <title>{metadata.title} — Raul Buibas</title>
  <meta name="description" content={metadata.description ?? metadata.title} />
</svelte:head>

<main class="post-main">
  <div class="post-inner">
    <a href="/blog" class="back">← Writing</a>
    <header>
      <h1>{metadata.title}</h1>
      <div class="post-meta">{formatDate(metadata.date)} · {metadata.readTime}</div>
    </header>
    <article class="prose">
      <svelte:component this={Content} />
    </article>
  </div>
</main>

<style>
  .post-main {
    min-height: 100vh;
    padding: 120px 48px 96px;
    background: var(--cream);
  }
  .post-inner { max-width: 680px; margin: 0 auto; }
  .back {
    font-family: 'DM Mono', monospace;
    font-size: 11px;
    color: var(--ink-faint);
    text-decoration: none;
    letter-spacing: .05em;
    transition: color .2s;
    display: inline-block;
    margin-bottom: 40px;
  }
  .back:hover { color: var(--ink); }
  header { margin-bottom: 56px; }
  header h1 {
    font-family: 'Cormorant Garamond', serif;
    font-size: clamp(32px, 5vw, 52px);
    font-weight: 600;
    color: var(--ink);
    line-height: 1.1;
    letter-spacing: -.02em;
    margin-bottom: 16px;
  }
  .post-meta {
    font-family: 'DM Mono', monospace;
    font-size: 11px;
    color: var(--ink-faint);
  }

  /* Prose styles for mdsvex-rendered markdown */
  .prose :global(p) {
    font-size: 16px;
    color: var(--ink-light);
    line-height: 1.9;
    margin-bottom: 24px;
  }
  .prose :global(h2) {
    font-family: 'Cormorant Garamond', serif;
    font-size: 28px;
    font-weight: 600;
    color: var(--ink);
    margin: 48px 0 20px;
    letter-spacing: -.01em;
  }
  .prose :global(h3) {
    font-family: 'Cormorant Garamond', serif;
    font-size: 22px;
    font-weight: 600;
    color: var(--ink);
    margin: 32px 0 14px;
  }
  .prose :global(strong) { color: var(--ink); font-weight: 500; }
  .prose :global(em) { font-style: italic; }
  .prose :global(a) { color: var(--accent); text-decoration: underline; text-underline-offset: 3px; }
  .prose :global(a:hover) { opacity: .75; }
  .prose :global(code) {
    font-family: 'DM Mono', monospace;
    font-size: 13px;
    background: var(--cream-dark);
    border: 1px solid var(--border);
    padding: 2px 6px;
    border-radius: 2px;
  }
  .prose :global(pre) {
    background: #1c1a17;
    border-radius: 4px;
    padding: 20px 24px;
    overflow-x: auto;
    margin: 28px 0;
  }
  .prose :global(pre code) {
    background: none;
    border: none;
    padding: 0;
    color: #e0d9ce;
    font-size: 13px;
  }
  .prose :global(blockquote) {
    border-left: 2px solid var(--accent);
    padding-left: 20px;
    margin: 28px 0;
    color: var(--ink-light);
    font-style: italic;
  }
  .prose :global(ul), .prose :global(ol) {
    padding-left: 24px;
    margin-bottom: 24px;
  }
  .prose :global(li) {
    font-size: 16px;
    color: var(--ink-light);
    line-height: 1.8;
    margin-bottom: 8px;
  }
  .prose :global(hr) {
    border: none;
    border-top: 1px solid var(--border);
    margin: 48px 0;
  }

  @media (max-width: 768px) {
    .post-main { padding: 100px 24px 64px; }
  }
</style>
