import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { createAsyncActions } from "shared/redux/asyncActionGenarator";
import {
  createLoadingStatusSlice,
  LoadingState,
} from "shared/redux/createLoadingStatus";
import { ApiStatus } from "shared/types/api.d";
import { Video } from "shared/types/videos.d";

export interface VideoDetailsState {
  videoId: string;
  details: Video;
  errorMessage: string | undefined;
}

export interface VideoLoaded {
  details: Video;
  id: string;
}

const videoEmpty = {
  publishedAt: "",
  channelId: "",
  title: "",
  description: "",
  channelTitle: "",
  viewCount: "",
  likeCount: "",
  dislikeCount: "",
};

export const initialState: VideoDetailsState = {
  videoId: "",
  details: videoEmpty,
  errorMessage: undefined,
};

export const videoSearchActions = createAsyncActions<string, any, string>(
  "videoDetails/api"
);

const videoDetailsSlice = createLoadingStatusSlice({
  name: "videoSearch",
  initialState: {
    data: initialState,
  } as LoadingState<VideoDetailsState>,
  asyncActions: videoSearchActions,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(videoSearchActions.success, (state, action) => {
      state.data.details = action.payload.details;
      state.data.videoId = action.payload.id;
    });
    builder.addCase(videoSearchActions.request, (state, action) => {
      state.data.videoId = action.payload;
    });
    builder.addCase(videoSearchActions.failed, (state, action) => {
      state.data.errorMessage = action.payload;
    });
  },
});

export default videoDetailsSlice.reducer;
