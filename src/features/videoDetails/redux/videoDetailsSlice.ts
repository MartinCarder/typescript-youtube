import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ApiStatus } from "shared/types/api.d";
import { Video } from "shared/types/videos.d";

export interface VideoDetailsState {
  status: ApiStatus;
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
  status: ApiStatus.STATUS_INIT,
  videoId: "",
  details: videoEmpty,
  errorMessage: undefined,
};

const videoDetailsSlice = createSlice({
  name: "videoDetails",
  initialState,
  reducers: {
    success: (state, action: PayloadAction<VideoLoaded>) => {
      state.status = ApiStatus.STATUS_LOADED;
      state.details = action.payload.details;
      state.videoId = action.payload.id;
    },
    request: (state, action: PayloadAction<string>) => {
      state.status = ApiStatus.STATUS_LOADING;
      state.videoId = action.payload;
      state.details = videoEmpty;
    },
    failure: (state, action: PayloadAction<any>) => {
      state.status = ApiStatus.STATUS_ERROR;
      state.errorMessage = action.payload;
    },
  },
});

export const onRequestVideo = videoDetailsSlice.actions;

export default videoDetailsSlice.reducer;
