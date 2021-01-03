import { VideoItem } from "shared/types/videos";
import { ApiStatus } from "shared/types/api.d";
import {
  createSlice,
  PayloadAction,
  ValidateSliceCaseReducers,
  SliceCaseReducers,
} from "@reduxjs/toolkit";

export interface VideoResults {
  items: VideoItem[];
}

export interface SearchState {
  status: ApiStatus;
  searchTerm: string;
  results: VideoItem[];
  pagination: {};
  errorMessage: string | undefined;
}

export const initialState: SearchState = {
  status: ApiStatus.STATUS_INIT,
  searchTerm: "",
  results: [],
  pagination: {},
  errorMessage: undefined,
};

const searchSlice = createSlice({
  name: "videoSearch",
  initialState,
  reducers: {
    success: (state, action: PayloadAction<VideoResults>) => {
      state.status = ApiStatus.STATUS_LOADED;
      state.results = action.payload.items;
    },
    request: (state, action: PayloadAction<string>) => {
      state.status = ApiStatus.STATUS_LOADING;
      state.results = [];
    },
    failure: (state, action: PayloadAction<any>) => {
      state.status = ApiStatus.STATUS_ERROR;
      state.errorMessage = action.payload;
    },
  },
});

export const onRequestSearch = searchSlice.actions;

export default searchSlice.reducer;

interface GenericState<T> {
  data: T;
  status: "loading" | "finished" | "error";
}

interface Temp {
  temp: {
    one: number;
  };
}

interface Gen2 {
  status: "loading" | "finished" | "error";
}
const createGenericSlice = <T, Reducers extends SliceCaseReducers<Gen2 & T>>({
  name = "",
  initialState,
  reducers,
}: {
  name: string;
  initialState: Gen2 & T;
  reducers: ValidateSliceCaseReducers<Gen2 & T, Reducers>;
}) => {
  return createSlice({
    name,
    initialState,
    reducers: {
      start(state) {
        state.status = "loading";
      },
      /**
       * If you want to write to values of the state that depend on the generic
       * (in this case: `state.data`, which is T), you might need to specify the
       * State type manually here, as it defaults to `Draft<GenericState<T>>`,
       * which can sometimes be problematic with yet-unresolved generics.
       * This is a general problem when working with immer's Draft type and generics.
       */
      success(state: Gen2, action: PayloadAction<T>) {
        // state.data = action.payload
        state.status = "finished";
      },
      ...reducers,
    },
  });
};

interface Temp2 {
  pag: number[];
  car: string;
}

const wrappedSlice = createGenericSlice({
  name: "test",
  initialState: { status: "loading" } as Gen2 & Temp2,
  reducers: {
    success(state, action) {
      // state.data = action.payload
      // state.
      //state.
    },
  },
});

function fun<T>(args: T): T {
  return args;
}

let result = fun("Hello World");

let result2 = fun(200);
