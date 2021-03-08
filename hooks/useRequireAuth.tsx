import { useEffect } from 'react';

import { useRouter } from 'next/router';

import { useAuth } from './useAuth';

export const useRequireAuth = () => {
  const auth = useAuth();
  const router = useRouter();
  useEffect(() => {
    if (auth.user === null) {
      router.push({ pathname: '/login', query: { message: 'Please log in first to browse Blog' } });
    }
  }, [auth, router]);

  return auth;
};
