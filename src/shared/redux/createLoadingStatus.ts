import {
  createSlice,
  SliceCaseReducers,
  ValidateSliceCaseReducers,
  ActionReducerMapBuilder,
  AsyncThunkPayloadCreator,
  AsyncThunkOptions,
  isAnyOf,
} from "@reduxjs/toolkit";
import { ApiStatus } from "shared/types/api.d";
import { AsyncActions } from "shared/redux/asyncActionGenarator";

export interface LoadingState<T> {
  data: T;
  status: ApiStatus;
}

export const initialLoadingState = {
  status: ApiStatus.STATUS_INIT,
};

export type thunkArgs = {
  typePrefix: string;
  payloadCreator: AsyncThunkPayloadCreator<any, any, any>;
  options?: AsyncThunkOptions<any, any>;
};

export const createLoadingStatusSlice = <
  T,
  Reducers extends SliceCaseReducers<LoadingState<T>>
>({
  name = "",
  initialState,
  reducers,
  asyncActions,
  extraReducers,
}: {
  name: string;
  asyncActions: AsyncActions<any, any, any>;
  initialState: LoadingState<T>;
  reducers: ValidateSliceCaseReducers<LoadingState<T>, Reducers>;
  extraReducers?: (builder: ActionReducerMapBuilder<LoadingState<T>>) => void;
}) => {
  return createSlice({
    name,
    initialState: {
      ...initialLoadingState,
      ...initialState,
    },
    reducers: {
      ...reducers,
    },
    extraReducers: (builder) => {
      if (extraReducers) {
        extraReducers(builder);
      }
      builder.addMatcher(isAnyOf(asyncActions.success), (state, action) => {
        state.status = ApiStatus.STATUS_LOADED;
      });
      builder.addMatcher(isAnyOf(asyncActions.request), (state, action) => {
        state.status = ApiStatus.STATUS_LOADING;
      });
      builder.addMatcher(isAnyOf(asyncActions.failed), (state, action) => {
        state.status = ApiStatus.STATUS_ERROR;
      });
    },
  });
};
