import React from "react";
import { useSelector } from "react-redux";
import { getSearchResults } from "../redux/selectors/";
import { SearchBar } from "./searchBar/searchBar";
import { VideoItem } from "./videoItem/videoItem";

export const Search: React.FC = () => {
  const results = useSelector(getSearchResults);

  return (
    <>
      <SearchBar />
      {results.map((result) => (
        <VideoItem
          key={result.id.videoId}
          videoTitle={result.snippet.title}
          videoImage={result.snippet.thumbnails.high.url}
        />
      ))}
    </>
  );
};
