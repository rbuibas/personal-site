import type Anthropic from '@anthropic-ai/sdk';
import { KNOWLEDGE } from './knowledge';
import type { AgentName, ChatMessage } from './types';

function buildSystemPrompt(agents: AgentName[]): string {
  const base = KNOWLEDGE['_base'] ?? '';
  const sections = agents
    .map((a) => KNOWLEDGE[a])
    .filter(Boolean)
    .join('\n\n---\n\n');
  return `${base}\n\n---\n\n${sections}`;
}

export async function respond(
  client: Anthropic,
  history: ChatMessage[],
  agents: AgentName[],
): Promise<string> {
  const response = await client.messages.create({
    model: 'claude-haiku-4-5-20251001',
    max_tokens: 1000,
    system: buildSystemPrompt(agents),
    messages: history,
  });

  return response.content[0].type === 'text' ? response.content[0].text : '(no response)';
}
