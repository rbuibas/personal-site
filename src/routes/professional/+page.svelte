<script lang="ts">
  import Hero from '$lib/components/Hero.svelte';
  import TimelineSection from '$lib/components/professional/TimelineSection.svelte';
  import UnderConstruction from '$lib/components/professional/UnderConstruction.svelte';
  import { professionalHero, education, career } from '$lib/data/professional';
</script>

<svelte:head>
  <title>Raul Buibas — Engineering</title>
  <meta
    name="description"
    content="Education, career and professional work — a timeline of what I have built and where."
  />
</svelte:head>

<Hero {...professionalHero} />

<TimelineSection id="education" label="Education" items={education} />
<TimelineSection id="career" label="Career" items={career} />

<UnderConstruction id="writing" label="Writing" variant="writing" />
<UnderConstruction id="chat" label="Chat" variant="chat" />
<UnderConstruction id="contact" label="Contact" variant="contact" />

<footer class="footer">
  <div class="footer-made">© 2026 · Raul Buibas</div>
  <a href="/personal" class="footer-cross">Personal site ↗</a>
</footer>

<style>
  .footer {
    padding: 48px;
    border-top: 1px solid var(--border);
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 24px;
  }
  .footer-made,
  .footer-cross {
    font-family: 'DM Mono', monospace;
    font-size: 11px;
    letter-spacing: .05em;
    color: var(--fg-faint);
  }
  .footer-cross {
    text-decoration: none;
    transition: color .2s;
  }
  .footer-cross:hover { color: var(--accent); }

  @media (max-width: 768px) {
    .footer { padding: 40px 24px; }
  }
</style>
