import React from "react";
import { useSelector } from "react-redux";
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";
import {
  getSearchResults,
  getSearchStatus,
  getSearchErrorMessage,
} from "../redux/selectors/";
import { SearchBar } from "./searchBar/searchBar";
import { VideoItem } from "./videoItem/videoItem";
import { LoadingIndicator } from "shared/components/loadinIndicator/loadingIndicator";

export const Search: React.FC = () => {
  const results = useSelector(getSearchResults);
  const status = useSelector(getSearchStatus);
  const errorMessage = useSelector(getSearchErrorMessage);

  return (
    <>
      <SearchBar />
      <Container>
        <LoadingIndicator status={status} errorMessage={errorMessage}>
          <Grid container spacing={3} alignItems="stretch" direction="row">
            {results.map((result) => (
              <Grid
                item
                container
                xs={4}
                key={result.id.videoId}
                data-testid="result-item"
              >
                <VideoItem
                  videoTitle={result.snippet.title}
                  videoImage={result.snippet.thumbnails.high.url}
                  videDescription={result.snippet.description}
                  videoChannel={result.snippet.channelTitle}
                  videoPublished={result.snippet.publishedAt}
                />
              </Grid>
            ))}
          </Grid>
        </LoadingIndicator>
      </Container>
    </>
  );
};
