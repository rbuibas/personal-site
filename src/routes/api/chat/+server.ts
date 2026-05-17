import { ANTHROPIC_API_KEY } from '$env/static/private';
import Anthropic from '@anthropic-ai/sdk';
import { json, error } from '@sveltejs/kit';
import { orchestrate, type ChatMessage } from '$lib/server/ai';
import type { RequestHandler } from './$types';

export const POST: RequestHandler = async ({ request }) => {
  let body: { message: string; history: ChatMessage[] };

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
    const { reply, agents } = await orchestrate(client, history);
    return json({ reply, agents });
  } catch (err) {
    console.error('Anthropic API error:', err);
    throw error(500, 'Failed to get a response');
  }
};
