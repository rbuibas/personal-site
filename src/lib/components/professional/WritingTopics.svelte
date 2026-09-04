<script lang="ts">
  import type { WritingEntry } from '$lib/data/professional';

  export let id: string;
  export let label: string;
  export let intro = '';
  export let entries: WritingEntry[] = [];

  function formatDate(dateStr: string) {
    return new Date(dateStr).toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
  }
</script>

<section class="section" {id}>
  <div class="section-inner">
    <div class="section-label reveal">{label}</div>
    {#if intro}
      <p class="wt-intro reveal">{intro}</p>
    {/if}

    <div class="wt-list">
      {#each entries as entry (entry.id)}
        <!--
          An entry only becomes a link once its post exists. Until then it is a
          plain row saying so, rather than a promise that 404s.
        -->
        <svelte:element
          this={entry.post ? 'a' : 'div'}
          class="wt-entry reveal"
          class:linked={!!entry.post}
          href={entry.post ? `/blog/${entry.slug}` : undefined}
        >
          <div class="wt-text">
            <h3 class="wt-title">{entry.title}</h3>
            <p class="wt-standfirst">{entry.standfirst}</p>
            <div class="wt-meta">
              {#if entry.post}
                {formatDate(entry.post.date)} · {entry.post.readTime}
              {:else}
                drafting
              {/if}
            </div>
          </div>
          {#if entry.post}
            <span class="wt-arrow" aria-hidden="true">→</span>
          {/if}
        </svelte:element>
      {/each}
    </div>

    <a href="/blog" class="wt-all reveal">View all posts →</a>
  </div>
</section>

<style>
  .wt-intro {
    font-size: 16px;
    color: var(--fg-muted);
    line-height: 1.9;
    max-width: 60ch;
    margin: -20px 0 44px;
  }

  .wt-list { display: flex; flex-direction: column; }

  .wt-entry {
    display: flex;
    justify-content: space-between;
    align-items: baseline;
    gap: 40px;
    padding: 26px 0;
    border-top: 1px solid var(--border);
    text-decoration: none;
  }
  .wt-entry:last-child { border-bottom: 1px solid var(--border); }
  .wt-entry.linked { transition: padding-left .3s ease; }
  .wt-entry.linked:hover { padding-left: 10px; }

  .wt-text { display: flex; flex-direction: column; gap: 8px; }
  .wt-title {
    font-family: 'Cormorant Garamond', serif;
    font-size: 26px;
    font-weight: 600;
    color: var(--fg);
    line-height: 1.25;
    transition: color .2s;
  }
  .wt-entry.linked:hover .wt-title { color: var(--accent); }
  .wt-standfirst {
    font-size: 15px;
    line-height: 1.8;
    color: var(--fg-muted);
    max-width: 68ch;
  }
  .wt-meta {
    font-family: 'DM Mono', monospace;
    font-size: 11px;
    color: var(--fg-faint);
  }
  .wt-arrow {
    font-size: 20px;
    color: var(--fg-faint);
    flex-shrink: 0;
    transition: color .2s, transform .2s;
  }
  .wt-entry.linked:hover .wt-arrow { color: var(--accent); transform: translateX(4px); }

  .wt-all {
    display: inline-block;
    margin-top: 28px;
    font-family: 'DM Mono', monospace;
    font-size: 11px;
    color: var(--accent);
    text-decoration: none;
    letter-spacing: .05em;
    transition: letter-spacing .2s;
  }
  .wt-all:hover { letter-spacing: .1em; }

  @media (max-width: 768px) {
    .wt-title { font-size: 22px; }
  }

  @media (prefers-reduced-motion: reduce) {
    .wt-entry, .wt-title, .wt-arrow, .wt-all { transition: none; }
  }
</style>
