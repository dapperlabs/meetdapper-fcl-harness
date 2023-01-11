declare type ReducerAction<T, P = {}> = {
  type: T;
  data: P;
};

declare type DispatchReducer<A> = (action: A) => void | Promise<any>;
