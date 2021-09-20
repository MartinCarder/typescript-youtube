import { AppStoreState } from "store/store";

export const getVideoDetailsStatus = (state: AppStoreState) =>
  state.videoDetails.video.status;

export const getVideoDetailsId = (state: AppStoreState) =>
  state.videoDetails.video.data.videoId;

export const getVideoDetails = (state: AppStoreState) =>
  state.videoDetails.video.data.details;

export const getVideoDetailsError = (state: AppStoreState) =>
  state.videoDetails.video.data.errorMessage;
