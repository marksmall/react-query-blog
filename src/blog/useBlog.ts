import { useQuery } from '@tanstack/react-query';

import { BLOGS_API } from './blog.constants';
import { BlogData } from './useBlogs';

export const useBlog = (id: number) =>
  useQuery(
    ['blog', id],
    async () => {
      const response = await fetch(`${BLOGS_API}/${id}`);

      if (!response.ok) {
        throw new Error('Some error message');
      }

      const data = await response.json();

      return BlogData.parse(data);
    },
    {
      retry: 5,
    },
  );
