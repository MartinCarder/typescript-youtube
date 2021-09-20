import React from "react";
import { VideoDetails } from "./videoDetails";
import { render } from "testHelps";
import { videoSearchActions } from "../redux/videoDetailsSlice";
import { waitFor } from "@testing-library/react";
import { ApiStatus } from "shared/types/api.d";
import { videoDetailsMock } from "mocks/videoDetails/videoMock";

describe("VideoDetails", () => {
  const stateWithResults = {
    status: ApiStatus.STATUS_LOADED,
    data: {
      videoId: "12345",
      details: videoDetailsMock,
      errorMessage: undefined,
    },
  };
  it("dispatches search action with correct video id", async () => {
    const videoId = "12345";
    const result = render(<VideoDetails />, {
      route: [`/video/${videoId}`],
      path: "/video/:videoId",
    });

    await waitFor(() => {
      expect(result.dispatchSpy).toBeCalledWith(
        videoSearchActions.request(videoId)
      );
    });
  });

  it("Displays video details", () => {
    const videoId = "12345";
    const result = render(<VideoDetails />, {
      initalState: { videoDetails: { video: stateWithResults } },
    });

    expect(result.getByText(videoDetailsMock.title)).toBeInTheDocument();

    expect(result.getByTestId("count")).toHaveTextContent(
      `view count ${videoDetailsMock.viewCount}`
    );

    expect(result.getByTestId("likes")).toHaveTextContent(
      `${videoDetailsMock.likeCount}`
    );

    expect(result.getByTestId("dislikes")).toHaveTextContent(
      `${videoDetailsMock.dislikeCount}`
    );

    expect(result.getByTestId("published")).toHaveTextContent(
      `published ${videoDetailsMock.publishedAt}`
    );

    expect(result.getByTestId("description")).toHaveTextContent(
      `${videoDetailsMock.description}`
    );
  });
});
