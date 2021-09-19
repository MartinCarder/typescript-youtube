import { call, takeLatest, put, SagaReturnType } from "redux-saga/effects";
import { getRequest } from "shared/utils/apiRequest";
import { videoDetailsRelatedActions } from "../relatedSlice";

export function* getRelatedResults(
  action: ReturnType<typeof videoDetailsRelatedActions.request>
) {
  const query = new URLSearchParams({
    part: "snippet",
    maxResults: "50",
    type: "video",
    videoDefinition: "high",
    relatedToVideoId: action.payload,
    videoEmbeddable: "true",
  });

  try {
    const data: SagaReturnType<typeof getRequest> = yield call(
      getRequest,
      "search",
      query
    );
    yield put(videoDetailsRelatedActions.success(data));
  } catch (error) {
    yield put(videoDetailsRelatedActions.failed(error.toString()));
  }
}

export default function* rootRelatedSaga() {
  yield takeLatest(videoDetailsRelatedActions.request.type, getRelatedResults);
}
