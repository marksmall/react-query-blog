import { useQuery } from '@tanstack/react-query';
import { z } from 'zod';

import { BLOGS_API } from './blog.constants';

export const BlogData = z.object({
  id: z.number(),
  ownerId: z.number(),
  title: z.string(),
  content: z.string(),
});
const Blogs = z.array(BlogData);

export type Blog = z.infer<typeof BlogData>;

// export const useBlogs = (page: number) =>
export const useBlogs = () =>
  useQuery(
    ['blogs'],
    // ['blogs', page],
    async () => {
      const response = await fetch(BLOGS_API);
      // const response = await fetch(`${BLOGS_API}?page=${page}`);

      if (!response.ok) {
        const error = await response.json();

        throw new Error(`Error fetching blogs, Message: ${error.message}`);
      }

      const data: Blog = await response.json();

      return Blogs.parse(data);
    },
    {
      keepPreviousData: true,
    },
  );
