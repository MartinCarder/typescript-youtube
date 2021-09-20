import React from "react";
import ReactPlayer from "react-player/youtube";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";
import Grid from "@mui/material/Grid";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import * as styles from "./videoPlayStyles.styled";

export const VideoPlayer: React.FC<any> = ({
  videoId,
  publishedAt,
  title,
  viewCount,
  likeCount,
  dislikeCount,
  description,
}) => (
  <>
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <styles.VideoWrapper>
          <ReactPlayer
            className="react-player"
            url={`https://www.youtube.com/watch?v=${videoId}`}
            width="100%"
            height="100%"
            data-testid="player"
          />
        </styles.VideoWrapper>
      </Grid>
      <Grid item xs={12}>
        <h1>{title}</h1>
      </Grid>
      <Grid item xs={6} data-testid="count">
        view count {viewCount}
      </Grid>
      <Grid item xs={6}>
        <Grid container spacing={2}>
          <Grid item xs={6} data-testid="likes">
            <ThumbUpIcon />
            {likeCount}
          </Grid>
          <Grid item xs={6} data-testid="dislikes">
            <ThumbDownIcon />
            {dislikeCount}
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={6} data-testid="published">
        published {publishedAt}
      </Grid>
      <Grid item xs={12} data-testid="description">
        {description}
      </Grid>
    </Grid>
  </>
);
