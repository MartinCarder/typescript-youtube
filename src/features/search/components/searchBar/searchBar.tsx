import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { onRequestSearch } from "../../redux/search";

export const SearchBar: React.FC = () => {
  const dispatch = useDispatch();
  const [searchValue, setSearchValue] = useState("");

  const search = () => dispatch(onRequestSearch.request(searchValue));
  return (
    <div data-testid="searchBar">
      <input
        type="text"
        value={searchValue}
        onChange={(ev) => setSearchValue(ev.target.value)}
      />
      <button onClick={search}>Search</button>
    </div>
  );
};
