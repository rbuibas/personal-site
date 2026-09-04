<script lang="ts">
  import { careerStory, storyIntro } from '$lib/data/professional';
</script>

<section class="section section--surface" id="career-story">
  <div class="cs-inner">
    <p class="cs-intro reveal">{storyIntro}</p>

    <div class="cs-chapters">
      {#each careerStory as chapter (chapter.id)}
        <article class="cs-chapter reveal">
          <div class="cs-margin">
            <span class="cs-period">{chapter.period}</span>
            {#each chapter.meta as line}
              <span class="cs-meta">{line}</span>
            {/each}
            {#if chapter.accent}
              <span class="cs-role">{chapter.accent}</span>
            {/if}
          </div>

          <div class="cs-body">
            <h2 class="cs-title">{chapter.title}</h2>
            {#each chapter.paragraphs as paragraph}
              <p class="cs-para">{paragraph}</p>
            {/each}
            {#if chapter.pull}
              <blockquote class="cs-pull">{chapter.pull}</blockquote>
            {/if}
          </div>
        </article>
      {/each}
    </div>
  </div>
</section>

<style>
  /* Wider than the shared .section-inner: the margin column is an extra
     176px of furniture, and the prose still wants its own ~66ch. */
  .cs-inner {
    max-width: 1080px;
    margin: 0 auto;
  }
  .cs-intro {
    font-size: 16px;
    color: var(--fg-muted);
    line-height: 1.9;
    max-width: 58ch;
    margin-bottom: 64px;
  }

  .cs-chapters { display: flex; flex-direction: column; }

  .cs-chapter {
    display: grid;
    grid-template-columns: 176px 1fr;
    gap: 64px;
    align-items: start;
    padding: 40px 0 56px;
    border-top: 1px solid var(--border);
  }
  .cs-chapter:first-child { border-top: none; padding-top: 0; }

  .cs-margin {
    display: flex;
    flex-direction: column;
    gap: 6px;
    font-family: 'DM Mono', monospace;
    font-size: 11px;
    letter-spacing: .06em;
    position: sticky;
    top: 100px; /* clears the 60px fixed nav */
  }
  .cs-period { color: var(--fg); }
  .cs-meta { color: var(--fg-faint); }
  .cs-role { color: var(--accent); }

  .cs-body {
    display: flex;
    flex-direction: column;
    gap: 20px;
    max-width: 66ch;
  }
  .cs-title {
    font-family: 'Cormorant Garamond', serif;
    font-size: 36px;
    font-weight: 600;
    line-height: 1.2;
    color: var(--fg);
  }
  .cs-para {
    font-size: 17px;
    line-height: 1.95;
    color: var(--fg);
  }
  .cs-pull {
    margin: 8px 0;
    padding-left: 28px;
    border-left: 2px solid var(--accent);
    font-family: 'Cormorant Garamond', serif;
    font-style: italic;
    font-size: 27px;
    line-height: 1.45;
    color: var(--fg);
  }

  @media (max-width: 900px) {
    .cs-chapter { grid-template-columns: 1fr; gap: 16px; }
    .cs-margin {
      position: static;
      flex-direction: row;
      flex-wrap: wrap;
      gap: 4px 14px;
    }
    /* Inline in a row, the margin lines need a separator to stay readable. */
    .cs-meta::before,
    .cs-role::before {
      content: '·';
      color: var(--fg-faint);
      margin-right: 14px;
    }
    .cs-title { font-size: 29px; }
    .cs-para { font-size: 16px; }
    .cs-pull { font-size: 22px; padding-left: 20px; }
  }
</style>
