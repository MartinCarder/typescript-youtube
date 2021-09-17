import reducer, { videoSearchActions, initialState } from "./videoDetailsSlice";
import { ApiStatus } from "shared/types/api.d";
import {
  getVideoDetailsStatus,
  getVideoDetailsError,
  getVideoDetailsId,
  getVideoDetails,
} from "./selectors/videoDetailsSelectors";
import { videoDetailsMock } from "mocks/videoDetails/videoMock";
import { initialLoadingState } from "shared/redux/createLoadingStatus";

describe("videoDetailsSlice", () => {
  const initState = {
    data: initialState,
    ...initialLoadingState,
  };
  it("Load init state by default", () => {
    const detailsReducer = reducer(undefined, { type: "" });
    expect(detailsReducer).toEqual(initState);
  });

  it("onRequestVideo.failure sets correct error message and status", () => {
    const errorMessage = "oh no an error!";

    const detailsReducer = reducer(
      initState,
      videoSearchActions.failed(errorMessage)
    );

    expect(getVideoDetailsStatus({ videoDetails: detailsReducer })).toEqual(
      ApiStatus.STATUS_ERROR
    );

    expect(getVideoDetailsError({ videoDetails: detailsReducer })).toEqual(
      errorMessage
    );
  });

  it("onRequestVideo.success sets correct status and adds data to reducer", () => {
    const id = "1234567";
    const detailsReducer = reducer(
      initState,
      videoSearchActions.success({ id, details: videoDetailsMock })
    );

    const state = {
      videoDetails: detailsReducer,
    };

    expect(getVideoDetailsId(state)).toEqual(id);

    expect(getVideoDetails(state)).toEqual(videoDetailsMock);

    expect(getVideoDetailsStatus(state)).toEqual(ApiStatus.STATUS_LOADED);
  });

  it("onRequestVideo.requests sets correct status", () => {
    const id = "1234567";
    const detailsReducer = reducer(initState, videoSearchActions.request(id));

    const state = {
      videoDetails: detailsReducer,
    };

    expect(getVideoDetailsId(state)).toEqual(id);

    expect(getVideoDetailsStatus(state)).toEqual(ApiStatus.STATUS_LOADING);
  });
});
