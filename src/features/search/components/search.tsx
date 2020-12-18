import React from "react";
import { useSelector } from "react-redux";
import { getSearchResults } from "../selectors/";
import { SearchBar } from "./searchBar";

export const Search: React.FC = () => {
  const results = useSelector(getSearchResults);

  return (
    <>
      <SearchBar />
      {results.map((result) => (
        <div key={result.id.videoId}>{result.snippet.title}</div>
      ))}
    </>
  );
};
