import { expectSaga } from "redux-saga-test-plan";
import * as matchers from "redux-saga-test-plan/matchers";
import { throwError } from "redux-saga-test-plan/providers";
import { getRequest } from "shared/utils/apiRequest";
import rootVideoSaga from "./video";
import { videoSearchActions } from "../videoDetailsSlice";

describe("video saga", () => {
  const id = "123";

  const snippet = {
    publishedAt: "465646465",
    channelId: "234",
    title: "New video",
    description: "A very New Video",
    channelTitle: "New stuff",
  };

  const statistics = {
    viewCount: "100",
    likeCount: "4",
    dislikeCount: "2",
  };

  it("fetchs video results", () => {
    return expectSaga(rootVideoSaga)
      .provide([
        [
          matchers.call.fn(getRequest),
          { items: [{ id, snippet, statistics }] },
        ],
      ])

      .put(
        videoSearchActions.success({
          id,
          details: { ...snippet, ...statistics },
        })
      )
      .dispatch(videoSearchActions.request(id))
      .silentRun();
  });

  it("Fires fail action api error", () => {
    const errorMessage = "Oh no an error!";
    const error = new Error(errorMessage);

    return expectSaga(rootVideoSaga)
      .provide([[matchers.call.fn(getRequest), throwError(error)]])

      .put(videoSearchActions.failed(error.toString()))
      .dispatch(videoSearchActions.request(id))
      .silentRun();
  });
});
