import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { axiosBase } from '@/lib/axios-config';

type HelloUser = {
  id: string;
  name: string;
  email: string;
};

export const useHelloUsersQuery = (
  queryOptions?: Partial<UseQueryOptions<HelloUser[]>>,
) => {
  return useQuery({
    queryKey: ['hello-users'],
    queryFn: async () => {
      const { data } = await axiosBase('/hello/users');
      return data;
    },
    ...queryOptions,
  });
};
