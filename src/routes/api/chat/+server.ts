import { ANTHROPIC_API_KEY } from '$env/static/private';
import Anthropic from '@anthropic-ai/sdk';
import { json, error } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

const AGENT_NAMES = [
  'career',
  'education',
  'family-and-friends',
  'hobbies',
  'travel',
  'early-years',
  'philosophy',
  'tech-and-projects',
  'meta',
] as const;

type AgentName = (typeof AGENT_NAMES)[number];

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

const KNOWLEDGE = loadKnowledge();

const ROUTER_SYSTEM = `You are a routing classifier. Given a conversation, output a JSON array of 1–3 agent names that are most relevant to answer the latest question.

Available agents: ${AGENT_NAMES.join(', ')}

Rules:
- Return ONLY a JSON array, no prose, no markdown fences. Example: ["career","philosophy"]
- Choose the minimum set needed — usually 1 or 2 agents
- Use "meta" when asked about this assistant itself or what it can do
- Use "philosophy" when asked about values, opinions, or how Raul thinks
- When in doubt, prefer "career" as a fallback`;

async function classify(
  client: Anthropic,
  history: Array<{ role: string; content: string }>,
): Promise<AgentName[]> {
  try {
    const response = await client.messages.create({
      model: 'claude-haiku-4-5-20251001',
      max_tokens: 60,
      system: ROUTER_SYSTEM,
      messages: history.map((m) => ({
        role: m.role as 'user' | 'assistant',
        content: m.content,
      })),
    });

    const text = response.content[0].type === 'text' ? response.content[0].text.trim() : '[]';
    const parsed: unknown = JSON.parse(text);

    if (Array.isArray(parsed)) {
      const valid = parsed.filter((a): a is AgentName =>
        AGENT_NAMES.includes(a as AgentName),
      );
      if (valid.length > 0) return valid;
    }
  } catch {
    // fall through to default
  }
  return ['career'];
}

function buildSystemPrompt(agents: AgentName[]): string {
  const base = KNOWLEDGE['_base'] ?? '';
  const sections = agents
    .map((a) => KNOWLEDGE[a])
    .filter(Boolean)
    .join('\n\n---\n\n');
  return `${base}\n\n---\n\n${sections}`;
}

export const POST: RequestHandler = async ({ request }) => {
  let body: { message: string; history: Array<{ role: string; content: string }> };

  try {
    body = await request.json();
  } catch {
    throw error(400, 'Invalid JSON');
  }

  const { history } = body;

  if (!history || !Array.isArray(history) || history.length === 0) {
    throw error(400, 'history is required');
  }

  const client = new Anthropic({ apiKey: ANTHROPIC_API_KEY });

  const agents = await classify(client, history);

  try {
    const response = await client.messages.create({
      model: 'claude-haiku-4-5-20251001',
      max_tokens: 1000,
      system: buildSystemPrompt(agents),
      messages: history.map((m) => ({
        role: m.role as 'user' | 'assistant',
        content: m.content,
      })),
    });

    const reply =
      response.content[0].type === 'text' ? response.content[0].text : '(no response)';
    return json({ reply });
  } catch (err) {
    console.error('Anthropic API error:', err);
    throw error(500, 'Failed to get a response');
  }
};
