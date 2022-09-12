import React, { FC, useState } from 'react';

import { useUser } from '~/accounts/useUser';

import { BlogListItem } from './blog-list-item.component';
import { Blog, useBlogs } from './useBlogs';

interface Props {
  className: string;
}

interface PagingButtonProps {
  onClick: () => void;
  disabled: boolean;
  children: string;
}

const PagingButton: FC<PagingButtonProps> = ({ disabled, onClick, children }) => (
  <button
    className="rounded-md bg-blue-500 p-2 hover:bg-blue-900 active:bg-blue-300 disabled:opacity-75"
    disabled={disabled}
    onClick={onClick}
  >
    {children}
  </button>
);

export const BlogList: FC<Props> = ({ className }) => {
  const [page, setPage] = useState<number>(0);

  const {
    data: blogs,
    isLoading: areBlogsLoading,
    error: areBlogError,
    isFetching,
    isPreviousData,
  } = useBlogs(page + 1);
  // console.log('Blogs: ', blogs);

  const { data: user, isLoading: userIsLoading, error: userError } = useUser();

  if (areBlogsLoading) {
    return <p>Loading Blogs...</p>;
  }

  if (areBlogError) {
    return <p>Error Fetching Blogs...</p>;
  }

  if (userIsLoading) {
    return <p>Loading Blogs...</p>;
  }

  if (userError) {
    return <p>Error Fetching Blogs...</p>;
  }

  return (
    <div className="flex flex-col">
      {isFetching ? <div>Refetching data...</div> : null}
      <ul className={`${className}`}>
        {blogs?.map((blog: Blog) => (
          <BlogListItem key={blog.title} blog={blog} page={page + 1} user={user} />
        ))}
      </ul>

      <div>
        <span>Current Page: {page + 1}</span>
        <PagingButton
          disabled={page === 0}
          // page={page}
          // setPage={setPage}
          onClick={() => setPage(old => Math.max(old - 1, 0))}
        >
          Previous Page
        </PagingButton>{' '}
        <PagingButton
          disabled={isPreviousData || blogs?.length < 5}
          onClick={() => {
            if (!isPreviousData) {
              setPage(old => old + 1);
            }
          }}
        >
          Next Page
        </PagingButton>
        {isFetching ? <span>Loading...</span> : null}
      </div>
    </div>
  );
};
