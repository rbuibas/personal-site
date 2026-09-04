<script lang="ts">
  export let id: string;
  export let label: string;
  export let email: string;
  export let profiles: Array<{ label: string; href: string }> = [];
</script>

<section class="section" {id}>
  <div class="section-inner">
    <div class="section-label reveal">{label}</div>

    <div class="ct reveal">
      <h2 class="ct-heading">Get in touch.</h2>
      <a class="ct-email" href="mailto:{email}">{email}</a>
      <div class="ct-profiles">
        {#each profiles as profile}
          <a
            class="ct-pill"
            href={profile.href}
            target="_blank"
            rel="noopener noreferrer"
          >{profile.label} ↗</a>
        {/each}
      </div>
    </div>
  </div>
</section>

<style>
  .ct-heading {
    font-family: 'Cormorant Garamond', serif;
    font-size: 40px;
    font-weight: 600;
    font-style: italic;
    color: var(--fg);
    line-height: 1.15;
    margin-bottom: 24px;
  }
  .ct-email {
    display: inline-block;
    font-family: 'DM Mono', monospace;
    font-size: 14px;
    color: var(--accent);
    text-decoration: none;
    letter-spacing: .05em;
    border-bottom: 1px solid var(--accent);
    padding-bottom: 3px;
    transition: opacity .2s;
  }
  .ct-email:hover { opacity: .7; }

  .ct-profiles { display: flex; flex-wrap: wrap; gap: 10px; margin-top: 28px; }
  .ct-pill {
    font-family: 'DM Mono', monospace;
    font-size: 11px;
    color: var(--fg-muted);
    border: 1px solid var(--border);
    padding: 7px 15px;
    border-radius: 2px;
    text-decoration: none;
    letter-spacing: .05em;
    transition: background .2s, color .2s, border-color .2s;
  }
  .ct-pill:hover {
    background: var(--fg);
    color: var(--bg);
    border-color: var(--fg);
  }

  @media (max-width: 768px) {
    .ct-heading { font-size: 32px; }
  }
</style>
