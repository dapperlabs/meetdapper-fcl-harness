import { CurrentUserObject } from '@onflow/fcl';
import produce from 'immer';
import { AuthContext } from './context';

export type AuthContextAction =
  | ReducerAction<'setCurrentUser', CurrentUserObject | null>
  | ReducerAction<'setOpenIdData', Record<string, any> | null>
  | ReducerAction<'setIsAuthenticating', boolean>;

export const reducer = produce(
  (state: AuthContext, action: AuthContextAction) => {
    switch (action.type) {
      case 'setCurrentUser':
        state.currentUser = action.data;
        state.isLoggedIn = !!action.data?.loggedIn;
        state.address = action.data?.addr;
        state.provider = action.data?.services.find(
          (service) => !!service.provider,
        )?.provider;

        return state;

      case 'setIsAuthenticating':
        state.isAuthenticating = action.data;

        return state;
      case 'setOpenIdData':
        state.openid = action.data;

        return state;
    }
  },
);

export type AuthDispatch = DispatchReducer<AuthContextAction>;
