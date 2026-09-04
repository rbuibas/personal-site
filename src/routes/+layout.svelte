<script lang="ts">
  import '../app.css';
  import Nav from '$lib/components/Nav.svelte';
  import { onMount } from 'svelte';
  import { afterNavigate } from '$app/navigation';
  import { browser } from '$app/environment';
  import { page } from '$app/stores';
  import { themeFor } from '$lib/theme';

  /**
   * `hooks.server.ts` stamps <html data-theme> during SSR, but that hook does
   * not run for client-side navigation — without this the palette would stay
   * on whichever theme the page was first loaded with when crossing between
   * the personal and professional sides.
   */
  $: if (browser) {
    document.documentElement.dataset.theme = themeFor($page.url.pathname);
  }

  function setupReveal() {
    const obs = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (!e.isIntersecting) return;
        const siblings = [...(e.target.parentElement?.querySelectorAll('.reveal') ?? [])];
        setTimeout(() => e.target.classList.add('visible'), siblings.indexOf(e.target) * 80);
        obs.unobserve(e.target);
      });
    }, { threshold: 0.12 });
    document.querySelectorAll('.reveal').forEach(el => obs.observe(el));
  }

  onMount(setupReveal);
  afterNavigate(setupReveal);
</script>

<Nav />
<slot />
