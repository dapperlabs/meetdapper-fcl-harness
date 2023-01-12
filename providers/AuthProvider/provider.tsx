import { currentUser, CurrentUserObject, unauthenticate } from '@onflow/fcl';
import { memo, useEffect, useReducer } from 'react';
import { StateContext, DispatchContext, defaultContext } from './context';
import { reducer } from './reducer';

export const getAccountProofService = (
  services: CurrentUserObject['services'],
) => services?.find((s) => s.type === 'account-proof');

export const getOpenIDService = (services: CurrentUserObject['services']) =>
  services?.find((s) => s.type === 'open-id');

type Props = React.PropsWithChildren<{}>;

const Provider = ({ children }: Props) => {
  const [state, dispatch] = useReducer(reducer, { ...defaultContext });

  useEffect(() => {
    return currentUser().subscribe(async (user) => {
      const accountProofService = getAccountProofService(user.services);
      const openIDService = getAccountProofService(user.services);

      if (accountProofService) {
        const response = await fetch('/api/account-proof', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(accountProofService),
        });

        const { accountVerified } = await response.json();

        if (!accountVerified) {
          unauthenticate();
        }
      }

      if (openIDService) {
        const response = await fetch('/api/openID', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(openIDService.data),
        });

        const data = await response.json();

        dispatch({ type: 'setOpenIdData', data });
      } else {
        dispatch({ type: 'setOpenIdData', data: null });
      }

      dispatch({ type: 'setCurrentUser', data: user });
    });
  }, []);

  return (
    <StateContext.Provider value={state}>
      <DispatchContext.Provider value={dispatch}>
        {children}
      </DispatchContext.Provider>
    </StateContext.Provider>
  );
};

export default memo(Provider);
