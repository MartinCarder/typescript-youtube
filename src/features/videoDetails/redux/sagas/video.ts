import { call, takeLatest, put } from "redux-saga/effects";
import { onRequestVideo } from "../videoDetailsSlice";
import { getRequest } from "shared/utils/apiRequest";

export function* getVideoResults(
  action: ReturnType<typeof onRequestVideo.request>
) {
  const query = new URLSearchParams({
    id: action.payload,
  });
  query.append("part", "snippet");
  query.append("part", "statistics");

  try {
    const data = yield call(getRequest, "videos", query);

    if (data.items.length) {
      const { snippet, statistics, id } = data.items[0];
      yield put(
        onRequestVideo.success({ details: { ...snippet, ...statistics }, id })
      );
    } else {
      throw new Error("Video not found");
    }
  } catch (error) {
    yield put(onRequestVideo.failure(error.toString()));
  }
}

export default function* rootVideoSaga() {
  yield takeLatest(onRequestVideo.request.type, getVideoResults);
}
