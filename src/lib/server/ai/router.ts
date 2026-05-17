import type Anthropic from '@anthropic-ai/sdk';
import { AGENT_NAMES, type AgentName, type ChatMessage } from './types';

const AGENT_DESCRIPTIONS: Record<AgentName, string> = {
  nebojsa:   'career, work ethic, professional arc, industries, discipline, jobs',
  nikola:    'education, learning, self-teaching, knowledge, school, studying',
  rajko:     'family, friends, Emma, wife Alexandra, brother Stevan, personal life, relationships',
  stjepan:   'hobbies, gardening, interests outside work, leisure, ping pong, free time',
  alexandra: 'travel, places lived, places visited, adventures, geography',
  milanka:   'early years, childhood, Romania, Serbia, upbringing, formation, campus, boarding school',
  stevan:    'philosophy, values, opinions, worldview, how Raul thinks, mindset, approach to life',
  brian:     'tech, projects, engineering, stack, AI, code, this website, IBM, tools',
  meta:      'about this assistant, about Astra, who the chat participants are, what the chat does',
};

const ROUTER_SYSTEM = `You are a routing classifier. Given a conversation, output a JSON array of 1–3 agent names that are most relevant to answer the latest question.

Available agents and their domains:
${AGENT_NAMES.map(n => `- ${n}: ${AGENT_DESCRIPTIONS[n]}`).join('\n')}

Rules:
- Return ONLY a JSON array, no prose, no markdown fences. Example: ["nebojsa","stevan"]
- Choose the minimum set needed — usually 1 or 2 agents
- Use "meta" when asked about this assistant, about Astra, or about who the participants in the channel are
- Use "stevan" when asked about values, opinions, or how Raul thinks
- When in doubt, prefer "nebojsa" as a fallback`;

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
  return ['nebojsa'];
}
