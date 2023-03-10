import { CurrentUserObject, WalletProvider } from '@onflow/fcl';
import { createContext, useContext } from 'react';
import { AuthDispatch } from './reducer';

export type AuthContext = {
  currentUser: CurrentUserObject | null;
  isLoggedIn: boolean;
  provider: WalletProvider | undefined;
  address?: string | null;
  openid: Record<string, any> | null;
  isAuthenticating: boolean;
};

export const defaultContext: AuthContext = {
  currentUser: null,
  isLoggedIn: false,
  provider: undefined,
  address: '',
  openid: null,
  isAuthenticating: false,
};

export const StateContext = createContext<AuthContext>(defaultContext);
export const DispatchContext = createContext<AuthDispatch | undefined>(
  undefined,
);

export function useAuthContext(): [AuthContext, AuthDispatch] {
  const context = useContext(StateContext);
  const dispatch = useContext(DispatchContext);
  return [context, dispatch!];
}
