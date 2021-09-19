import { call, takeLatest, put } from "redux-saga/effects";
import { videoSearchActions } from "../videoDetailsSlice";
import { getRequest } from "shared/utils/apiRequest";
import { videoDetailsRelatedActions } from "../relatedSlice";

export function* getVideoResults(
  action: ReturnType<typeof videoSearchActions.request>
) {
  const query = new URLSearchParams({
    id: action.payload,
  });
  query.append("part", "snippet");
  query.append("part", "statistics");

  try {
    yield put(videoDetailsRelatedActions.request(action.payload));
    const data = yield call(getRequest, "videos", query);

    if (data.items.length) {
      const { snippet, statistics, id } = data.items[0];
      yield put(
        videoSearchActions.success({
          details: { ...snippet, ...statistics },
          id,
        })
      );
    } else {
      throw new Error("Video not found");
    }
  } catch (error) {
    yield put(videoSearchActions.failed(error.toString()));
  }
}

export default function* rootVideoSaga() {
  yield takeLatest(videoSearchActions.request.type, getVideoResults);
}
