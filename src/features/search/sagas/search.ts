import { call, takeLatest, put } from "redux-saga/effects";
import { getType, ActionType } from "typesafe-actions";
import { onRequestSearch } from "../redux/search";
import { getRequest } from "shared/utils/apiRequest";

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
