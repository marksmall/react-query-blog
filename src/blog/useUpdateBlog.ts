import { QueryClient, useMutation } from '@tanstack/react-query';

import { BLOGS_API } from './blog.constants';
import { Blog, BlogData } from './useBlogs';

const queryClient = new QueryClient();

export const useUpdateBlog = () => {
  return useMutation(
    async ({ blog, user }) => {
      const response = await fetch(`${BLOGS_API}/${blog.id}`, {
        method: 'PUT',
        body: JSON.stringify({ blog, userId: user.id }),
      });

      if (!response.ok) {
        const error = await response.json();

        throw new Error(`Error updating blog: ${blog.id}, Message: ${error.message}`);
      }

      const data: Blog = await response.json();

      return BlogData.parse(data);
    },
    {
      onMutate: async updated => {
        // Cancel current queries for the blogs
        await queryClient.cancelQueries(['blog', updated.id]);
        await queryClient.cancelQueries(['blogs']);

        // Get current blog
        const currentBlog = queryClient.getQueryData<Blog[]>(['blog', updated.id]);

        // Optimistically update blog
        queryClient.setQueryData<Blog>(['blog', updated.id], () => ({
          ...updated,
        }));

        // Return current blog, so we can rollback in case of failure.
        return { currentBlog };
      },
      onSettled: (updated: Blog | undefined): void => {
        queryClient.invalidateQueries(['blog', updated?.id]);
      },
      onError: (error, variables, context): void => {
        // Rollback to current blog
        queryClient.setQueryData(['blog', context?.currentBlog?.id], context?.currentBlog);
      },
    },
  );
};
