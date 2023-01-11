import { useCallback } from "react";
import { authenticate, unauthenticate } from "@onflow/fcl";
import { useAuthContext } from "providers/AuthProvider/context";

export function useAuth() {
  const [{ isLoggedIn, provider, address, balance }] = useAuthContext();

  const logIn = useCallback(async () => {
    return await authenticate();
  }, []);

  const logOut = useCallback(async () => {
    return unauthenticate();
  }, []);

  return { logIn, logOut, isLoggedIn, provider, address, balance };
}
