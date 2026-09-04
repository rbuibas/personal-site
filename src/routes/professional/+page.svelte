<script lang="ts">
  import Hero from '$lib/components/Hero.svelte';
  import ViewSwitcher from '$lib/components/professional/ViewSwitcher.svelte';
  import CareerStory from '$lib/components/professional/CareerStory.svelte';
  import TurningPoints from '$lib/components/professional/TurningPoints.svelte';
  import TimelineSection from '$lib/components/professional/TimelineSection.svelte';
  import WritingTopics from '$lib/components/professional/WritingTopics.svelte';
  import ChatComingSoon from '$lib/components/professional/ChatComingSoon.svelte';
  import Contact from '$lib/components/professional/Contact.svelte';
  import {
    professionalHero,
    careerIntro,
    education,
    career,
    chatComingSoon,
    contact,
    writingIntro,
  } from '$lib/data/professional';

  export let data;

  /**
   * One page, three tellings — so each view gets its own title and description
   * rather than three URLs claiming to be the same document.
   */
  const META = {
    story: {
      title: 'Raul Buibas — The Career Story',
      description:
        'Nineteen years of engineering told as a story, from a hand-etched circuit board to ' +
        'generative AI in production.',
    },
    'turning-points': {
      title: 'Raul Buibas — Turning Points',
      description:
        'Six decisions that changed what I was: the soldering iron, nine years in one ' +
        'codebase, a compiler, a country, the JVM, and the boring platform.',
    },
    chronology: {
      title: 'Raul Buibas — Principal Engineer',
      description:
        'Nineteen years from printer firmware in C to generative AI in production — ' +
        'education and career, in order.',
    },
  } as const;

  $: meta = META[data.view];
</script>

<svelte:head>
  <title>{meta.title}</title>
  <meta name="description" content={meta.description} />
</svelte:head>

<Hero {...professionalHero} />

<ViewSwitcher active={data.view} />

<!-- The anchor the nav points at, whichever telling is on screen. -->
<div id="story">
  {#if data.view === 'story'}
    <CareerStory />
  {:else if data.view === 'turning-points'}
    <TurningPoints />
  {:else}
    <TimelineSection id="education" label="Education" eras={education} showEras={false} />
    <TimelineSection id="career" label="Career" eras={career} intro={careerIntro} />
  {/if}
</div>

<WritingTopics id="writing" label="Writing" intro={writingIntro} entries={data.writing} />
<ChatComingSoon id="chat" label="Chat" {...chatComingSoon} />
<Contact id="contact" label="Contact" {...contact} />

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
