import { useMutation, useQueryClient } from '@tanstack/react-query';

import { BLOGS_API } from './blog.constants';
import { Blog, BlogData } from './useBlogs';

export const useCreateBlog = () => {
  const queryClient = useQueryClient();

  return useMutation(
    async ({ blog, user }) => {
      console.log('POSTING BLOG: ', blog, ', for User: ', user);
      const response = await fetch(BLOGS_API, {
        method: 'POST',
        body: JSON.stringify({ blog, userId: user.id }),
      });

      if (!response.ok) {
        throw new Error('Some error message');
      }

      const data = await response.json();
      // console.log('NEW BLOG RESPONSE: ', data);
      return BlogData.parse(data);
    },
    {
      //   onMutate: async (blog: Blog) => {
      //     // Cancel current queries for the blogs
      //     await queryClient.cancelQueries(['blogs']);

      //     // Get current blogs
      //     const currentBlogs = queryClient.getQueryData<Blog[]>(['blogs']);
      //     //   console.log('CURRENT BLOGS: ', currentBlogs);

      //     // Optimistically add blog to current cache
      //     queryClient.setQueryData<Blog[]>(['blogs'], oldBlogs => [...oldBlogs, blog]);

      //     // Return current list of blogs, so we can rollback in case of failure.
      //     return { currentBlogs };
      //   },
      onSettled: (): void => {
        queryClient.invalidateQueries(['blogs']);
      },
      onError: (error, variables, context): void => {
        // Rollback to current list of blogs
        queryClient.setQueryData(['blogs'], context?.currentBlogs);
      },
    },
  );
};
