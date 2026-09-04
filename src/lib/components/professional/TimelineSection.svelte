<script lang="ts">
  import { onMount } from 'svelte';
  import {
    formatPeriod,
    startYear,
    type TimelineEra,
    type TimelineNode,
  } from '$lib/data/professional';

  export let id: string;
  export let label: string;
  export let eras: TimelineEra[] = [];
  /** Education is a single era and says so in its heading — no divider needed. */
  export let showEras = true;
  /** Optional lead paragraph between the section label and the first entry. */
  export let intro = '';

  /**
   * Top-level entries flattened across eras, in render order. Both the rail and
   * the scroll tracking index into this; sub-nodes are not separately tracked,
   * so they take their parent's focus state.
   */
  $: flat = eras.flatMap((era) => era.items.map((node) => ({ node, era })));

  /** Flat index of each era's first entry, so the nested loops can address `nodes`. */
  $: eraOffsets = eras.reduce<number[]>((acc, _era, i) => {
    acc.push(i === 0 ? 0 : acc[i - 1] + eras[i - 1].items.length);
    return acc;
  }, []);

  let nodes: HTMLElement[] = [];
  let activeIndex = 0;
  /**
   * Dimming is gated on this so the section is fully legible before hydration
   * and with JavaScript off — otherwise every entry but one would be stuck at
   * reduced opacity.
   */
  let mounted = false;

  onMount(() => {
    // Measuring distance from the viewport's centre, rather than watching a thin
    // IntersectionObserver band: the nav jumps straight to #career, and on a jump
    // an observer reports several entries in one batch with no ordering guarantee.
    // This is deterministic at any scroll position, including the first frame
    // after a jump, and the entry containing the centre scores zero and wins.
    let frame = 0;

    const pick = () => {
      frame = 0;
      const centre = window.innerHeight / 2;
      let best = 0;
      let bestDistance = Infinity;

      nodes.forEach((node, i) => {
        if (!node) return;
        const { top, bottom } = node.getBoundingClientRect();
        const distance =
          top > centre ? top - centre : bottom < centre ? centre - bottom : 0;
        if (distance < bestDistance) {
          bestDistance = distance;
          best = i;
        }
      });

      activeIndex = best;
    };

    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(pick);
    };

    window.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('resize', schedule);
    mounted = true;
    pick();

    return () => {
      window.removeEventListener('scroll', schedule);
      window.removeEventListener('resize', schedule);
      if (frame) cancelAnimationFrame(frame);
    };
  });

  $: progress = flat.length ? ((activeIndex + 1) / flat.length) * 100 : 0;
  $: activeEra = flat[activeIndex]?.era;
</script>

