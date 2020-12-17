import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { onRequestSearch } from "../actions/search";
import { getSearchResults } from "../selectors/";

export const Search: React.FC<any> = () => {
  const dispatch = useDispatch();
  const results = useSelector(getSearchResults);

  const search = () => {
    console.log("!!");
    dispatch(onRequestSearch.request("tt"));
  };
  return (
    <>
      <div onClick={search}>Search Bar</div>
      {results.map((result) => (
        <div key={result.id.videoId}>{result.snippet.title}</div>
      ))}
    </>
  );
};
