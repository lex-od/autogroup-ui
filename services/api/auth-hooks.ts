import { axiosBase } from '@/lib/axios-config';
import { useMutation, UseMutationOptions } from '@tanstack/react-query';

interface LoginParams {
  email: string;
  password: string;
}
interface LoginResponse {
  token: string;
}

export const useLoginMutation = (
  mutationOptions?: UseMutationOptions<LoginResponse, Error, LoginParams>,
) => {
  return useMutation({
    mutationFn: async (params) => {
      const { data } = await axiosBase.post('/hello/login', params);
      return data;
    },
    ...mutationOptions,
  });
};
