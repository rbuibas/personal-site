<nav>
  <a href="/" class="nav-logo">raulbuibas.dev</a>
  <div class="nav-links">
    <a href="/#work">Work</a>
    <a href="/#about">About</a>
    <a href="/#writing">Writing</a>
    <a href="/#chat">Chat</a>
    <a href="/#contact">Contact</a>
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
    background: rgba(245, 242, 236, .92);
    backdrop-filter: blur(8px);
    border-bottom: 1px solid var(--border);
    animation: fadeIn .6s ease both;
  }
  .nav-logo {
    font-family: 'DM Mono', monospace;
    font-size: 13px;
    color: var(--ink);
    text-decoration: none;
  }
  .nav-links { display: flex; gap: 28px; }
  .nav-links a {
    font-size: 13px;
    color: var(--ink-light);
    text-decoration: none;
    transition: color .2s;
  }
  .nav-links a:hover { color: var(--ink); }

  @media (max-width: 768px) {
    nav { padding: 0 24px; }
    .nav-links { gap: 16px; }
  }
</style>
