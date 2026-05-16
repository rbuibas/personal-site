import { error } from '@sveltejs/kit';
import type { PageLoad } from './$types';

export const load: PageLoad = async ({ params }) => {
  const modules = import.meta.glob('/src/posts/*.md');
  const loader = modules[`/src/posts/${params.slug}.md`];

  if (!loader) {
    throw error(404, `Post not found`);
  }

  const post = (await loader()) as { default: any; metadata: Record<string, string> };
  return {
    content: post.default,
    metadata: post.metadata,
  };
};
