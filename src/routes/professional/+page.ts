import type { PageLoad } from './$types';
import {
  storyViews,
  writingTopics,
  type StoryViewId,
  type WritingEntry,
} from '$lib/data/professional';

const VIEW_IDS = storyViews.map((view) => view.id);

/**
 * The story view is a query parameter rather than a client-side toggle, so each
 * view has its own URL, renders on the server and survives with JavaScript off.
 * Reading `url` here is what makes SvelteKit re-run this load when the
 * parameter changes. An unknown value falls back to the default view rather
 * than erroring — a mangled link should still show something.
 */
function viewFrom(value: string | null): StoryViewId {
  return VIEW_IDS.includes(value as StoryViewId) ? (value as StoryViewId) : 'story';
}

export const load: PageLoad = ({ url }) => {
  const modules = import.meta.glob('/src/posts/*.md', { eager: true });
  const bySlug = new Map<string, any>(
    Object.entries(modules).map(([path, mod]: [string, any]) => [
      path.replace('/src/posts/', '').replace('.md', ''),
      mod.metadata,
    ]),
  );

  // A topic only carries post metadata once the matching file exists; without
  // it the section renders the topic as a stub instead of a dead link.
  const writing: WritingEntry[] = writingTopics.map((topic) => {
    const post = topic.slug ? bySlug.get(topic.slug) : undefined;
    return post ? { ...topic, post } : { ...topic };
  });

  return { view: viewFrom(url.searchParams.get('view')), writing };
};
