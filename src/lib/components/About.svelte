<section class="section" id="about">
  <div class="section-inner">
    <div class="section-label reveal">About Me</div>
    <div class="about-grid">

      <div class="reveal">
        <div class="about-photo">
          <div class="about-photo-corner tl"></div>
          <div class="about-photo-corner br"></div>
          <span class="about-photo-label">
            <!-- using local photo from static diretory -->
            <img src="/baby-portrait.jpg" alt="Photo of me" style="width: 100%; height: auto; border-radius: 2px;">
          </span>
        </div>
      </div>

      <div class="about-text reveal">
        <p>
          Tearing myself apart between writing this the old fashined way or having the the artificial intelligence help me out. I think I'll need to write this on paper since AI is trying to autocomplete everything I type. It's almost awkward.
          What is the old fashioned way? Staring at a blank page or piece of paper and pretending to have a writer's blockage. I think I'll go for that.
        </p>

        <div class="timeline">
          <div class="tl-item">
            <span class="tl-year">1986</span>
            <span class="tl-text"><strong>Yanked into existence</strong> — left to struggle with consciousness for quite a while.</span>
          </div>
          <div class="tl-item">
            <span class="tl-year">Now</span>
            <span class="tl-text"><strong>Pondering the audacity of creating a life</strong> — and how for granted we take it.</span>
          </div>
        </div>
      </div>

    </div>
  </div>
</section>

<style>
  .about-grid {
    display: grid;
    grid-template-columns: 1fr 1.8fr;
    gap: 64px;
    align-items: start;
  }
  .about-photo {
    width: 100%;
    aspect-ratio: 3/4;
    background: var(--cream-dark);
    border-radius: 2px;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    border: 1px solid var(--border);
  }
  .about-photo-label {
    font-family: 'DM Mono', monospace;
    font-size: 11px;
    color: var(--ink-faint);
    letter-spacing: .1em;
  }
  .about-photo-corner {
    position: absolute;
    width: 20px; height: 20px;
    border-color: var(--accent);
    border-style: solid;
  }
  .about-photo-corner.tl { top: 10px; left: 10px; border-width: 1px 0 0 1px; }
  .about-photo-corner.br { bottom: 10px; right: 10px; border-width: 0 1px 1px 0; }
  .about-origin {
    margin-top: 14px;
    font-family: 'DM Mono', monospace;
    font-size: 10px;
    letter-spacing: 2px;
    color: var(--ink-faint);
    text-transform: uppercase;
    text-align: center;
  }
  .about-text p {
    font-size: 15px;
    color: var(--ink-light);
    line-height: 1.9;
    margin-bottom: 20px;
  }
  .about-text p strong { color: var(--ink); font-weight: 500; }
  .currently-box {
    margin-top: 32px;
    padding: 20px 24px;
    border-left: 2px solid var(--accent);
    background: var(--accent-light);
    border-radius: 0 4px 4px 0;
  }
  .currently-box .cl {
    font-family: 'DM Mono', monospace;
    font-size: 10px;
    letter-spacing: 2px;
    color: var(--accent);
    text-transform: uppercase;
    margin-bottom: 8px;
  }
  .currently-box p { font-size: 14px; color: var(--ink); line-height: 1.7; margin: 0; }
  .timeline { margin-top: 40px; display: flex; flex-direction: column; }
  .tl-item {
    display: flex;
    gap: 20px;
    padding: 14px 0;
    border-bottom: 1px solid var(--border);
  }
  .tl-item:last-child { border-bottom: none; }
  .tl-year {
    font-family: 'DM Mono', monospace;
    font-size: 11px;
    color: var(--ink-faint);
    width: 80px;
    flex-shrink: 0;
    padding-top: 2px;
  }
  .tl-text { font-size: 13px; color: var(--ink-light); }
  .tl-text strong { color: var(--ink); font-weight: 500; }

  @media (max-width: 768px) {
    .about-grid { grid-template-columns: 1fr; gap: 40px; }
    .about-photo { aspect-ratio: 1/1; }
  }
</style>
