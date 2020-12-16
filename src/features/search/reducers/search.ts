import { onRequestSearch, SearchActions } from "../actions/search";
import { getType } from "typesafe-actions";
import { VideoItem } from "shared/types/videos";

enum ApiStatus {
  STATUS_INIT = "STATUS_INIT",
  STATUS_ERROR = "STATUS_ERROR",
  STATUS_LOADED = "STATUS_LOADED",
  STATUS_LOADING = "STATUS_LOADING",
}

export interface SearchState {
  status: ApiStatus;
  searchTerm: string;
  results: VideoItem[];
  pagination: {};
  errorMessage: string | undefined;
}

export const initialState: SearchState = {
  status: ApiStatus.STATUS_INIT,
  searchTerm: "",
  results: [],
  pagination: {},
  errorMessage: undefined,
};
const store = (
  state: SearchState = initialState,
  action: SearchActions
): SearchState => {
  switch (action.type) {
    case getType(onRequestSearch.failure):
      return {
        ...initialState,
        status: ApiStatus.STATUS_ERROR,
        errorMessage: action.payload,
      };
    case getType(onRequestSearch.request):
      return {
        ...initialState,
        status: ApiStatus.STATUS_LOADING,
      };
    case getType(onRequestSearch.success):
      return {
        ...state,
        status: ApiStatus.STATUS_LOADED,
        results: action.payload.items,
      };
    default:
      return state;
  }
};

export default store;
