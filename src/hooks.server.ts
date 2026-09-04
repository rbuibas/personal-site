import type { Handle } from '@sveltejs/kit';
import { themeFor } from '$lib/theme';

/**
 * Stamp the route's palette onto <html data-theme> during SSR, so the body and
 * overscroll backgrounds are correct before hydration and there is no flash of
 * the wrong theme. Client-side navigation does not re-run this hook — the root
 * layout keeps the attribute in step from there.
 */
export const handle: Handle = ({ event, resolve }) => {
  const theme = themeFor(event.url.pathname);
  return resolve(event, {
    transformPageChunk: ({ html }) => html.replace('%myapp.theme%', theme),
  });
};
