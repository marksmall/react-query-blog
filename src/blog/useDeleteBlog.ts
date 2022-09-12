import { useMutation, useQueryClient } from '@tanstack/react-query';

import { BLOGS_API } from './blog.constants';
import { Blog } from './useBlogs';

export const useDeleteBlog = () => {
  const queryClient = useQueryClient();

  return useMutation(
    async args => {
      const response = await fetch(`${BLOGS_API}/${args.id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Some error message');
      }
    },
    {
      // onMutate: async ({ id, page }) => {
      //   console.log('PARAMS: ', id, page);
      //   // Cancel current queries for the blogs
      //   await queryClient.cancelQueries(['blog']);
      //   await queryClient.cancelQueries(['blogs']);

      //   // Get current blogs
      //   const currentBlogs = queryClient.getQueryData<Blog[]>(['blogs', page]);

      //   // Optimistically delete blog
      //   queryClient.setQueryData<Blog[]>(['blogs', page], oldBlogs => oldBlogs?.filter((blog: Blog) => blog.id !== id));

      //   // Return current list of blogs, so we can rollback in case of failure.
      //   return { currentBlogs };
      // },
      onSettled: (): void => {
        // Invalidate and refetch all blogs.
        queryClient.invalidateQueries(['blogs']);
      },
      onError: (error, variables, context): void => {
        // Rollback to current list of blogs
        queryClient.setQueryData(['blogs'], context?.currentBlogs);
      },
    },
  );
};
