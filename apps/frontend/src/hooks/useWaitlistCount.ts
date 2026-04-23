import { useQuery } from '@tanstack/react-query';
import { fetchWaitlistCount } from '@/lib/api';

/**
 * React Query hook to fetch the current waitlist count.
 * Refetches every 30 seconds to keep the counter live.
 */
export const useWaitlistCount = () => {
  return useQuery({
    queryKey: ['waitlistCount'],
    queryFn: fetchWaitlistCount,
    refetchInterval: 30_000,
    staleTime: 10_000,
  });
};
