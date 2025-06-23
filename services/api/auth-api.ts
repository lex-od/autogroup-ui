import {
  AuthResponse,
  AuthError,
  SignInWithPasswordCredentials,
} from '@supabase/supabase-js';
import { useMutation, UseMutationOptions } from '@tanstack/react-query';
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
