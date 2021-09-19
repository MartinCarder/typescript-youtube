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
          />
        </styles.VideoWrapper>
      </Grid>
      <Grid item xs={12}>
        <h1>{title}</h1>
      </Grid>
      <Grid item xs={6}>
        view count {viewCount}
      </Grid>
      <Grid item xs={6}>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <ThumbUpIcon />
            {likeCount}
          </Grid>
          <Grid item xs={6}>
            <ThumbDownIcon />
            dislikes {dislikeCount}
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={6}>
        published {publishedAt}
      </Grid>
      <Grid item xs={12}>
        {description}
      </Grid>
    </Grid>
  </>
);
