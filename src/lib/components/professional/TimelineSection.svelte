<script lang="ts">
  import { onMount } from 'svelte';
  import type { TimelineItem } from '$lib/data/professional';

  export let id: string;
  export let label: string;
  export let items: TimelineItem[] = [];

  let nodes: HTMLElement[] = [];
  let activeIndex = 0;
  /**
   * Dimming is gated on this so the section is fully legible before hydration
   * and with JavaScript off — otherwise every entry but one would be stuck at
   * reduced opacity.
   */
  let mounted = false;

  onMount(() => {
    // A persistent observer, unlike the layout's one-shot `.reveal` one: the
    // thin band around the viewport's middle means exactly one entry is "in
    // focus" at any scroll position.
    const obs = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          const i = nodes.indexOf(entry.target as HTMLElement);
          if (i !== -1) activeIndex = i;
        }
      },
      { rootMargin: '-45% 0px -45% 0px', threshold: 0 }
    );

    nodes.forEach((node) => node && obs.observe(node));
    mounted = true;
    return () => obs.disconnect();
  });

  $: progress = items.length ? ((activeIndex + 1) / items.length) * 100 : 0;
</script>

<section class="section" {id}>
  <div class="section-inner">
    <div class="section-label reveal">{label}</div>

    <div class="tl" class:is-live={mounted}>
      <div class="tl-rail" aria-hidden="true">
        <div class="tl-track">
          <div class="tl-progress" style="height: {progress}%"></div>
        </div>
        <ol class="tl-years">
          {#each items as item, i}
            <li class="tl-year" class:active={i === activeIndex}>{item.period}</li>
          {/each}
        </ol>
      </div>

      <div class="tl-entries">
        {#each items as item, i (item.id)}
          <article
            class="tl-entry"
            class:active={i === activeIndex}
            bind:this={nodes[i]}
          >
            <div class="tl-dot" aria-hidden="true"></div>
            <div class="tl-period">{item.period}</div>
            <h3 class="tl-title">{item.title}</h3>
            <div class="tl-org">{item.org}</div>
            <p class="tl-body">{item.body}</p>

            {#if item.metrics?.length}
              <div class="tl-metrics">
                {#each item.metrics as metric}
                  <div class="tl-metric">
                    <span class="tl-metric-value">{metric.value}</span>
                    <span class="tl-metric-label">{metric.label}</span>
                  </div>
                {/each}
              </div>
            {/if}

            <!-- Reserved for per-entry graphics; renders nothing until then. -->
            <slot name="figure" {item} />
          </article>
        {/each}
      </div>
    </div>
  </div>
</section>

<style>
  .tl {
    display: grid;
    grid-template-columns: 180px 1fr;
    gap: 48px;
    align-items: start;
  }

  /* Rail ------------------------------------------------------------ */
  .tl-rail {
    position: sticky;
    top: 100px; /* clears the 60px fixed nav */
    display: grid;
    grid-template-columns: 1px 1fr;
    gap: 20px;
    padding: 4px 0;
  }
  .tl-track {
    position: relative;
    width: 1px;
    background: var(--border);
    justify-self: start;
    height: 100%;
  }
  .tl-progress {
    position: absolute;
    top: 0; left: 0;
    width: 1px;
    background: var(--accent);
    transition: height .5s ease;
  }
  .tl-years { list-style: none; display: flex; flex-direction: column; gap: 14px; }
  .tl-year {
    font-family: 'DM Mono', monospace;
    font-size: 11px;
    letter-spacing: .05em;
    color: var(--fg-faint);
    transition: color .4s ease;
  }
  .tl-year.active { color: var(--fg); }

  /* Entries --------------------------------------------------------- */
  .tl-entries { display: flex; flex-direction: column; }
  .tl-entry {
    position: relative;
    padding: 40px 0;
    border-bottom: 1px solid var(--border);
  }
  .tl-entry:first-child { padding-top: 0; }
  .tl-entry:last-child { border-bottom: none; }
  .tl-dot { display: none; }

  .tl-period {
    display: none; /* the rail carries it on desktop */
    font-family: 'DM Mono', monospace;
    font-size: 11px;
    color: var(--fg-faint);
    letter-spacing: .05em;
    margin-bottom: 10px;
  }
  .tl-title {
    font-family: 'Cormorant Garamond', serif;
    font-size: 26px;
    font-weight: 600;
    color: var(--fg);
    line-height: 1.25;
  }
  .tl-org {
    font-family: 'DM Mono', monospace;
    font-size: 11px;
    letter-spacing: .1em;
    text-transform: uppercase;
    color: var(--accent);
    margin: 8px 0 16px;
  }
  .tl-body {
    font-size: 15px;
    color: var(--fg-muted);
    line-height: 1.9;
    max-width: 60ch;
  }

  .tl-metrics { display: flex; flex-wrap: wrap; gap: 10px; margin-top: 24px; }
  .tl-metric {
    display: flex;
    align-items: baseline;
    gap: 7px;
    padding: 7px 14px;
    border: 1px solid var(--border);
    background: var(--surface);
    border-radius: 2px;
    transition: border-color .4s ease;
  }
  .tl-metric-value {
    font-family: 'DM Mono', monospace;
    font-size: 15px;
    font-weight: 500;
    color: var(--fg);
  }
  .tl-metric-label {
    font-family: 'DM Mono', monospace;
    font-size: 10px;
    letter-spacing: .1em;
    text-transform: uppercase;
    color: var(--fg-faint);
  }

  /* Scroll focus. Only applies once mounted, so no-JS renders full opacity. */
  .tl.is-live .tl-entry {
    opacity: .35;
    transition: opacity .4s ease;
  }
  .tl.is-live .tl-entry.active { opacity: 1; }
  .tl.is-live .tl-entry.active .tl-metric { border-color: var(--accent-soft); }

  @media (max-width: 768px) {
    .tl { grid-template-columns: 1fr; gap: 0; }
    .tl-rail { display: none; }
    .tl-period { display: block; }
    .tl-entries { padding-left: 24px; border-left: 1px solid var(--border); }
    .tl-entry { padding: 32px 0; }
    .tl-entry:first-child { padding-top: 8px; }
    .tl-dot {
      display: block;
      position: absolute;
      left: -28px;
      top: 38px;
      width: 7px; height: 7px;
      border-radius: 50%;
      border: 1px solid var(--accent);
      background: var(--bg);
    }
    .tl-entry:first-child .tl-dot { top: 14px; }
    .tl-title { font-size: 22px; }
    /* A short viewport makes the centre band feel jumpy — keep it all readable. */
    .tl.is-live .tl-entry { opacity: 1; }
  }

  @media (prefers-reduced-motion: reduce) {
    .tl.is-live .tl-entry { opacity: 1; }
    .tl-progress, .tl-year, .tl-metric { transition: none; }
  }
</style>
