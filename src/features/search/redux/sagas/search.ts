import { call, takeLatest, put, SagaReturnType } from "redux-saga/effects";
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
    const data: SagaReturnType<typeof getRequest> = yield call(
      getRequest,
      "search",
      query
    );
    yield put(videoSearchActions.success(data));
  } catch (error) {
    yield put(videoSearchActions.failed(error.toString()));
  }
}

export default function* rootSearchSaga() {
  yield takeLatest(videoSearchActions.request.type, getSearchResults);
}
