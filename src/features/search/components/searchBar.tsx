import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { onRequestSearch } from "../actions/search";

export const SearchBar: React.FC<any> = () => {
  const dispatch = useDispatch();
  const [searchValue, setSearchValue] = useState("");

  const search = () => dispatch(onRequestSearch.request(searchValue));
  return (
    <>
      <input
        type="text"
        value={searchValue}
        onChange={(ev) => setSearchValue(ev.target.value)}
      />
      <button onClick={search}>Search</button>
    </>
  );
};
