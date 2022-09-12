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
        throw new Error('Some error message');
      }

      const data: Blog = await response.json();

      return BlogData.parse(data);
    },
    {
      //   onMutate: async updated => {
      //     console.log('UPDATED: ', updated);
      //     // console.log('onMUTATE VARIABLES: ', { id, page });
      //     //   // Cancel current queries for the blogs
      //     await queryClient.cancelQueries(['blog', updated.id]);
      //     await queryClient.cancelQueries(['blogs']);

      //     // Get current blog
      //     const currentBlog = queryClient.getQueryData<Blog[]>(['blog', updated.id]);
      //     //   console.log('CURRENT BLOGS: ', currentBlogs);

      //     // Optimistically update blog
      //     queryClient.setQueryData<Blog>(['blog', updated.id], oldBlog => ({
      //       ...updated,
      //     }));
      //     // queryClient.setQueryData<Blog[]>(['blogs', page], oldBlogs =>
      //     //   oldBlogs?.filter((blog: Blog) => (blog.id !== updated.id ? blog : updated)),
      //     // );

      //     // Return current list of blogs, so we can rollback in case of failure.
      //     return { currentBlog };
      //   },
      onSettled: (): void => {
        queryClient.invalidateQueries(['blog', updated?.id]);
      },
      onError: (error, variables, context): void => {
        // Rollback to current blog
        queryClient.setQueryData(['blog', context?.currentBlog?.id], context?.currentBlog);
      },
    },
  );
};
