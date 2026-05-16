<section class="section" id="about">
  <div class="section-inner">
    <div class="section-label reveal">About Me</div>
    <div class="about-grid">

      <div class="reveal">
        <div class="about-photo">
          <div class="about-photo-corner tl"></div>
          <div class="about-photo-corner br"></div>
          <span class="about-photo-label">your photo</span>
        </div>
        <div class="about-origin">Romania × Serbia</div>
      </div>

      <div class="about-text reveal">
        <p>I've been building software since 2008, across industries that have nothing obvious
        in common — <strong>printing, microcontrollers, automotive, travel</strong>. The thread
        is curiosity. I get drawn into problems, pull them apart, and reassemble them differently.</p>

        <p>I grew up between Romania and Serbia, shaped by both and fully claimed by neither.
        That in-between feeling never really left. I think it's why I'm more comfortable with
        <em>"it depends"</em> than most engineers.</p>

        <p>In 2018 I landed on the Côte d'Azur and haven't left. I've since become an amateur
        gardener — it balances the day job in ways I didn't expect. Turns out tending to things
        that grow slowly is good for an engineer's soul.</p>

        <p>I like to spin plans and designs in my head — sometimes it's enough to keep me
        entertained for hours. Beats doom scrolling. Which I do. Once every three months.
        For about 90 minutes.</p>

        <div class="currently-box">
          <div class="cl">Currently</div>
          <p>🍼 Emma, born 29.03.2026. I am still baffled how a 3kg person has managed to
          rewire every part of how I think and feel.</p>
        </div>

        <div class="timeline">
          <div class="tl-item">
            <span class="tl-year">2008—</span>
            <span class="tl-text"><strong>Printing industry</strong> — first steps in software</span>
          </div>
          <div class="tl-item">
            <span class="tl-year">—</span>
            <span class="tl-text"><strong>Microcontrollers &amp; embedded systems</strong></span>
          </div>
          <div class="tl-item">
            <span class="tl-year">—</span>
            <span class="tl-text"><strong>Automotive</strong> — scale and complexity</span>
          </div>
          <div class="tl-item">
            <span class="tl-year">Now</span>
            <span class="tl-text"><strong>Travel tech</strong> — where I currently build</span>
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
