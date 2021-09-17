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
  errorMessage: string | undefined;
}

export const initialState: SearchState = {
  searchTerm: "",
  results: [],
  errorMessage: undefined,
};

export const videoSearchActions = createAsyncActions<string, any, string>(
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
    builder.addCase(videoSearchActions.request, (state, action) => {
      state.data.searchTerm = action.payload;
    });
    builder.addCase(videoSearchActions.failed, (state, action) => {
      state.data.errorMessage = action.payload;
    });
  },
});

export const onRequestSearch = searchSlice.actions;

export default searchSlice.reducer;
