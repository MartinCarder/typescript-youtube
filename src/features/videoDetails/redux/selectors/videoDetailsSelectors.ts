import { AppStoreState } from "store/store";

export const getVideoDetailsStatus = (state: AppStoreState) =>
  state.videoDetails.status;

export const getVideoDetailsId = (state: AppStoreState) =>
  state.videoDetails.videoId;

export const getVideoDetails = (state: AppStoreState) =>
  state.videoDetails.details;
