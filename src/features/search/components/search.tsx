import React from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";
import {
  getSearchResults,
  getSearchStatus,
  getSearchErrorMessage,
} from "../redux/selectors/";
import { SearchBar } from "./searchBar/searchBar";
import { VideoItem } from "./videoItem/videoItem";
import { LoadingIndicator } from "shared/components/loadingIndicator/loadingIndicator";

export const Search: React.FC = () => {
  const results = useSelector(getSearchResults);
  const status = useSelector(getSearchStatus);
  const errorMessage = useSelector(getSearchErrorMessage);
  const history = useHistory();

  const viewVideo = (id: string) => history.push(`/video/${id}`);

  return (
    <>
      <SearchBar />
      <Container>
        <LoadingIndicator status={status} errorMessage={errorMessage}>
          <Grid container spacing={3} alignItems="stretch" direction="row">
            {results.map((result: any) => (
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
                  videoId={result.id.videoId}
                  onSelection={viewVideo}
                />
              </Grid>
            ))}
          </Grid>
        </LoadingIndicator>
      </Container>
    </>
  );
};
