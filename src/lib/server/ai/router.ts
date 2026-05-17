import type Anthropic from '@anthropic-ai/sdk';
import { AGENT_NAMES, type AgentName, type ChatMessage } from './types';

const ROUTER_SYSTEM = `You are a routing classifier. Given a conversation, output a JSON array of 1–3 agent names that are most relevant to answer the latest question.

Available agents: ${AGENT_NAMES.join(', ')}

Rules:
- Return ONLY a JSON array, no prose, no markdown fences. Example: ["career","philosophy"]
- Choose the minimum set needed — usually 1 or 2 agents
- Use "meta" when asked about this assistant itself or what it can do
- Use "philosophy" when asked about values, opinions, or how Raul thinks
- When in doubt, prefer "career" as a fallback`;

export async function classify(
  client: Anthropic,
  history: ChatMessage[],
): Promise<AgentName[]> {
  try {
    const response = await client.messages.create({
      model: 'claude-haiku-4-5-20251001',
      max_tokens: 60,
      system: ROUTER_SYSTEM,
      messages: history,
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
