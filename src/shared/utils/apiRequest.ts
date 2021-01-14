export const getRequest = async (
  api: string,
  query: { [key: string]: string } = {}
) => {
  const qs = new URLSearchParams({
    ...query,
    key: process.env.REACT_APP_YOUTUBE_API_KEY || "",
  });

  const request = await fetch(
    `${process.env.REACT_APP_YOUTUBE_SEARCH_ENDPOINT}${api}?${qs}`,
    {
      method: "get",
    }
  );

  if (request.status !== 200)
    throw new Error(`Error status code ${request.status}`);

  const data = await request.json();

  return data;
};
