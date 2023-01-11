import { currentUser } from "@onflow/fcl";
import { memo, ReactNode, useEffect, useReducer } from "react";
import { StateContext, DispatchContext, defaultContext } from "./context";
import { reducer } from "./reducer";

interface Props {
  children?: ReactNode;
}

const Provider = ({ children }: Props) => {
  const [state, dispatch] = useReducer(reducer, { ...defaultContext });

  useEffect(() => {
    return currentUser().subscribe((user) => {
      dispatch({ type: "setCurrentUser", data: user });
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
