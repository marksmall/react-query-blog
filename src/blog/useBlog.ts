import { useQuery } from '@tanstack/react-query';

import { BLOGS_API } from './blog.constants';
import { Blog, BlogData } from './useBlogs';

export const useBlog = (id: number) =>
  useQuery(
    ['blog', id],
    async () => {
      const response = await fetch(`${BLOGS_API}/${id}`);

      if (!response.ok) {
        const error = await response.json();

        throw new Error(`Error fetching blog: ${id}, Message: ${error.message}`);
      }

      const data: Blog = await response.json();

      return BlogData.parse(data);
    },
    {
      retry: 5,
    },
  );
