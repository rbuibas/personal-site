<script lang="ts">
  import { page } from '$app/stores';
  import { isPersonalPath } from '$lib/theme';

  type Section = { base: string; logo: string; links: Array<{ href: string; label: string }> };

  const PROFESSIONAL: Section = {
    base: '/professional',
    logo: '/professional',
    links: [
      { href: '/professional#education', label: 'Education' },
      { href: '/professional#career', label: 'Career' },
      { href: '/professional#chat', label: 'Chat' },
      { href: '/professional#contact', label: 'Contact' },
    ],
  };

  const PERSONAL: Section = {
    base: '/personal',
    logo: '/personal',
    links: [
      { href: '/personal#work', label: 'Work' },
      { href: '/personal#about', label: 'About' },
      { href: '/personal#writing', label: 'Writing' },
      { href: '/personal#chat', label: 'Chat' },
      { href: '/personal#contact', label: 'Contact' },
    ],
  };

  // Same predicate that picks the palette, so the nav and the theme can never
  // disagree about which side of the site you are on.
  $: isPersonal = isPersonalPath($page.url.pathname);
  $: section = isPersonal ? PERSONAL : PROFESSIONAL;
  $: crossover = isPersonal
    ? { href: PROFESSIONAL.base, label: 'Professional' }
    : { href: PERSONAL.base, label: 'Personal' };
</script>

<nav aria-label="Main">
  <a href={section.logo} class="nav-logo">
    <span class="nav-logo-full">raulbuibas.dev</span>
    <span class="nav-logo-short">rb.dev</span>
  </a>
  <div class="nav-links">
    {#each section.links as link}
      <a href={link.href}>{link.label}</a>
    {/each}
    <a href={crossover.href} class="nav-crossover">{crossover.label} ↗</a>
  </div>
</nav>

<style>
  nav {
    position: fixed;
    top: 0; left: 0; right: 0;
    z-index: 100;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 48px;
    height: 60px;
    background: var(--nav-bg);
    backdrop-filter: blur(8px);
    border-bottom: 1px solid var(--border);
    animation: fadeIn .6s ease both;
  }
  .nav-logo {
    font-family: 'DM Mono', monospace;
    font-size: 13px;
    color: var(--fg);
    text-decoration: none;
  }
  .nav-logo-short { display: none; }
  .nav-links { display: flex; align-items: center; gap: 28px; }
  .nav-links a {
    text-decoration: none;
    transition: color .2s;
  }
  .nav-links a:not(.nav-crossover) {
    font-size: 13px;
    color: var(--fg-muted);
  }
  .nav-links a:not(.nav-crossover):hover { color: var(--fg); }
  .nav-crossover {
    font-family: 'DM Mono', monospace;
    font-size: 11px;
    color: var(--fg-faint);
    letter-spacing: .05em;
    padding-left: 20px;
    border-left: 1px solid var(--border);
  }
  .nav-crossover:hover { color: var(--accent); }

  @media (max-width: 768px) {
    nav { padding: 0 24px; gap: 16px; }
    .nav-links { gap: 16px; }
    .nav-crossover { padding-left: 12px; }
  }

  /*
    The professional labels ("Education", "Career") are longer than the
    personal ones, and the personal side still has five tabs, so a full row
    plus the logo does not fit on a phone. Drop the crossover link, tighten
    the type, and let the row scroll as a safety valve so no label is ever
    clipped by the viewport edge.
  */
  @media (max-width: 600px) {
    .nav-crossover { display: none; }
    .nav-logo { flex-shrink: 0; }
    /* The short form buys back the ~60px the tab row needs. */
    .nav-logo-full { display: none; }
    .nav-logo-short { display: inline; }
    .nav-links {
      gap: 14px;
      overflow-x: auto;
      scrollbar-width: none;
      -ms-overflow-style: none;
      -webkit-overflow-scrolling: touch;
    }
    .nav-links::-webkit-scrollbar { display: none; }
    .nav-links a:not(.nav-crossover) { font-size: 12px; white-space: nowrap; }
  }
</style>
