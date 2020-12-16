import { ActionType, createAsyncAction } from "typesafe-actions";
import { VideoItem } from "shared/types/videos";

export interface VideoResults {
  items: VideoItem[];
}

export const onRequestSearch = createAsyncAction(
  "SEARCH_REULTS/GET_SEARCH",
  "SEARCH_REULTS/GET_SEARCH_SUCCESS",
  "SEARCH_REULTS/GET_SEARCH_FAILURE"
)<string, VideoResults, any>();

export type SearchActions = ActionType<typeof onRequestSearch>;
