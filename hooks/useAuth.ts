import { useCallback } from 'react';
import { authenticate, unauthenticate } from '@onflow/fcl';
import { useAuthContext } from 'providers/AuthProvider/context';

export function useAuth() {
  const [context, dispatch] = useAuthContext();

  const logIn = useCallback(async () => {
    try {
      dispatch({ type: 'setIsAuthenticating', data: true });

      return await authenticate();
    } finally {
      dispatch({ type: 'setIsAuthenticating', data: false });
    }
  }, []);

  const logOut = useCallback(async () => {
    return unauthenticate();
  }, []);

  return { logIn, logOut, ...context };
}
