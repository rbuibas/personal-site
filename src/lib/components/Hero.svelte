<script lang="ts">
  // Defaults are the personal site's copy, so <Hero /> with no props keeps
  // rendering exactly what it always did. The professional page passes its
  // own content (see src/lib/data/professional.ts).
  export let eyebrow = 'Engineer · Explorer · Enthusiast';
  export let lines: Array<{ text: string; em?: boolean }> = [
    { text: 'Building things.' },
    { text: 'Thinking a lot.', em: true },
    { text: 'Rebuilding things.' },
  ];
  export let bio =
    'Engineer by calling. Architect in my head. I explore systems, ideas, and — recently — ' +
    'the sheer awe of a new consciousness emerging before my eyes.';
  export let tags = ['Travelling', 'Gardening', 'Wondering', 'Building', 'Writing'];
  export let bgLetter = 'E';
  export let scrollLabel = 'Scroll to explore';
</script>

<section class="hero">
  <div class="hero-bg-letter" aria-hidden="true">{bgLetter}</div>
  <div class="hero-eyebrow">{eyebrow}</div>
  <h1>
    {#each lines as line, i}
      {#if i > 0}<br />{/if}
      {#if line.em}<em>{line.text}</em>{:else}{line.text}{/if}
    {/each}
  </h1>
  <p class="hero-bio">{bio}</p>
  <div class="hero-tags">
    {#each tags as tag}
      <span class="tag">{tag}</span>
    {/each}
  </div>
  <div class="hero-scroll">
    <div class="scroll-line"></div>
    <span>{scrollLabel}</span>
  </div>
</section>

<style>
  .hero {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 120px 48px 80px;
    position: relative;
    overflow: hidden;
  }
  .hero-eyebrow {
    font-family: 'DM Mono', monospace;
    font-size: 11px;
    letter-spacing: 3px;
    text-transform: uppercase;
    color: var(--accent);
    margin-bottom: 28px;
    animation: fadeUp .8s .2s ease both;
  }
  .hero h1 {
    font-family: 'Cormorant Garamond', serif;
    font-size: clamp(48px, 7vw, 88px);
    font-weight: 600;
    line-height: 1.05;
    letter-spacing: -.02em;
    max-width: 820px;
    margin-bottom: 32px;
    animation: fadeUp .8s .35s ease both;
  }
  .hero h1 em { font-style: italic; color: var(--accent); }
  .hero-bio {
    font-size: 16px;
    color: var(--fg-muted);
    max-width: 520px;
    line-height: 1.8;
    margin-bottom: 40px;
    animation: fadeUp .8s .5s ease both;
  }
  .hero-tags {
    display: flex;
    gap: 10px;
    flex-wrap: wrap;
    margin-bottom: 56px;
    animation: fadeUp .8s .65s ease both;
  }
  .tag {
    font-family: 'DM Mono', monospace;
    font-size: 11px;
    padding: 5px 12px;
    border: 1px solid var(--border);
    border-radius: 2px;
    color: var(--fg-muted);
    letter-spacing: .05em;
  }
  .hero-scroll {
    display: flex;
    align-items: center;
    gap: 14px;
    animation: fadeUp .8s .8s ease both;
  }
  .scroll-line { width: 48px; height: 1px; background: var(--accent); }
  .hero-scroll span { font-size: 12px; color: var(--fg-faint); letter-spacing: .1em; }
  .hero-bg-letter {
    position: absolute;
    right: -40px; bottom: -60px;
    font-family: 'Cormorant Garamond', serif;
    font-size: 400px;
    font-weight: 700;
    color: rgba(0, 0, 0, .03);
    line-height: 1;
    pointer-events: none;
    user-select: none;
    animation: fadeIn 1.2s .5s ease both;
  }

  @media (max-width: 768px) {
    .hero { padding: 100px 24px 60px; }
    .hero-bg-letter { font-size: 200px; }
  }
</style>
