import { VideoItem } from "shared/types/videos";
import {
  createLoadingStatusSlice,
  LoadingState,
} from "shared/redux/createLoadingStatus";
import { createAsyncActions } from "shared/redux/asyncActionGenarator";

export interface VideoResults {
  items: VideoItem[];
}

export interface SearchState {
  searchTerm: string;
  results: VideoItem[];
  pagination: {};
}

export const initialState: SearchState = {
  searchTerm: "",
  results: [],
  pagination: {},
};

export const videoSearchActions = createAsyncActions<string, any>(
  "videoSearch/api"
);

const searchSlice = createLoadingStatusSlice({
  name: "videoSearch",
  initialState: {
    data: initialState,
  } as LoadingState<SearchState>,
  asyncActions: videoSearchActions,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(videoSearchActions.success, (state, action) => {
      state.data.results = action.payload.items;
    });
  },
});

export const onRequestSearch = searchSlice.actions;

export default searchSlice.reducer;
