import type { PageLoad } from './$types';

export const load: PageLoad = async () => {
  const modules = import.meta.glob('/src/posts/*.md', { eager: true });
  const posts = Object.entries(modules).map(([path, mod]: [string, any]) => {
    const slug = path.replace('/src/posts/', '').replace('.md', '');
    return { slug, ...mod.metadata };
  });
  posts.sort((a: any, b: any) => new Date(b.date).getTime() - new Date(a.date).getTime());
  return { posts: posts.slice(0, 3) };
};
