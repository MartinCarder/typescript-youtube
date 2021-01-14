import React from "react";
import { within } from "@testing-library/react";
import MockDate from "mockdate";
import { render } from "testHelps";
import { ApiStatus } from "shared/types/api.d";
import { Search } from "./search";
import { initialState as searchInitialState } from "../redux/search";
import { SearchVideoItem1, SearchVideoItem2 } from "mocks/search/searchMocks";

describe("Search", () => {
  const stateWithResults = {
    ...searchInitialState,
    status: ApiStatus.STATUS_LOADED,
    results: [SearchVideoItem1, SearchVideoItem2],
  };

  it("displays correct number of serch items", () => {
    const result = render(<Search />, {
      initalState: { search: stateWithResults },
    });

    const videoItems = result.getAllByTestId("result-item");

    expect(videoItems.length).toEqual(2);
  });

  it("passes correct data on to VideoItem component", () => {
    MockDate.set("2021-01-06T11:30:00Z");
    const { snippet } = SearchVideoItem2;
    const result = render(<Search />, {
      initalState: { search: stateWithResults },
    });

    const secondVideoItem = result.getAllByTestId("result-item")[1];

    const videoImg = within(secondVideoItem).getByTestId("videoItemImg");
    expect(videoImg.getAttribute("src")).toEqual(snippet.thumbnails.high.url);

    const title = within(secondVideoItem).getByTestId("videoItemTitle");
    expect(title).toHaveTextContent(snippet.title);

    const description = within(secondVideoItem).getByTestId(
      "videoItemDescription"
    );
    expect(description).toHaveTextContent(snippet.description);

    const channel = within(secondVideoItem).getByTestId("videoItemChannel");
    expect(channel).toHaveTextContent(snippet.channelTitle);

    const published = within(secondVideoItem).getByTestId("videoItemPublished");
    expect(published).toHaveTextContent("2 days ago");
  });
});
