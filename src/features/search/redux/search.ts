import { VideoItem } from "shared/types/videos";
import { ApiStatus } from "shared/types/api.d";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

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
