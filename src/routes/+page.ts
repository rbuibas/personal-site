import { redirect } from '@sveltejs/kit';

// The professional site is the front door; the personal one lives at /personal.
// 307 (not 308) on purpose — a permanent redirect gets hard-cached by browsers
// and would be painful to undo if the landing target ever changes.
export const load = () => {
  redirect(307, '/professional');
};
