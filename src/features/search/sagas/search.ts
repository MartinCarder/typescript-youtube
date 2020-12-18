import { call, takeLatest, put } from "redux-saga/effects";
import { getType, ActionType } from "typesafe-actions";
import { onRequestSearch } from "../actions/search";
import { getRequest } from "shared/utils/apiRequest";

const API_KEY = "AIzaSyBbgYGslTSXbBK0ZrMMVWbqjQl7FfwprJs";
const SEARCH_END_POINT = "https://youtube.googleapis.com/youtube/v3/search";

const fetchSearch = async (searchTerm: string) => {
  let query = {
    part: "snippet",
    maxResults: "50",
    type: "video",
    videoDefinition: "high",
    q: searchTerm,
  };

  const qs = new URLSearchParams(query);

  const request = await fetch(`${SEARCH_END_POINT}?${qs}`, {
    method: "get",
  });

  if (request.status !== 200)
    throw new Error(`Error status code ${request.status}`);

  const data = await request.json();

  return data;
};

export function* getSearchResults(
  action: ActionType<typeof onRequestSearch.request>
) {
  const query = {
    part: "snippet",
    maxResults: "50",
    type: "video",
    videoDefinition: "high",
    q: action.payload,
  };
  try {
    const data = yield call(getRequest, "search", query);
    yield put(onRequestSearch.success(data));
  } catch (error) {
    yield put(onRequestSearch.failure(error.toString()));
  }
}

export default function* rootSearchSaga() {
  yield takeLatest(getType(onRequestSearch.request), getSearchResults);
}
