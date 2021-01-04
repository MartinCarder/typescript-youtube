import { render } from "@testing-library/react";
import React from "react";
import MockDate from "mockdate";
import { VideoItem } from "./videoItem";
import { SearchVideoItem1 } from "mocks/search/searchMocks";

describe("VideoItem", () => {
  const { snippet } = SearchVideoItem1;

  const buildVideoItem = () =>
    render(
      <VideoItem
        videoTitle={snippet.title}
        videoImage={snippet.thumbnails.high.url}
        videDescription={snippet.description}
        videoChannel={snippet.channelTitle}
        videoPublished={snippet.publishedAt}
      />
    );

  it("Displays image", async () => {
    const result = buildVideoItem();
    const videoImg = await result.findByTestId("videoItemImg");
    expect(videoImg.getAttribute("src")).toEqual(snippet.thumbnails.high.url);
  });

  it("Displays Title", async () => {
    const result = buildVideoItem();
    const title = await result.findByTestId("videoItemTitle");
    expect(title).toHaveTextContent(snippet.title);
  });

  it("Displays description", async () => {
    const result = buildVideoItem();
    const description = await result.findByTestId("videoItemDescription");
    expect(description).toHaveTextContent(snippet.description);
  });

  it("Displays channel", async () => {
    const result = buildVideoItem();
    const channel = await result.findByTestId("videoItemChannel");
    expect(channel).toHaveTextContent(snippet.channelTitle);
  });

  it("Displays published date", async () => {
    MockDate.set("2021-01-02T11:30:00Z");
    const result = buildVideoItem();
    const published = await result.findByTestId("videoItemPublished");
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
      />
    );

    const published = result.queryByTestId("videoItemPublished");
    expect(published).toBeNull();
  });
});
