import { User } from '~/accounts/useUser';

const user: User = {
  id: 1,
  firstName: 'John',
  surname: 'Smith',
  dateOfBirth: new Date('2000-01-01').toISOString(),
};

const getUser = (): User => user;

export { getUser };
