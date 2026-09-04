<script lang="ts">
  import {
    turningPoints,
    turningPointsIntro,
    turningPointsCoda,
  } from '$lib/data/professional';
</script>

<!--
  A full-bleed dark band rather than a page-wide theme: the nav, the switcher
  and everything below the story stay light, so the change of register costs
  one seam instead of two.
-->
<section class="tp" id="turning-points">
  <div class="tp-head reveal">
    <div class="tp-eyebrow">Six decisions · not a timeline</div>
    <h2 class="tp-lede">{turningPointsIntro}</h2>
  </div>

  {#each turningPoints as point (point.id)}
    <article class="tp-point reveal">
      <div class="tp-index" aria-hidden="true">{point.index}</div>
      <div class="tp-content">
        <div class="tp-heading">
          <div class="tp-when">{point.when}</div>
          <h3 class="tp-title">{point.title}</h3>
        </div>
        <div class="tp-columns">
          <div class="tp-column">
            <div class="tp-column-label">What happened</div>
            <p class="tp-text">{point.happened}</p>
          </div>
          <div class="tp-column">
            <div class="tp-column-label">What it changed</div>
            <p class="tp-text">{point.changed}</p>
          </div>
        </div>
      </div>
    </article>
  {/each}

  <div class="tp-coda reveal">
    <div class="tp-coda-eyebrow">{turningPointsCoda.eyebrow}</div>
    <div class="tp-coda-body">
      <h3 class="tp-title">{turningPointsCoda.title}</h3>
      {#each turningPointsCoda.paragraphs as paragraph}
        <p class="tp-text tp-coda-text">{paragraph}</p>
      {/each}
    </div>
  </div>
</section>

<style>
  .tp {
    background: var(--tp-bg);
    color: var(--bg);
  }

  .tp-head {
    padding: 76px 48px 56px;
    display: flex;
    flex-direction: column;
    gap: 22px;
    align-items: flex-start;
    border-bottom: 1px solid var(--tp-line);
  }
  .tp-eyebrow {
    font-family: 'DM Mono', monospace;
    font-size: 11px;
    letter-spacing: 3px;
    text-transform: uppercase;
    color: var(--tp-accent);
  }
  .tp-lede {
    font-family: 'Cormorant Garamond', serif;
    font-size: clamp(34px, 4vw, 56px);
    font-weight: 600;
    line-height: 1.08;
    letter-spacing: -.02em;
    color: #ffffff;
    max-width: 800px;
    text-wrap: pretty;
  }

  .tp-point {
    padding: 64px 48px;
    border-bottom: 1px solid var(--tp-line);
    display: grid;
    grid-template-columns: 132px 1fr;
    gap: 56px;
    align-items: start;
  }
  .tp-index {
    font-family: 'DM Mono', monospace;
    font-size: 56px;
    line-height: 1;
    color: var(--tp-numeral);
  }
  .tp-content { display: flex; flex-direction: column; gap: 26px; }
  .tp-heading { display: flex; flex-direction: column; gap: 12px; }
  .tp-when {
    font-family: 'DM Mono', monospace;
    font-size: 11px;
    letter-spacing: .14em;
    text-transform: uppercase;
    color: var(--tp-accent);
  }
  .tp-title {
    font-family: 'Cormorant Garamond', serif;
    font-size: 42px;
    font-weight: 600;
    line-height: 1.15;
    color: #ffffff;
    max-width: 24ch;
  }

  .tp-columns {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 48px;
    max-width: 1020px;
  }
  .tp-column { display: flex; flex-direction: column; gap: 10px; }
  .tp-column-label {
    font-family: 'DM Mono', monospace;
    font-size: 10px;
    letter-spacing: .16em;
    text-transform: uppercase;
    color: var(--tp-faint);
  }
  .tp-text {
    font-size: 16px;
    line-height: 1.9;
    color: var(--tp-fg);
  }

  .tp-coda {
    padding: 72px 48px 88px;
    display: grid;
    grid-template-columns: 132px 1fr;
    gap: 56px;
    align-items: start;
  }
  .tp-coda-eyebrow {
    font-family: 'DM Mono', monospace;
    font-size: 11px;
    letter-spacing: .16em;
    text-transform: uppercase;
    color: var(--tp-faint);
    padding-top: 12px;
  }
  .tp-coda-body {
    display: flex;
    flex-direction: column;
    gap: 20px;
    max-width: 68ch;
    border-left: 2px solid var(--tp-accent);
    padding-left: 32px;
  }
  .tp-coda-text { font-size: 16.5px; }

  @media (max-width: 900px) {
    .tp-head { padding: 56px 24px 40px; }
    .tp-point,
    .tp-coda {
      grid-template-columns: 1fr;
      gap: 20px;
      padding-left: 24px;
      padding-right: 24px;
    }
    .tp-point { padding-top: 44px; padding-bottom: 44px; }
    .tp-coda { padding-top: 52px; padding-bottom: 64px; }
    .tp-index { font-size: 34px; }
    .tp-coda-eyebrow { padding-top: 0; }
    .tp-title { font-size: 30px; max-width: none; }
    .tp-columns { grid-template-columns: 1fr; gap: 28px; }
    .tp-coda-body { padding-left: 20px; }
  }
</style>
