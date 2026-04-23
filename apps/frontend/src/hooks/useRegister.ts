import { useMutation, useQueryClient } from '@tanstack/react-query';
import { registerUser } from '@/lib/api';

/**
 * React Query mutation hook for user registration.
 * On success, invalidates the waitlist count query so the counter updates immediately.
 */
export const useRegister = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: registerUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['waitlistCount'] });
    },
  });
};
