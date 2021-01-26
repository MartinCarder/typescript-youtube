import { getRequest } from "./apiRequest";

describe("get request", () => {
  const mockData = { test: "hi" };

  it("Calls fetch with expected values", () => {
    fetchMock.mockOnce(JSON.stringify(mockData));
    const api = "temp";
    const query = { param: "1", test: "2" };
    getRequest(api, new URLSearchParams(query));

    const qs = new URLSearchParams({
      ...query,
      key: process.env.REACT_APP_YOUTUBE_API_KEY || "",
    });
    expect(fetchMock).toBeCalledTimes(1);
    expect(fetchMock).toBeCalledWith(
      `${process.env.REACT_APP_YOUTUBE_SEARCH_ENDPOINT}${api}?${qs}`,
      {
        method: "get",
      }
    );
  });

  it("Returns JSON on successful api call", async () => {
    fetchMock.mockOnce(JSON.stringify(mockData));
    const responce = await getRequest("temp");
    expect(responce).toEqual(mockData);
  });

  it("Throws error on fetch fail", async () => {
    const error = new Error("oh no!");
    fetchMock.mockRejectOnce(error);

    const mock = async () => getRequest("temp");

    await expect(mock).rejects.toThrow(error);
  });

  it("Throws error when status is not 200", async () => {
    const status = 400;
    const error = `Error status code ${status}`;
    fetchMock.mockOnce(JSON.stringify(mockData), { status });

    const mock = async () => getRequest("temp");

    await expect(mock).rejects.toThrow(error);
  });
});
