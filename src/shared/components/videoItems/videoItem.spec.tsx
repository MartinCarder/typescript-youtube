import { render, fireEvent } from "@testing-library/react";
import React from "react";
import MockDate from "mockdate";
import { VideoItem } from "./videoItems";
import { SearchVideoItem1 } from "mocks/search/searchMocks";

describe("VideoItem", () => {
  const { snippet, id } = SearchVideoItem1;

  const buildVideoItem = () =>
    render(
      <VideoItem
        videoTitle={snippet.title}
        videoImage={snippet.thumbnails.high.url}
        videDescription={snippet.description}
        videoChannel={snippet.channelTitle}
        videoPublished={snippet.publishedAt}
        videoId={id.videoId}
        onSelection={jest.fn()}
      />
    );

  it("Displays image", () => {
    const result = buildVideoItem();
    const videoImg = result.getByTestId("videoItemImg");
    expect(videoImg.getAttribute("src")).toEqual(snippet.thumbnails.high.url);
  });

  it("Displays Title", () => {
    const result = buildVideoItem();
    const title = result.getByTestId("videoItemTitle");
    expect(title).toHaveTextContent(snippet.title);
  });

  it("Displays description", () => {
    const result = buildVideoItem();
    const description = result.getByTestId("videoItemDescription");
    expect(description).toHaveTextContent(snippet.description);
  });

  it("Displays channel", () => {
    const result = buildVideoItem();
    const channel = result.getByTestId("videoItemChannel");
    expect(channel).toHaveTextContent(snippet.channelTitle);
  });

  it("Displays published date", () => {
    MockDate.set("2021-01-02T11:30:00Z");
    const result = buildVideoItem();
    const published = result.getByTestId("videoItemPublished");
    expect(published).toHaveTextContent("2 days ago");
  });

  it("Don't display publish date if invalid", () => {
    const result = render(
      <VideoItem
        videoTitle={snippet.title}
        videoImage={snippet.thumbnails.high.url}
        videDescription={snippet.description}
        videoChannel={snippet.channelTitle}
        videoPublished={"abc"}
        videoId={id.videoId}
        onSelection={jest.fn()}
      />
    );

    const published = result.queryByTestId("videoItemPublished");
    expect(published).toBeNull();
  });

  it("Fires onSelection callback on click with correct video id", () => {
    const onSelectionMock = jest.fn();
    const result = render(
      <VideoItem
        videoTitle={snippet.title}
        videoImage={snippet.thumbnails.high.url}
        videDescription={snippet.description}
        videoChannel={snippet.channelTitle}
        videoPublished={"abc"}
        videoId={id.videoId}
        onSelection={onSelectionMock}
      />
    );

    fireEvent.click(result.getByTestId("videoItemImg"));

    expect(onSelectionMock).nthCalledWith(1, id.videoId);
  });
});
