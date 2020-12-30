import React from "react";
import { useSelector } from "react-redux";
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";
import { getSearchResults } from "../redux/selectors/";
import { SearchBar } from "./searchBar/searchBar";
import { VideoItem } from "./videoItem/videoItem";

export const Search: React.FC = () => {
  const results = useSelector(getSearchResults);

  return (
    <>
      <SearchBar />
      <Container>
        <Grid container spacing={3} alignItems="stretch" direction="row">
          {results.map((result) => (
            <Grid
              item
              container
              xs={4}
              key={result.id.videoId}
              direction="column"
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
      </Container>
    </>
  );
};
