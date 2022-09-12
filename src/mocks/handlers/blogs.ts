import { rest } from 'msw';

import { createBlog, deleteBlog, getBlog, getBlogs, updateBlog } from '~/mocks/fixtures/blogs';

const URL_PATH = '*/api/blogs';

const getBlogsHandler = rest.get(URL_PATH, (req, res, ctx) => {
  const page = req.url.searchParams.get('page');
  // console.log('GET BLOGS PARAMS: ', page);
  return res(ctx.status(200), ctx.json(getBlogs(+page)));
});

const getBlogHandler = rest.get(`${URL_PATH}/:id`, (req, res, ctx) =>
  res(ctx.status(200), ctx.json(getBlog(+req.params.id))),
);

const createBlogHandler = rest.post(URL_PATH, (req, res, ctx) => {
  console.log('CREATE BODY: ', req.body);
  return res(ctx.status(200), ctx.json(createBlog(JSON.parse(req.body))));
});

const updateBlogHandler = rest.put(`${URL_PATH}/:id`, (req, res, ctx) => {
  // console.log('UPDAT BODY: ', req.body, req.params.id);
  return res(ctx.status(200), ctx.json(updateBlog(JSON.parse(req.body))));
});

const deleteBlogHandler = rest.delete(`${URL_PATH}/:id`, (req, res, ctx) => {
  // console.log('DELETING BLOG: ', req.params);
  deleteBlog(+req.params.id);

  return res(ctx.status(200), ctx.json(getBlogs()));
});

const handlers = [getBlogsHandler, getBlogHandler, createBlogHandler, updateBlogHandler, deleteBlogHandler];

export default handlers;
