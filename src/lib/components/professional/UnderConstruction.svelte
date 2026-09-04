<script lang="ts">
  export let id: string;
  export let label: string;
  export let variant: 'writing' | 'chat' | 'contact';

  const CAPTIONS = {
    writing: 'draft in progress',
    chat: 'assistant booting',
    contact: 'channels opening soon',
  } as const;

  const BLURBS = {
    writing: 'Lorem ipsum dolor sit amet — professional writing lands here.',
    chat: 'Consectetur adipiscing elit — an assistant for professional questions.',
    contact: 'Sed do eiusmod tempor — ways to get in touch, coming shortly.',
  } as const;
</script>

<section class="section" {id}>
  <div class="section-inner">
    <div class="section-label reveal">{label}</div>

    <div class="uc reveal">
      <div class="uc-art" aria-hidden="true">
        {#if variant === 'writing'}
          <!-- Stacked drafts, top one still being typed. -->
          <svg viewBox="0 0 72 72" width="72" height="72">
            <rect x="14" y="6" width="40" height="52" rx="2" />
            <rect x="10" y="10" width="40" height="52" rx="2" />
            <rect x="6" y="14" width="40" height="52" rx="2" class="uc-front" />
            <line x1="13" y1="26" x2="39" y2="26" />
            <line x1="13" y1="34" x2="39" y2="34" />
            <line x1="13" y1="42" x2="30" y2="42" />
            <line x1="13" y1="50" x2="24" y2="50" class="uc-caret" />
          </svg>
        {:else if variant === 'chat'}
          <!-- A console still bringing itself up. -->
          <svg viewBox="0 0 72 72" width="72" height="72">
            <rect x="6" y="14" width="60" height="44" rx="3" />
            <line x1="6" y1="26" x2="66" y2="26" />
            <circle cx="14" cy="20" r="1.6" />
            <circle cx="21" cy="20" r="1.6" />
            <circle cx="28" cy="20" r="1.6" />
            <circle cx="28" cy="42" r="2.6" class="uc-pulse" style="--d: 0s" />
            <circle cx="36" cy="42" r="2.6" class="uc-pulse" style="--d: .22s" />
            <circle cx="44" cy="42" r="2.6" class="uc-pulse" style="--d: .44s" />
          </svg>
        {:else}
          <!-- An envelope not yet sealed. -->
          <svg viewBox="0 0 72 72" width="72" height="72">
            <rect x="6" y="18" width="60" height="38" rx="2" />
            <path d="M6 20 L36 42 L66 20" stroke-dasharray="4 3" />
            <text x="36" y="62" class="uc-at">@</text>
          </svg>
        {/if}
      </div>

      <div class="uc-text">
        <div class="uc-caption">{CAPTIONS[variant]}</div>
        <p class="uc-blurb">{BLURBS[variant]}</p>
      </div>
    </div>
  </div>
</section>

<style>
  .uc {
    display: flex;
    align-items: center;
    gap: 40px;
    padding: 48px;
    border: 1px dashed var(--border);
    border-radius: 3px;
    background: var(--surface);
  }
  .uc-art {
    flex-shrink: 0;
    color: var(--fg-faint);
    line-height: 0;
  }
  .uc-art :global(svg) {
    fill: none;
    stroke: currentColor;
    stroke-width: 1;
    stroke-linecap: round;
    stroke-linejoin: round;
  }
  .uc-art :global(.uc-front) { stroke: var(--accent); }
  .uc-art :global(circle) { fill: currentColor; stroke: none; }
  .uc-art :global(.uc-at) {
    font-family: 'DM Mono', monospace;
    font-size: 11px;
    fill: var(--fg-faint);
    stroke: none;
    text-anchor: middle;
  }
  .uc-art :global(.uc-caret) {
    stroke: var(--accent);
    animation: blink 1.1s steps(1) infinite;
  }
  .uc-art :global(.uc-pulse) {
    fill: var(--accent);
    animation: blink 1.4s ease-in-out infinite;
    animation-delay: var(--d);
  }

  .uc-caption {
    font-family: 'DM Mono', monospace;
    font-size: 10px;
    letter-spacing: 3px;
    text-transform: uppercase;
    color: var(--accent);
    margin-bottom: 12px;
  }
  .uc-blurb {
    font-size: 15px;
    color: var(--fg-muted);
    line-height: 1.9;
    max-width: 46ch;
  }

  @media (max-width: 768px) {
    .uc { flex-direction: column; align-items: flex-start; gap: 28px; padding: 32px 24px; }
  }

  @media (prefers-reduced-motion: reduce) {
    .uc-art :global(.uc-caret),
    .uc-art :global(.uc-pulse) { animation: none; }
  }
</style>
