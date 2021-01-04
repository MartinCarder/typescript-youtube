import reducer, { onRequestSearch, initialState } from "./search";
import {
  getSearchStatus,
  getSearchErrorMessage,
  getSearchResults,
} from "./selectors/search";
import { ApiStatus } from "shared/types/api.d";
import { SearchVideoItem1, SearchVideoItem2 } from "mocks/search/searchMocks";

describe("Search slice", () => {
  it("Load init state by default", () => {
    const searchReducer = reducer(undefined, { type: "" });
    expect(searchReducer).toEqual(initialState);
  });

  it("onRequestSearch.failure sets correct status and error message", () => {
    const errorMessage = "Oh no an error!";

    const searchReducer = reducer(
      initialState,
      onRequestSearch.failure(errorMessage)
    );

    expect(getSearchStatus({ search: searchReducer })).toEqual(
      ApiStatus.STATUS_ERROR
    );

    expect(getSearchErrorMessage({ search: searchReducer })).toEqual(
      errorMessage
    );
  });

  it("onRequestSearch.request sets correct status", () => {
    const searchReducer = reducer(initialState, onRequestSearch.request(""));

    expect(getSearchStatus({ search: searchReducer })).toEqual(
      ApiStatus.STATUS_LOADING
    );
  });

  it("onRequestSearch.success sets correct status and adds data to reducer", () => {
    const searchItems = [SearchVideoItem1, SearchVideoItem2];

    const searchReducer = reducer(
      initialState,
      onRequestSearch.success({ items: searchItems })
    );

    expect(getSearchStatus({ search: searchReducer })).toEqual(
      ApiStatus.STATUS_LOADED
    );

    expect(getSearchResults({ search: searchReducer })).toEqual([
      SearchVideoItem1,
      SearchVideoItem2,
    ]);
  });
});
