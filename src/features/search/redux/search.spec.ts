import reducer, { onRequestSearch, initialState } from "./search";

describe("Search slice", () => {
  it("Load init state by default", () => {
    const search = reducer(undefined, { type: "" });
    expect(search).toEqual(initialState);
  });
});
