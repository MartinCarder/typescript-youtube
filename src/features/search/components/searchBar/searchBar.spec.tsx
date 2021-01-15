import React from "react";
import { fireEvent, waitFor } from "@testing-library/react";
import { render } from "testHelps";
import { SearchBar } from "./searchBar";
import { onRequestSearch } from "../../redux/search";

describe("searchBar", () => {
  const searchString = "cars";

  it("Entering search term and click search fires request search action with correct value", async () => {
    const result = render(<SearchBar />);

    fireEvent.change(result.getByLabelText(/search youtube/i), {
      target: { value: searchString },
    });

    fireEvent.click(result.getByRole("button"));

    await waitFor(() => {
      expect(result.dispatchSpy).toBeCalledWith(
        onRequestSearch.request(searchString)
      );
    });
  });

  it("Entering search term and click search updates search in query string", async () => {
    const result = render(<SearchBar />);

    fireEvent.change(result.getByLabelText(/search youtube/i), {
      target: { value: searchString },
    });

    fireEvent.click(result.getByRole("button"));

    await waitFor(() => {
      const { location } = result.history;
      expect(location.pathname).toEqual("/");
      expect(location.search).toEqual(`?search=${searchString}`);
    });
  });

  it("If search query is set use it", async () => {
    const result = render(<SearchBar />, {
      route: [`/?search=${searchString}`],
    });

    expect(result.getByLabelText(/search youtube/i)).toHaveValue(searchString);

    fireEvent.click(result.getByRole("button"));

    await waitFor(() => {
      expect(result.dispatchSpy).toBeCalledWith(
        onRequestSearch.request(searchString)
      );
    });
  });
});
