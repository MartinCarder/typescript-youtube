const API_KEY = "AIzaSyBbgYGslTSXbBK0ZrMMVWbqjQl7FfwprJs";
const SEARCH_END_POINT = "https://youtube.googleapis.com/youtube/v3/";

export const getRequest = async (
  api: string,
  query: { [key: string]: string } = {}
) => {
  const qs = new URLSearchParams({
    ...query,
    key: API_KEY,
  });

  const request = await fetch(`${SEARCH_END_POINT}${api}?${qs}`, {
    method: "get",
  });

  if (request.status !== 200)
    throw new Error(`Error status code ${request.status}`);

  const data = await request.json();

  return data;
};
