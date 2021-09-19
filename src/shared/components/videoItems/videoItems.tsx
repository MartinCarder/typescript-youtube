import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import CardMedia from "@mui/material/CardMedia";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import Grid from "@mui/material/Grid";
import CardActionArea from "@mui/material/CardActionArea";
import { useVideoItemStyles } from "./videoItem.styles";

dayjs.extend(relativeTime);

export interface VideoItemProps {
  videoTitle: string;
  videoImage: string;
  videDescription: string;
  videoChannel: string;
  videoPublished: string;
  videoId: string;
  onSelection(id: string): void;
}

export const VideoItem: React.FC<VideoItemProps> = ({
  videoTitle,
  videoImage,
  videDescription,
  videoChannel,
  videoPublished,
  videoId,
  onSelection,
}) => {
  const classes = useVideoItemStyles();
  const publishedFomrated = dayjs(videoPublished);

  return (
    <Card className={classes.root}>
      <CardActionArea
        onClick={() => onSelection(videoId)}
        className={classes.action}
      >
        <div>
          <CardMedia
            image={videoImage}
            title={videoTitle}
            height="auto"
            component="img"
            data-testid="videoItemImg"
          />
        </div>
        <CardContent className={classes.content}>
          <Grid container>
            <Grid item zeroMinWidth>
              <Typography
                gutterBottom
                variant="h5"
                component="h2"
                data-testid="videoItemTitle"
                color="primary"
              >
                {videoTitle}
              </Typography>
              <Typography
                variant="body2"
                gutterBottom
                data-testid="videoItemChannel"
              >
                {videoChannel}
              </Typography>
              <Typography
                variant="body2"
                color="textSecondary"
                gutterBottom
                component="p"
                data-testid="videoItemDescription"
              >
                {videDescription}
              </Typography>
            </Grid>
            <Grid
              item
              container
              alignItems="flex-end"
              // justify="flex-end"
              className={classes.date}
            >
              {publishedFomrated.isValid() && (
                <Typography variant="body2" data-testid="videoItemPublished">
                  {publishedFomrated.fromNow()}
                </Typography>
              )}
            </Grid>
          </Grid>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};
