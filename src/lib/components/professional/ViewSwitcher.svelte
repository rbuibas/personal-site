<script lang="ts">
  import { storyViews, type StoryViewId } from '$lib/data/professional';

  export let active: StoryViewId;
</script>

<!--
  Real links, not a toggle: each view has its own URL, the server resolves it,
  and all three render without JavaScript. `data-sveltekit-noscroll` keeps the
  switcher in place when you change view, so the page does not jump back to the
  hero on every click.
-->
<nav class="vs" aria-label="Choose how the career is told">
  <div class="vs-inner">
    <div class="vs-label">How would you like it?</div>
    <div class="vs-options">
      {#each storyViews as view (view.id)}
        <a
          class="vs-option"
          class:active={view.id === active}
          class:dark={view.id === 'turning-points'}
          href={view.href}
          data-sveltekit-noscroll
          aria-current={view.id === active ? 'page' : undefined}
        >
          <span class="vs-name">{view.name}</span>
          <span class="vs-blurb">{view.blurb}</span>
        </a>
      {/each}
    </div>
  </div>
</nav>

<style>
  .vs {
    border-top: 1px solid var(--border);
    border-bottom: 1px solid var(--border);
    background: var(--surface);
  }
  .vs-inner {
    padding: 30px 48px;
    display: flex;
    flex-direction: column;
    gap: 20px;
  }
  .vs-label {
    font-family: 'DM Mono', monospace;
    font-size: 10px;
    letter-spacing: .2em;
    text-transform: uppercase;
    color: var(--fg-faint);
  }

  /* The 2px gap over a bordered container draws the cell dividers, so the
     rules stay put when a cell changes background. */
  .vs-options {
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: 2px;
    background: var(--border);
    border: 1px solid var(--border);
  }
  .vs-option {
    display: flex;
    flex-direction: column;
    gap: 5px;
    padding: 18px 22px;
    background: var(--surface);
    border-top: 2px solid transparent;
    text-decoration: none;
    transition: background .2s ease, border-color .2s ease;
  }
  .vs-option:hover { background: var(--bg-alt); }

  .vs-name {
    font-family: 'Cormorant Garamond', serif;
    font-size: 22px;
    font-weight: 600;
    color: var(--fg-muted);
    line-height: 1.2;
    transition: color .2s ease;
  }
  .vs-blurb {
    font-family: 'DM Mono', monospace;
    font-size: 11px;
    letter-spacing: .04em;
    color: var(--fg-faint);
    transition: color .2s ease;
  }

  .vs-option.active {
    background: var(--bg);
    border-top-color: var(--accent);
  }
  .vs-option.active .vs-name { color: var(--fg); }
  .vs-option.active .vs-blurb { color: var(--accent); }

  /* Turning Points is told on a dark band. Its cell adopts that ground when
     selected, so the change of register is legible before you scroll. */
  .vs-option.active.dark {
    background: var(--tp-bg);
    border-top-color: var(--tp-accent);
  }
  .vs-option.active.dark .vs-name { color: #ffffff; }
  .vs-option.active.dark .vs-blurb { color: var(--tp-accent); }
  .vs-option.active.dark:hover { background: var(--tp-bg); }

  @media (max-width: 768px) {
    .vs-inner { padding: 24px; gap: 16px; }
    .vs-options { grid-template-columns: 1fr; gap: 1px; }
    .vs-option {
      padding: 14px 16px;
      border-top: none;
      border-left: 2px solid transparent;
    }
    .vs-option.active { border-left-color: var(--accent); }
    .vs-option.active.dark { border-left-color: var(--tp-accent); }
    .vs-name { font-size: 20px; }
    .vs-blurb { font-size: 10.5px; }
  }

  @media (prefers-reduced-motion: reduce) {
    .vs-option, .vs-name, .vs-blurb { transition: none; }
  }
</style>
