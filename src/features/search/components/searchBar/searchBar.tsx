import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import { useHistory, useLocation } from "react-router-dom";
import { videoSearchActions } from "../../redux/search";

export const SearchBar: React.FC = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const query = new URLSearchParams(useLocation().search);
  const searchTerm = query.get("search") || "";

  const [searchValue, setSearchValue] = useState(searchTerm);

  useEffect(() => {
    if (searchTerm) dispatch(videoSearchActions.request(searchTerm));
  }, [searchTerm, dispatch]);

  const search = () => {
    history.push(`/?search=${encodeURIComponent(searchValue)}`);
  };

  const handleKeypress = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "Enter" || e.key === "NumpadEnter") {
      search();
    }
  };
  return (
    <AppBar position="sticky">
      <Toolbar>
        <div data-testid="searchBar">
          <input
            type="text"
            value={searchValue}
            onChange={(ev) => setSearchValue(ev.target.value)}
            placeholder="Search Youtube"
            aria-label="Search Youtube"
            onKeyPress={handleKeypress}
          />
          <button onClick={search}>Search</button>
        </div>
      </Toolbar>
    </AppBar>
  );
};
