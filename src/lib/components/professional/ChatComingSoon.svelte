<script lang="ts">
  /**
   * The Chat section's placeholder. Writing was removed and Contact is now
   * real, so this is the only section still awaiting its feature — hence a
   * single component rather than the variant-per-section one it replaced.
   */
  export let id: string;
  export let label: string;
  export let caption: string;
  export let blurb: string;
</script>

<section class="section" {id}>
  <div class="section-inner">
    <div class="section-label reveal">{label}</div>

    <div class="cs reveal">
      <div class="cs-art" aria-hidden="true">
        <!-- A console still bringing itself up. -->
        <svg viewBox="0 0 72 72" width="72" height="72">
          <rect x="6" y="14" width="60" height="44" rx="3" />
          <line x1="6" y1="26" x2="66" y2="26" />
          <circle cx="14" cy="20" r="1.6" />
          <circle cx="21" cy="20" r="1.6" />
          <circle cx="28" cy="20" r="1.6" />
          <circle cx="28" cy="42" r="2.6" class="cs-pulse" style="--d: 0s" />
          <circle cx="36" cy="42" r="2.6" class="cs-pulse" style="--d: .22s" />
          <circle cx="44" cy="42" r="2.6" class="cs-pulse" style="--d: .44s" />
        </svg>
      </div>

      <div class="cs-text">
        <div class="cs-caption">{caption}</div>
        <p class="cs-blurb">{blurb}</p>
      </div>
    </div>
  </div>
</section>

<style>
  .cs {
    display: flex;
    align-items: center;
    gap: 40px;
    padding: 48px;
    border: 1px dashed var(--border);
    border-radius: 3px;
    background: var(--surface);
  }
  .cs-art {
    flex-shrink: 0;
    color: var(--fg-faint);
    line-height: 0;
  }
  .cs-art :global(svg) {
    fill: none;
    stroke: currentColor;
    stroke-width: 1;
    stroke-linecap: round;
    stroke-linejoin: round;
  }
  .cs-art :global(circle) { fill: currentColor; stroke: none; }
  .cs-art :global(.cs-pulse) {
    fill: var(--accent);
    animation: blink 1.4s ease-in-out infinite;
    animation-delay: var(--d);
  }

  .cs-caption {
    font-family: 'DM Mono', monospace;
    font-size: 10px;
    letter-spacing: 3px;
    text-transform: uppercase;
    color: var(--accent);
    margin-bottom: 12px;
  }
  .cs-blurb {
    font-size: 15px;
    color: var(--fg-muted);
    line-height: 1.9;
    max-width: 52ch;
  }

  @media (max-width: 768px) {
    .cs { flex-direction: column; align-items: flex-start; gap: 28px; padding: 32px 24px; }
  }

  @media (prefers-reduced-motion: reduce) {
    .cs-art :global(.cs-pulse) { animation: none; }
  }
</style>
