import React, { FC, ReactElement } from 'react';

import { BlogForm } from './blog-form.component';
import { useCreateBlog } from './useCreateBlog';

export const NewBlog: FC = (): ReactElement => {
  const mutation = useCreateBlog();

  const blog = { title: '', content: '' };

  const saveBlog = (blog, user) => mutation.mutate({ blog, user });

  return <BlogForm blog={blog} saveBlog={saveBlog} />;
};
