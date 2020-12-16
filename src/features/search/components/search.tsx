import React from "react";
import { useDispatch } from "react-redux";
import { onRequestSearch } from "../actions/search";

export const Search: React.FC<any> = () => {
  const dispatch = useDispatch();

  const search = () => {
    console.log("!!");
    dispatch(onRequestSearch.request("tt"));
  };
  return <div onClick={search}>Search Bar</div>;
};
