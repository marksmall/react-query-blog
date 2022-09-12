import React, { FC, ReactElement, useEffect } from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
import { SubmitHandler, useForm } from 'react-hook-form';
// import { useParams } from 'react-router-dom';
import { z } from 'zod';

import { User, useUser } from '~/accounts/useUser';

// import { useBlog } from './useBlog';

interface Props {
  blog: BlogFormType;
  saveBlog: (form: BlogFormType, user: User) => void;
  className?: string;
}

interface ErrorProps {
  children: ReactElement;
}

const BlogFormSchema = z.object({
  title: z.string(),
  content: z.string(),
});

type BlogFormType = z.infer<typeof BlogFormSchema>;

const defaultFormValues = {
  title: '',
  content: '',
};

const Error: FC<ErrorProps> = ({ children }) => <p className="mt-1 text-sm text-red-600">{children}</p>;

export const BlogForm: FC<Props> = ({ blog = defaultFormValues, saveBlog, className }) => {
  // console.log('DEFAULT VALUES: ', blog);
  const { data: user, isLoading: userIsLoading, error: userError } = useUser();
  // const isDisabled = blog.ownerId ? false : user?.id === blog.ownerId;
  // console.log('IS SAVING DISABLED: ', isDisabled);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    // getValues,
    reset,
  } = useForm<BlogFormType>({ resolver: zodResolver(BlogFormSchema), defaultValues: blog });

  useEffect(() => {
    if (blog) {
      reset(blog);
    }
  }, [reset, blog]);

  const onSubmit: SubmitHandler<BlogFormType> = form => saveBlog({ ...blog, ...form }, user);

  // if (isLoading) {
  //   return <p>Loading Single Blog...</p>;
  // }

  // if (error) {
  //   return <p>Error Fetching Single Blog...</p>;
  // }

  return (
    <form className={`flex flex-col p-8 ${className}`} onSubmit={handleSubmit(onSubmit)}>
      <label htmlFor="title">Title: </label>
      <div>
        <input
          className="border-2 border-gray-500 text-black"
          type="text"
          {...register('title')}
          disabled={isSubmitting}
        />
        {errors.title && <Error>{errors.title.message}</Error>}
      </div>

      <label htmlFor="content">Content: </label>
      <div>
        <textarea
          className="border-2 border-gray-500 text-black"
          cols={100}
          rows={10}
          {...register('content')}
          disabled={isSubmitting}
        />
        {errors.content && <Error>{errors.content.message}</Error>}
      </div>

      <div className="flex justify-end p-2">
        <button
          className="rounded-md bg-green-500 p-2 text-gray-900 hover:bg-green-900 hover:text-white active:bg-green-300 active:text-gray-900 disabled:cursor-not-allowed disabled:opacity-75"
          // disabled={isDisabled}
          type="submit"
          // onClick={onSubmit}
        >
          Save
        </button>
      </div>
    </form>
  );
};
