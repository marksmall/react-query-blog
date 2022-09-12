import { rest } from 'msw';

import { getUser } from '~/mocks/fixtures/accounts';

const URL_PATH = '*/api/user';

const getUserHandler = rest.get(URL_PATH, (req, res, ctx) => {
  return res(ctx.status(200), ctx.json(getUser()));
});

const handlers = [getUserHandler];

export default handlers;
