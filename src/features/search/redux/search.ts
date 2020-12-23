import { ActionType, createAsyncAction } from "typesafe-actions";
import { VideoItem } from "shared/types/videos";
import { getType } from "typesafe-actions";
import { ApiStatus } from "shared/types/api.d";

export interface VideoResults {
  items: VideoItem[];
}

export const onRequestSearch = createAsyncAction(
  "SEARCH_REULTS/GET_SEARCH",
  "SEARCH_REULTS/GET_SEARCH_SUCCESS",
  "SEARCH_REULTS/GET_SEARCH_FAILURE"
)<string, VideoResults, any>();

export type SearchActions = ActionType<typeof onRequestSearch>;

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
const reducer = (
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

export default reducer;