<section class="section" {id}>
  <div class="section-inner">
    <div class="section-label reveal">{label}</div>
    {#if intro}
      <p class="tl-intro reveal">{intro}</p>
    {/if}

    <div class="tl" class:is-live={mounted}>
      <div class="tl-rail" aria-hidden="true">
        {#if showEras && activeEra}
          <div class="tl-rail-era">{activeEra.name}</div>
        {/if}
        <div class="tl-rail-axis">
          <div class="tl-track">
            <div class="tl-progress" style="height: {progress}%"></div>
          </div>
          <ol class="tl-years">
            {#each flat as entry, i (entry.node.id)}
              <li class="tl-year" class:active={i === activeIndex}>
                {startYear(entry.node.start)}
              </li>
            {/each}
          </ol>
        </div>
      </div>

      <div class="tl-entries">
        {#each eras as era, eraIdx (era.id)}
          {#if showEras}
            <div class="tl-era reveal">
              <div class="tl-era-span">{era.span}</div>
              <div class="tl-era-name">{era.name}</div>
              {#if era.note}
                <p class="tl-era-note">{era.note}</p>
              {/if}
            </div>
          {/if}

          {#each era.items as node, itemIdx (node.id)}
            {@const i = eraOffsets[eraIdx] + itemIdx}
            <article
              class="tl-entry"
              class:active={i === activeIndex}
              bind:this={nodes[i]}
            >
              <div class="tl-dot" aria-hidden="true"></div>
              <div class="tl-period">{formatPeriod(node.start, node.end)}</div>
              {#if node.title}
                <h3 class="tl-title">{node.title}</h3>
              {/if}
              <div class="tl-org">{node.organisation} · {node.location}</div>
              {#if node.subtitle}
                <div class="tl-subtitle">{node.subtitle}</div>
              {/if}
              {#if node.brief}
                <p class="tl-brief">{node.brief}</p>
              {/if}

              {#if node.highlights?.length}
                <ul class="tl-highlights">
                  {#each node.highlights as highlight}
                    <li>{highlight}</li>
                  {/each}
                </ul>
              {/if}

              {#if node.tags?.length}
                <div class="tl-tags">
                  {#each node.tags as tag}
                    <span class="tl-tag">{tag}</span>
                  {/each}
                </div>
              {/if}

              {#if node.children?.length}
                <div class="tl-children">
                  {#each node.children as child (child.id)}
                    <div class="tl-child">
                      {#if child.start || node.childKind === 'concurrent'}
                        <div class="tl-child-head">
                          {#if child.start}
                            <span class="tl-child-period">
                              {formatPeriod(child.start, child.end)}
                            </span>
                          {/if}
                          {#if node.childKind === 'concurrent'}
                            <span class="tl-child-mark">concurrent</span>
                          {/if}
                        </div>
                      {/if}
                      {#if child.title}
                        <h4 class="tl-child-title">{child.title}</h4>
                      {/if}
                      {#if child.subtitle}
                        <div class="tl-child-subtitle">{child.subtitle}</div>
                      {/if}
                      {#if child.brief}
                        <p class="tl-child-brief">{child.brief}</p>
                      {/if}
                      {#if child.highlights?.length}
                        <ul class="tl-highlights tl-child-highlights">
                          {#each child.highlights as highlight}
                            <li>{highlight}</li>
                          {/each}
                        </ul>
                      {/if}
                      {#if child.tags?.length}
                        <div class="tl-tags">
                          {#each child.tags as tag}
                            <span class="tl-tag">{tag}</span>
                          {/each}
                        </div>
                      {/if}
                    </div>
                  {/each}
                </div>
              {/if}

              <!-- Reserved for per-entry graphics; renders nothing until then. -->
              <slot name="figure" {node} />
            </article>
          {/each}
        {/each}
      </div>
    </div>
  </div>
</section>

<style>
  .tl-intro {
    font-size: 15px;
    color: var(--fg-muted);
    line-height: 1.9;
    max-width: 62ch;
    margin-bottom: 56px;
  }

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
    padding: 4px 0;
  }
  .tl-rail-era {
    font-family: 'DM Mono', monospace;
    font-size: 10px;
    letter-spacing: 2px;
    text-transform: uppercase;
    color: var(--accent);
    line-height: 1.5;
    margin-bottom: 16px;
  }
  .tl-rail-axis {
    display: grid;
    grid-template-columns: 1px 1fr;
    gap: 20px;
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

  /* Era dividers ---------------------------------------------------- */
  .tl-era { padding: 56px 0 8px; }
  .tl-era:first-child { padding-top: 0; }
  .tl-era-span {
    font-family: 'DM Mono', monospace;
    font-size: 10px;
    letter-spacing: 3px;
    text-transform: uppercase;
    color: var(--accent);
    margin-bottom: 10px;
  }
  .tl-era-name {
    font-family: 'Cormorant Garamond', serif;
    font-size: 30px;
    font-weight: 600;
    color: var(--fg);
    line-height: 1.15;
  }
  .tl-era-note {
    font-size: 14px;
    font-style: italic;
    color: var(--fg-muted);
    line-height: 1.8;
    margin-top: 10px;
    max-width: 54ch;
  }

  /* Entries --------------------------------------------------------- */
  .tl-entries { display: flex; flex-direction: column; }
  .tl-entry {
    position: relative;
    padding: 40px 0;
    border-bottom: 1px solid var(--border);
  }
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
    margin-top: 8px;
  }
  .tl-subtitle {
    font-size: 13px;
    color: var(--fg-faint);
    margin-top: 6px;
  }
  .tl-brief {
    font-size: 15px;
    color: var(--fg-muted);
    line-height: 1.9;
    max-width: 60ch;
    margin-top: 16px;
  }

  .tl-highlights {
    list-style: none;
    display: flex;
    flex-direction: column;
    gap: 6px;
    margin-top: 18px;
  }
  .tl-highlights li {
    position: relative;
    padding-left: 18px;
    font-size: 13.5px;
    color: var(--fg-muted);
    line-height: 1.7;
  }
  .tl-highlights li::before {
    content: '·';
    position: absolute;
    left: 5px;
    color: var(--accent);
    font-family: 'DM Mono', monospace;
  }

  /* Matches the `.tag` spec in Hero.svelte; declared locally rather than
     promoted to app.css, so the personal side is left untouched. */
  .tl-tags { display: flex; flex-wrap: wrap; gap: 8px; margin-top: 20px; }
  .tl-tag {
    font-family: 'DM Mono', monospace;
    font-size: 10px;
    padding: 4px 10px;
    border: 1px solid var(--border);
    border-radius: 2px;
    color: var(--fg-faint);
    letter-spacing: .05em;
    transition: border-color .4s ease, color .4s ease;
  }

  /* Sub-nodes: concurrent roles, or projects inside a role ----------- */
  .tl-children {
    margin-top: 32px;
    padding-left: 22px;
    border-left: 1px solid var(--border);
    display: flex;
    flex-direction: column;
    gap: 32px;
  }
  .tl-child-head {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    gap: 10px;
    margin-bottom: 8px;
  }
  .tl-child-period {
    font-family: 'DM Mono', monospace;
    font-size: 10px;
    letter-spacing: .08em;
    color: var(--fg-faint);
  }
  .tl-child-mark {
    font-family: 'DM Mono', monospace;
    font-size: 9px;
    letter-spacing: .12em;
    text-transform: uppercase;
    color: var(--accent);
    border: 1px solid var(--border);
    border-radius: 2px;
    padding: 2px 7px;
  }
  .tl-child-title {
    font-family: 'Cormorant Garamond', serif;
    font-size: 19px;
    font-weight: 600;
    color: var(--fg);
    line-height: 1.3;
  }
  .tl-child-subtitle {
    font-size: 12px;
    color: var(--fg-faint);
    margin-top: 4px;
  }
  .tl-child-brief {
    font-size: 14px;
    color: var(--fg-muted);
    line-height: 1.8;
    max-width: 58ch;
    margin-top: 10px;
  }
  .tl-child-highlights { margin-top: 14px; }
  .tl-child-highlights li { font-size: 12.5px; }

  /* Scroll focus. Only applies once mounted, so no-JS renders full opacity. */
  .tl.is-live .tl-entry {
    opacity: .35;
    transition: opacity .4s ease;
  }
  .tl.is-live .tl-entry.active { opacity: 1; }
  .tl.is-live .tl-entry.active .tl-tag {
    border-color: var(--accent-soft);
    color: var(--fg-muted);
  }

  @media (max-width: 768px) {
    .tl { grid-template-columns: 1fr; gap: 0; }
    .tl-rail { display: none; }
    .tl-period { display: block; }
    .tl-entries { padding-left: 24px; border-left: 1px solid var(--border); }
    .tl-entry { padding: 32px 0; }
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
    .tl-title { font-size: 22px; }
    .tl-era { padding-top: 44px; }
    .tl-era-name { font-size: 25px; }
    .tl-children { padding-left: 16px; }
    /* A short viewport makes the centre band feel jumpy — keep it all readable. */
    .tl.is-live .tl-entry { opacity: 1; }
  }

  @media (prefers-reduced-motion: reduce) {
    .tl.is-live .tl-entry { opacity: 1; }
    .tl-progress, .tl-year, .tl-tag { transition: none; }
  }
</style>
