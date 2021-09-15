import { call, takeLatest, put } from "redux-saga/effects";
import { getRequest } from "shared/utils/apiRequest";
import { videoSearchActions } from "features/search/redux/search";

export function* getSearchResults(
  action: ReturnType<typeof videoSearchActions.request>
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
    yield put(videoSearchActions.success(data));
  } catch (error) {
    yield put(videoSearchActions.failed());
  }
}

export default function* rootSearchSaga() {
  yield takeLatest(videoSearchActions.request.type, getSearchResults);
}
