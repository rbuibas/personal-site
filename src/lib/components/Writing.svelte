<script lang="ts">
  export let posts: Array<{ slug: string; title: string; date: string; readTime: string }> = [];

  function formatDate(dateStr: string) {
    return new Date(dateStr).toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
  }
</script>

<section class="section" id="writing" style="background: #fff">
  <div class="section-inner">
    <div class="section-label reveal">Writing</div>
    <div class="posts">
      {#each posts as post}
        <a href="/blog/{post.slug}" class="post reveal">
          <div>
            <h3>{post.title}</h3>
            <div class="post-meta">{formatDate(post.date)} · {post.readTime}</div>
          </div>
          <span class="post-arrow">→</span>
        </a>
      {:else}
        <p class="empty">No posts yet — check back soon.</p>
      {/each}
    </div>
    {#if posts.length > 0}
      <a href="/blog" class="all-posts">View all posts →</a>
    {/if}
  </div>
</section>

<style>
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
    letter-spacing: .05em;
    padding: 32px 0;
  }
  .all-posts {
    display: inline-block;
    margin-top: 24px;
    font-family: 'DM Mono', monospace;
    font-size: 11px;
    color: var(--accent);
    text-decoration: none;
    letter-spacing: .05em;
    transition: letter-spacing .2s;
  }
  .all-posts:hover { letter-spacing: .1em; }
</style>
