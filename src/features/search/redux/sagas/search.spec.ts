import { expectSaga } from "redux-saga-test-plan";
import * as matchers from "redux-saga-test-plan/matchers";
import { throwError } from "redux-saga-test-plan/providers";
import { getRequest } from "shared/utils/apiRequest";
import { SearchVideoItem1, SearchVideoItem2 } from "mocks/search/searchMocks";
import searchRoot from "./search";
import { videoSearchActions } from "../search";

describe("Search saga", () => {
  const searchTerm = "videos about react";
  const results = {
    items: [SearchVideoItem1, SearchVideoItem2],
  };

  it("fetchs video results", () => {
    return expectSaga(searchRoot)
      .provide([[matchers.call.fn(getRequest), results]])

      .put(videoSearchActions.success(results))
      .dispatch(videoSearchActions.request(searchTerm))
      .silentRun();
  });

  it("Fires fail action api error", () => {
    const errorMessage = "Oh no an error!";
    const error = new Error(errorMessage);

    return expectSaga(searchRoot)
      .provide([[matchers.call.fn(getRequest), throwError(error)]])

      .put(videoSearchActions.failed(error.toString()))
      .dispatch(videoSearchActions.request(searchTerm))
      .silentRun();
  });
});
