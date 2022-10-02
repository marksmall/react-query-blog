import { useMutation, useQueryClient } from '@tanstack/react-query';

import { BLOGS_API } from './blog.constants';
import { Blog, BlogData } from './useBlogs';

export const useCreateBlog = () => {
  const queryClient = useQueryClient();

  return useMutation(
    async ({ blog, user }) => {
      const response = await fetch(BLOGS_API, {
        method: 'POST',
        body: JSON.stringify({ blog, userId: user.id }),
      });

      if (!response.ok) {
        const error = await response.json();

        throw new Error(`Error Creating Blog: ${error.message}`);
      }

      const data: Blog = await response.json();

      return BlogData.parse(data);
    },
    {
      onSettled: (): void => {
        queryClient.invalidateQueries(['blogs']);
      },
    },
  );
};
