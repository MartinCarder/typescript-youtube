import { AppStoreState } from "store/store";

export const getRelatedStatus = (state: AppStoreState) =>
  state.relatedVideos.status;

export const getRelatedResults = (state: AppStoreState) =>
  state.relatedVideos.data.results;

export const getRelatedErrorMessage = (state: AppStoreState) =>
  state.relatedVideos.data.errorMessage;
