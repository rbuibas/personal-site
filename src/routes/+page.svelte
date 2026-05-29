<script lang="ts">
  import Hero from '$lib/components/Hero.svelte';
  import Work from '$lib/components/Work.svelte';
  import About from '$lib/components/About.svelte';
  import Writing from '$lib/components/Writing.svelte';
  import IrcChat from '$lib/components/IrcChat.svelte';

  export let data;
</script>

<svelte:head>
  <title>Raul Buibas — Engineer, Explorer, Enthusiast</title>
  <meta name="description" content="Engineer by calling. Architect in my head. Building things, thinking a lot, rebuilding things." />
</svelte:head>

<Hero />
<Work />
<About />
<Writing posts={data.posts} />
<IrcChat />

<footer class="footer" id="contact">
  <div class="reveal">
    <div class="footer-heading">Say hello.</div>
    <a href="mailto:hello@raulbuibas.dev" class="footer-email">hello@raulbuibas.dev</a>
    <div class="footer-socials">
      <a href="https://github.com/rbuibas" class="social-pill" target="_blank" rel="noopener noreferrer">GitHub</a>
      <a href="https://linkedin.com/in/raulbuibas" class="social-pill" target="_blank" rel="noopener noreferrer">LinkedIn</a>
    </div>
  </div>
  <div class="reveal">
    <div class="footer-made">Made with curiosity<br>&amp; sleep deprivation<br>© 2026</div>
  </div>
</footer>

<style>
  .footer {
    padding: 80px 48px;
    border-top: 1px solid var(--border);
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
  }
  .footer-heading {
    font-family: 'Cormorant Garamond', serif;
    font-size: 40px;
    font-weight: 600;
    font-style: italic;
    color: var(--ink);
    margin-bottom: 20px;
  }
  .footer-email {
    font-family: 'DM Mono', monospace;
    font-size: 13px;
    color: var(--accent);
    text-decoration: none;
    letter-spacing: .05em;
    border-bottom: 1px solid var(--accent);
    padding-bottom: 2px;
    transition: opacity .2s;
  }
  .footer-email:hover { opacity: .7; }
  .footer-socials { display: flex; gap: 10px; margin-top: 20px; }
  .social-pill {
    font-family: 'DM Mono', monospace;
    font-size: 11px;
    color: var(--ink-light);
    border: 1px solid var(--border);
    padding: 6px 14px;
    border-radius: 2px;
    text-decoration: none;
    transition: background .2s, color .2s;
  }
  .social-pill:hover { background: var(--ink); color: var(--cream); border-color: var(--ink); }
  .footer-made {
    font-family: 'DM Mono', monospace;
    font-size: 11px;
    color: var(--ink-faint);
    letter-spacing: .05em;
    line-height: 2;
    text-align: right;
  }

  @media (max-width: 768px) {
    .footer { flex-direction: column; gap: 40px; padding: 64px 24px; }
    .footer-made { text-align: left; }
  }
</style>
