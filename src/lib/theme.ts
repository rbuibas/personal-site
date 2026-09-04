export type Theme = 'personal' | 'professional';

/**
 * The site has two faces sharing one design system: the personal one (warm)
 * and the professional one (cool). Which one applies is a function of the
 * route, and three places need to agree on it — `hooks.server.ts` stamps it
 * onto <html data-theme> during SSR, the root layout re-applies it on
 * client-side navigation (the server hook does not re-run for those), and
 * `Nav` picks its link set from the same predicate.
 *
 * The blog is personal writing, so it belongs to the personal side.
 */
export function isPersonalPath(pathname: string) {
  return (
    pathname === '/personal' ||
    pathname.startsWith('/personal/') ||
    pathname === '/blog' ||
    pathname.startsWith('/blog/')
  );
}

export function themeFor(pathname: string): Theme {
  return isPersonalPath(pathname) ? 'personal' : 'professional';
}
