import { AppStoreState } from "store/store";

export const getSearchStatus = (state: AppStoreState) => state.search.status;

export const getSearchResults = (state: AppStoreState) =>
  state.search.data.results;

export const getSearchErrorMessage = (state: AppStoreState) =>
  state.search.data.errorMessage;
