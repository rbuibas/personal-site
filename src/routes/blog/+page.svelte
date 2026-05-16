<script lang="ts">
  export let data;

  function formatDate(dateStr: string) {
    return new Date(dateStr).toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
  }
</script>

<svelte:head>
  <title>Writing — Raul Buibas</title>
</svelte:head>

<main class="blog-main">
  <div class="blog-inner">
    <a href="/" class="back">← Back</a>
    <h1 class="blog-title">Writing</h1>
    <div class="posts">
      {#each data.posts as post}
        <a href="/blog/{post.slug}" class="post">
          <div>
            <h3>{post.title}</h3>
            <div class="post-meta">{formatDate(post.date)} · {post.readTime}</div>
          </div>
          <span class="post-arrow">→</span>
        </a>
      {:else}
        <p class="empty">No posts yet.</p>
      {/each}
    </div>
  </div>
</main>

<style>
  .blog-main {
    min-height: 100vh;
    padding: 120px 48px 96px;
    background: var(--cream);
  }
  .blog-inner { max-width: 720px; margin: 0 auto; }
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
  .blog-title {
    font-family: 'Cormorant Garamond', serif;
    font-size: clamp(36px, 5vw, 56px);
    font-weight: 600;
    color: var(--ink);
    margin-bottom: 48px;
    letter-spacing: -.02em;
  }
  .posts { display: flex; flex-direction: column; }
  .post {
    display: flex;
    justify-content: space-between;
    align-items: baseline;
    padding: 24px 0;
    border-bottom: 1px solid var(--border);
    text-decoration: none;
    transition: padding-left .3s ease;
  }
  .post:first-child { border-top: 1px solid var(--border); }
  .post:hover { padding-left: 10px; }
  .post h3 {
    font-family: 'Cormorant Garamond', serif;
    font-size: 22px;
    font-weight: 600;
    color: var(--ink);
    margin-bottom: 6px;
    transition: color .2s;
  }
  .post:hover h3 { color: var(--accent); }
  .post-meta {
    font-family: 'DM Mono', monospace;
    font-size: 11px;
    color: var(--ink-faint);
  }
  .post-arrow {
    font-size: 20px;
    color: var(--ink-faint);
    transition: color .2s, transform .2s;
    flex-shrink: 0;
  }
  .post:hover .post-arrow { color: var(--accent); transform: translateX(4px); }
  .empty {
    font-family: 'DM Mono', monospace;
    font-size: 12px;
    color: var(--ink-faint);
    padding: 32px 0;
  }

  @media (max-width: 768px) {
    .blog-main { padding: 100px 24px 64px; }
  }
</style>
