<script lang="ts">
  import { abstractionLadder, ladderRungs } from '$lib/data/professional';

  /* Plot geometry. The x axis is a sequence, not a time scale — the real gaps
     run from one year to nine — so the steps are evenly spaced and each one
     carries its year as a label. Drawing it to scale would bunch four moves
     into 2016–2019 and leave a decade of empty paper. */
  const W = 1000;
  const H = 320;
  const X0 = 62;
  const X1 = 938;
  const TOP = 88;
  const BOTTOM = 252;

  const step = (X1 - X0) / (abstractionLadder.length - 1);
  const rungGap = (BOTTOM - TOP) / (ladderRungs - 1);

  const x = (i: number) => X0 + i * step;
  const y = (level: number) => BOTTOM - (level - 1) * rungGap;

  const levels = abstractionLadder.map((s) => s.level);
  const last = abstractionLadder.length - 1;

  /* A label goes above its point only where the line cannot be there: at a
     peak, or at an end the line rises into. Everywhere else it goes below,
     which is the side the line has just left. Alternating sides blindly put
     two labels straight through the line. */
  const sitsAbove = (i: number) =>
    (i === 0 || levels[i - 1] <= levels[i]) && (i === last || levels[i + 1] <= levels[i]);

  const points = abstractionLadder.map((s, i) => ({
    ...s,
    x: x(i),
    y: y(s.level),
    above: sitsAbove(i),
    anchor: i === 0 ? 'start' : i === last ? 'end' : 'middle',
  }));

  const path = points.map((p) => `${p.x},${p.y}`).join(' ');
</script>

<figure class="al">
  <figcaption class="al-caption">
    Lower is closer to the metal. Each point is a move, not a year.
  </figcaption>

  <div class="al-scroll">
    <svg viewBox="0 0 {W} {H}" class="al-svg" role="img"
      aria-label="The path of my career across levels of abstraction: logic gates in 2001, boards by hand in 2005, C and algorithms in 2006, down to compiler and assembler in 2016, up to Java and Eclipse tooling in 2017, up to Angular in 2018, back down to JVM internals in 2019, then up to cloud, APIs and AI in 2023.">

      <!-- Rungs. Recessive on purpose: they are a reference, not the subject. -->
      {#each Array(ladderRungs) as _, r}
        <line
          x1={X0 - 26} y1={y(r + 1)} x2={X1 + 26} y2={y(r + 1)}
          class="al-rung"
        />
      {/each}

      <!-- The axis of the whole idea. -->
      <line x1={X0 - 26} y1={BOTTOM} x2={X0 - 26} y2={TOP - 14} class="al-axis" />
      <path d="M{X0 - 26},{TOP - 20} l-4,7 l8,0 z" class="al-axis-head" />
      <text x={X0 - 34} y={TOP - 24} class="al-axis-label" text-anchor="start">abstraction</text>

      <polyline points={path} class="al-line" />

      {#each points as p}
        <!-- A ring in the surface colour keeps the dot legible where it sits on a rung. -->
        <circle cx={p.x} cy={p.y} r="6.5" class="al-dot-ring" />
        <circle cx={p.x} cy={p.y} r="4.5" class="al-dot" />
        <text
          x={p.x}
          y={p.above ? p.y - 22 : p.y + 24}
          text-anchor={p.anchor}
          class="al-year"
        >{p.year}</text>
        <text
          x={p.x}
          y={p.above ? p.y - 38 : p.y + 41}
          text-anchor={p.anchor}
          class="al-label"
        >{p.label}</text>
      {/each}
    </svg>
  </div>
</figure>

<style>
  .al { margin: 0 0 64px; }
  .al-caption {
    font-family: 'DM Mono', monospace;
    font-size: 11px;
    letter-spacing: .05em;
    color: var(--fg-faint);
    margin-bottom: 18px;
  }

  /* Below ~1000px the diagram scrolls rather than crushing its labels. */
  .al-scroll {
    overflow-x: auto;
    -webkit-overflow-scrolling: touch;
  }
  .al-svg {
    display: block;
    width: 100%;
    min-width: 860px;
    height: auto;
  }

  .al-rung { stroke: var(--border); stroke-width: 1; }
  .al-axis,
  .al-axis-head { stroke: var(--fg-faint); fill: var(--fg-faint); stroke-width: 1; }
  .al-axis-label {
    font-family: 'DM Mono', monospace;
    font-size: 10px;
    letter-spacing: .16em;
    text-transform: uppercase;
    fill: var(--fg-faint);
  }

  .al-line {
    fill: none;
    stroke: var(--accent);
    stroke-width: 2;
    stroke-linejoin: round;
    stroke-linecap: round;
  }
  .al-dot { fill: var(--accent); }
  .al-dot-ring { fill: var(--surface); }

  /* Text wears ink tokens, never the line's colour. */
  .al-year {
    font-family: 'DM Mono', monospace;
    font-size: 11px;
    letter-spacing: .06em;
    fill: var(--fg-faint);
  }
  .al-label {
    font-family: 'DM Sans', sans-serif;
    font-size: 13.5px;
    fill: var(--fg);
  }

  @media (max-width: 900px) {
    .al { margin-bottom: 48px; }
  }
</style>
