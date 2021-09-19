export const getRequest = async (
  api: string,
  query: URLSearchParams = new URLSearchParams()
): Promise<any> => {
  query.set("key", process.env.REACT_APP_YOUTUBE_API_KEY || "");

  const request = await fetch(
    `${process.env.REACT_APP_YOUTUBE_SEARCH_ENDPOINT}${api}?${query}`,
    {
      method: "get",
    }
  );

  if (request.status !== 200)
    throw new Error(`Error status code ${request.status}`);

  const data = await request.json();

  return data as [];
};
