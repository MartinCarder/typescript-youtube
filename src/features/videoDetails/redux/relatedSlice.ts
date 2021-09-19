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

export const videoDetailsRelatedActions = createAsyncActions<
  string,
  any,
  string
>("videoDetailsRelated/api");

const relatedSlice = createLoadingStatusSlice({
  name: "videoDetailsRelated",
  initialState: {
    data: initialState,
  } as LoadingState<SearchState>,
  asyncActions: videoDetailsRelatedActions,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(videoDetailsRelatedActions.success, (state, action) => {
      state.data.results = action.payload.items.filter(
        (video: any) => !!video?.snippet
      );
    });
    builder.addCase(videoDetailsRelatedActions.request, (state, action) => {
      state.data.searchTerm = action.payload;
    });
    builder.addCase(videoDetailsRelatedActions.failed, (state, action) => {
      state.data.errorMessage = action.payload;
    });
  },
});

export default relatedSlice.reducer;
