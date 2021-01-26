import { call, takeLatest, put } from "redux-saga/effects";
import { onRequestSearch } from "../search";
import { getRequest } from "shared/utils/apiRequest";

export function* getSearchResults(
  action: ReturnType<typeof onRequestSearch.request>
) {
  const query = new URLSearchParams({
    part: "snippet",
    maxResults: "50",
    type: "video",
    videoDefinition: "high",
    q: action.payload,
  });

  try {
    const data = yield call(getRequest, "search", query);
    yield put(onRequestSearch.success(data));
  } catch (error) {
    yield put(onRequestSearch.failure(error.toString()));
  }
}

export default function* rootSearchSaga() {
  yield takeLatest(onRequestSearch.request.type, getSearchResults);
}
