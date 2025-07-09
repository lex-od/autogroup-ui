import {
  AuthResponse,
  AuthError,
  SignInWithPasswordCredentials,
  UserResponse,
} from '@supabase/supabase-js';
import {
  useMutation,
  UseMutationOptions,
  useQuery,
  UseQueryOptions,
} from '@tanstack/react-query';
import { supabase } from '@/lib/supabase-config';

export const useLoginMutation = (
  mutationOptions?: UseMutationOptions<
    AuthResponse['data'],
    AuthError,
    SignInWithPasswordCredentials
  >,
) => {
  return useMutation({
    mutationFn: async (params) => {
      const { data, error } = await supabase.auth.signInWithPassword(params);
      if (error) {
        throw error;
      }
      return data;
    },
    ...mutationOptions,
  });
};

export const useLogoutMutation = (
  mutationOptions?: UseMutationOptions<void, AuthError>,
) => {
  return useMutation({
    mutationFn: async () => {
      const { error } = await supabase.auth.signOut();
      if (error) {
        throw error;
      }
    },
    ...mutationOptions,
  });
};

export const useCurrentUserQuery = (
  queryOptions?: Partial<UseQueryOptions<UserResponse['data'], AuthError>>,
) => {
  return useQuery({
    queryKey: ['current-user'],
    queryFn: async () => {
      const { data, error } = await supabase.auth.getUser();
      if (error) throw error;

      return data;
    },
    staleTime: Infinity,
    ...queryOptions,
  });
};
