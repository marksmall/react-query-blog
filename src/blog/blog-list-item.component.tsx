import React, { FC, ReactNode } from 'react';

import { User } from '~/accounts/useUser';

import { ButtonLink } from '../app.component';
import { Blog } from './useBlogs';
import { useDeleteBlog } from './useDeleteBlog';

interface Props {
  blog: Blog;
  user: User;
  page: number;
}

interface BlogListButtonProps {
  onClick: () => void;
  disabled: boolean;
  children: ReactNode;
}

const BlogListButton: FC<BlogListButtonProps> = ({ onClick, disabled, children }) => (
  <button
    className="rounded-md bg-blue-500 p-2 hover:bg-blue-900 active:bg-blue-300 disabled:cursor-not-allowed disabled:opacity-75"
    disabled={disabled}
    onClick={onClick}
  >
    {children}
  </button>
);

export const BlogListItem: FC<Props> = ({ blog, user, page }) => {
  const deleteMutation = useDeleteBlog();

  return (
    <li className="flex cursor-pointer justify-between border-2 border-gray-900 bg-gray-500 p-2">
      {blog.title}

      <div>
        <ButtonLink disabled={blog.ownerId !== user.id} to={`/${blog.id}`}>
          <span>Edit</span>
        </ButtonLink>
        {/* <BlogListButton disabled={blog.ownerId !== user.id} onClick={() => console.log('Editing: ', blog)}>
          Edit
        </BlogListButton> */}
        |
        <BlogListButton
          disabled={blog.ownerId !== user.id}
          onClick={() => {
            console.log('Deleting: ', blog);
            deleteMutation.mutate({ id: blog.id, page });
          }}
        >
          Delete
        </BlogListButton>
      </div>
    </li>
  );
};
