import type Anthropic from '@anthropic-ai/sdk';
import { classify } from './router';
import { respond } from './responder';
import type { AgentName, ChatMessage } from './types';

export type OrchestrationResult = { reply: string; agents: AgentName[] };

export async function orchestrate(
  client: Anthropic,
  history: ChatMessage[],
): Promise<OrchestrationResult> {
  const agents = await classify(client, history);
  const reply = await respond(client, history, agents);
  return { reply, agents };
}

export { AGENT_NAMES } from './types';
export type { AgentName, ChatMessage } from './types';
