const rawFiles = import.meta.glob('/src/lib/knowledge/*.md', {
  query: '?raw',
  eager: true,
}) as Record<string, { default: string }>;

function loadKnowledge(): Record<string, string> {
  const out: Record<string, string> = {};
  for (const [path, mod] of Object.entries(rawFiles)) {
    const name = path.replace('/src/lib/knowledge/', '').replace('.md', '');
    out[name] = mod.default;
  }
  return out;
}

export const KNOWLEDGE = loadKnowledge();
