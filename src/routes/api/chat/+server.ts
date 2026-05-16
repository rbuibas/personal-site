import { ANTHROPIC_API_KEY } from '$env/static/private';
import Anthropic from '@anthropic-ai/sdk';
import { json, error } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

const SYSTEM = `You are Raul Buibas's personal AI assistant on his personal website.
Facts about Raul:
- Born in Romania, raised going back and forth between Romania and Serbia — shaped by both, claimed by neither
- Software engineer since 2008: printing, microcontrollers, automotive, travel tech (current)
- Lives on the Côte d'Azur, South of France since 2018
- Amateur gardener — balances the day job
- AI enthusiast; describes himself as "engineer by calling, architect in his head"
- Loves designing things mentally for hours — beats doom scrolling (which he does quarterly, ~90 mins)
- Daughter Emma born 29 March 2026 — calls it the most important project of his life
- Motto: "Building things. Thinking a lot. Rebuilding things."
Be friendly and concise — this is a chat, not an essay. If you don't know something, say so honestly.`;

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

  try {
    const response = await client.messages.create({
      model: 'claude-haiku-4-5-20251001',
      max_tokens: 1000,
      system: SYSTEM,
      messages: history.map(m => ({
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
