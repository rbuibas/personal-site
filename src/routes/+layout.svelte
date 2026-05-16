<script lang="ts">
  import '../app.css';
  import Nav from '$lib/components/Nav.svelte';
  import { onMount } from 'svelte';
  import { afterNavigate } from '$app/navigation';

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
