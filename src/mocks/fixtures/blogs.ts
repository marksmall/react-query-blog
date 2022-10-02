import { Blog } from '~/blog/useBlogs';

const PAGE_SIZE = 5;

let blogs: Blog[] = [
  {
    id: 1,
    ownerId: 1,
    title: 'Blog 1',
    content: 'Blog 1 Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
  },
  {
    id: 2,
    ownerId: 3,
    title: 'Blog 2',
    content: 'Blog 2 Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
  },
  {
    id: 3,
    ownerId: 2,
    title: 'Blog 3',
    content: 'Blog 3 Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
  },
  {
    id: 4,
    ownerId: 1,
    title: 'Blog 4',
    content: 'Blog 4 Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
  },
  {
    id: 5,
    ownerId: 2,
    title: 'Blog 5',
    content: 'Blog 5 Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
  },
  {
    id: 6,
    ownerId: 3,
    title: 'Blog 6',
    content: 'Blog 6 Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
  },
  {
    id: 7,
    ownerId: 2,
    title: 'Blog 7',
    content: 'Blog 7 Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
  },
  {
    id: 8,
    ownerId: 1,
    title: 'Blog 8',
    content: 'Blog 8 Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
  },
  {
    id: 9,
    ownerId: 3,
    title: 'Blog 9',
    content: 'Blog 9 Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
  },
  {
    id: 10,
    ownerId: 3,
    title: 'Blog 10',
    content: 'Blog 10 Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
  },
  {
    id: 11,
    ownerId: 1,
    title: 'Blog 11',
    content: 'Blog 11 Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
  },
  {
    id: 12,
    ownerId: 2,
    title: 'Blog 12',
    content: 'Blog 12 Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
  },
];

const getBlogs = (page: number): Blog[] => {
  // console.log('GETTING PAGE: ', page);
  const paged = blogs.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  // console.log('PAGED: ', paged);

  return paged;
  // return blogs;
};

const getBlog = (id: number): Blog | undefined => blogs.find(blog => blog.id === id);

const createBlog = ({ blog, userId }): Blog => {
  // console.log('ADDING BLOG: ', blog, ', for User: ', userId);
  const existingBlog = blogs.find(existingBlog => existingBlog.id === blog.id);
  // console.log('Existing BLOG: ', existingBlog);

  if (existingBlog) {
    throw new Error('Blog already exists');
  }

  const lastBlog = blogs[blogs.length - 1];
  // console.log('LAST BLOG: ', lastBlog);

  blogs.push({
    ...blog,
    id: lastBlog.id + 1,
    ownerId: userId,
  });
  // console.log('RETURNING NEW LIST OF BLOGS: ', blogs);

  return blogs[blogs.length - 1];
};

const updateBlog = ({ blog, userId }): Blog => {
  // console.log('Updating Blog: ', blog, ', for User: ', userId);
  const existingBlog = blogs.find(existingBlog => existingBlog.id === blog.id);

  if (!existingBlog) {
    throw new Error(`No Blog called ${blog.title} exists`);
  }

  if (existingBlog.ownerId !== userId) {
    throw new Error(`User: ${userId} does not own Blog called ${blog.title}`);
  }

  blogs = blogs.map(existingBlog => (existingBlog.id === blog.id ? blog : existingBlog));
  // console.log('UPDATED BLOGS: ', blogs);

  return blog;
};

const deleteBlog = (id: number): void => {
  // console.log('BLOG TO DELETE: ', id);
  const existingBlog = blogs.find(blog => blog.id === id);
  // console.log('FOUND BLOG TO BE DELETED: ', existingBlog);

  if (!existingBlog) {
    throw new Error(`No Blog with id ${id} exists`);
  }

  blogs = blogs.filter(blog => blog.id !== id);
  // console.log('BLOGS AFTER DELETION: ', blogs);
};

export { getBlogs, getBlog, createBlog, updateBlog, deleteBlog };
