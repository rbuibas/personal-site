export const AGENT_NAMES = [
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

export type AgentName = (typeof AGENT_NAMES)[number];

export type ChatMessage = { role: 'user' | 'assistant'; content: string };
