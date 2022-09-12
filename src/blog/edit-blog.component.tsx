import React, { FC } from 'react';

import { useParams } from 'react-router-dom';

import { BlogForm } from './blog-form.component';
import { useBlog } from './useBlog';
import { useUpdateBlog } from './useUpdateBlog';

export const EditBlog: FC = () => {
  const { id } = useParams();

  const { data: blog, isLoading, error } = useBlog(+id);
  const mutation = useUpdateBlog();

  if (isLoading) {
    return <p>Loading Single Blog...</p>;
  }

  if (error) {
    return <p>Error Fetching Single Blog...</p>;
  }

  const saveBlog = (blog, user) => mutation.mutate({ blog, user });

  return <BlogForm blog={blog} saveBlog={saveBlog} />;
};
