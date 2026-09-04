import type { Handle } from '@sveltejs/kit';

/**
 * The site has two faces sharing one design system: the personal one (warm)
 * and the professional one (cool). Which palette applies is a function of the
 * route, so it is resolved here and stamped onto <html data-theme> during SSR
 * — that keeps body/overscroll backgrounds correct and avoids a flash of the
 * wrong theme before hydration.
 */
function themeFor(pathname: string) {
  return pathname === '/personal' ||
    pathname.startsWith('/personal/') ||
    pathname === '/blog' ||
    pathname.startsWith('/blog/')
    ? 'personal'
    : 'professional';
}

export const handle: Handle = ({ event, resolve }) => {
  const theme = themeFor(event.url.pathname);
  return resolve(event, {
    transformPageChunk: ({ html }) => html.replace('%myapp.theme%', theme),
  });
};
