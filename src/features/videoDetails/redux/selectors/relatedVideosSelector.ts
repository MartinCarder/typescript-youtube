import { AppStoreState } from "store/store";

export const getRelatedStatus = (state: AppStoreState) =>
  state.videoDetails.related.status;

export const getRelatedResults = (state: AppStoreState) =>
  state.videoDetails.related.data.results;

export const getRelatedErrorMessage = (state: AppStoreState) =>
  state.videoDetails.related.data.errorMessage;
