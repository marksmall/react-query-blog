import { useQuery } from '@tanstack/react-query';
import { z } from 'zod';

export const UserData = z.object({
  id: z.number(),
  firstName: z.string(),
  surname: z.string(),
  dateOfBirth: z.string(),
});

export type User = z.infer<typeof UserData>;

const USERS_API = '/api/user';

export const useUser = () =>
  useQuery(
    ['user'],
    async () => {
      const response = await fetch(USERS_API);

      if (!response.ok) {
        throw new Error('Some error message');
      }

      const data = await response.json();

      return UserData.parse(data);
    },
    {
      retry: 5,
    },
  );
