<section class="section" id="work" style="background: #fff">
  <div class="section-inner">
    <div class="section-label reveal">Selected Work</div>
    <div class="projects-grid">

      <div class="project-card reveal">
        <div class="project-thumb a">
          <span class="project-thumb-label">Project 01</span>
        </div>
        <div class="project-body">
          <h3>Keeping Emma safe.</h3>
          <p>Learning on the job.</p>
          <span class="project-link">View project →</span>
        </div>
      </div>

      <div class="project-card reveal">
        <div class="project-thumb b">
          <span class="project-thumb-label">Project 02</span>
        </div>
        <div class="project-body">
          <h3>Keeping tomatoes alive.</h3>
          <p>I wish permaculture was easier.</p>
          <span class="project-link">View project →</span>
        </div>
      </div>

      <div class="project-card wip reveal">
        <div style="font-size: 28px">🚧</div>
        <p>Building a BeReal clone scoped to a <s>specific</s> secret use case.</p>
      </div>

    </div>
  </div>
</section>

<style>
  .projects-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 24px;
  }
  .project-card {
    border: 1px solid var(--border);
    border-radius: 4px;
    overflow: hidden;
    background: #fff;
    transition: transform .3s ease, box-shadow .3s ease;
    cursor: pointer;
  }
  .project-card:hover {
    transform: translateY(-4px);
    box-shadow: 0 16px 48px rgba(0, 0, 0, .07);
  }
  .project-card.wip {
    border-style: dashed;
    background: transparent;
    display: flex;
    align-items: center;
    justify-content: center;
    min-height: 200px;
    flex-direction: column;
    gap: 12px;
    grid-column: span 2;
  }
  .project-card.wip p {
    font-family: 'DM Mono', monospace;
    font-size: 12px;
    letter-spacing: .1em;
    color: var(--ink-faint);
  }
  .project-thumb {
    height: 150px;
    position: relative;
  }
  .project-thumb.a { background: linear-gradient(135deg, #2d2926, #4a3f35); }
  .project-thumb.b { background: linear-gradient(135deg, #1c2b3a, #2e4a61); }
  .project-thumb-label {
    position: absolute;
    bottom: 14px; left: 18px;
    font-family: 'DM Mono', monospace;
    font-size: 10px;
    letter-spacing: 2px;
    color: rgba(255, 255, 255, .4);
    text-transform: uppercase;
  }
  .project-body { padding: 22px; }
  .project-body h3 {
    font-family: 'Cormorant Garamond', serif;
    font-size: 22px;
    font-weight: 600;
    color: var(--ink);
    margin-bottom: 8px;
  }
  .project-body p {
    font-size: 13px;
    color: var(--ink-light);
    line-height: 1.7;
    margin-bottom: 14px;
  }
  .project-link {
    font-family: 'DM Mono', monospace;
    font-size: 11px;
    color: var(--accent);
    text-decoration: none;
    letter-spacing: .05em;
    transition: letter-spacing .2s;
  }
  .project-link:hover { letter-spacing: .1em; }

  @media (max-width: 768px) {
    .projects-grid { grid-template-columns: 1fr; }
    .project-card.wip { grid-column: span 1; }
  }
</style>
