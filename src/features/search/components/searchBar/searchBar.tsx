import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useHistory, useLocation } from "react-router-dom";
import { onRequestSearch } from "../../redux/search";

export const SearchBar: React.FC = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const query = new URLSearchParams(useLocation().search);
  const searchTerm = query.get("search") || "";

  const [searchValue, setSearchValue] = useState(searchTerm);

  useEffect(() => {
    console.log("effect");
    if (searchTerm) dispatch(onRequestSearch.request(searchTerm));
  }, [searchTerm, dispatch]);

  const search = () => {
    history.push(`/?search=${encodeURIComponent(searchValue)}`);
  };
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
