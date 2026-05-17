export const AGENT_NAMES = [
  'doru',
  'nebojsa',
  'rajko',
  'stjepan',
  'alexandra',
  'milanka',
  'stevan',
  'brian',
  'meta',
] as const;

export type AgentName = (typeof AGENT_NAMES)[number];

export type ChatMessage = { role: 'user' | 'assistant'; content: string };
