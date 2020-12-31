import React from "react";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import CardMedia from "@material-ui/core/CardMedia";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import Grid from "@material-ui/core/Grid";
import { useVideoItemStyles } from "./videoItems.styles";

dayjs.extend(relativeTime);
export interface VideoItemProps {
  videoTitle: string;
  videoImage: string;
  videDescription: string;
  videoChannel: string;
  videoPublished: string;
}

export const VideoItem: React.FC<VideoItemProps> = ({
  videoTitle,
  videoImage,
  videDescription,
  videoChannel,
  videoPublished,
}) => {
  const classes = useVideoItemStyles();
  const publishedFomrated = dayjs(videoPublished);
  return (
    <Card className={classes.root}>
      <div>
        <CardMedia
          image={videoImage}
          title={videoTitle}
          height="auto"
          component="img"
        />
      </div>

      <CardContent className={classes.content}>
        <Grid
          container
          direction="column"
          justify="flex-start"
          alignItems="flex-start"
        >
          <Grid item>
            <Typography
              gutterBottom
              variant="h5"
              component="h2"
              data-testid="videoItemTitle"
              color="primary"
            >
              {videoTitle}
            </Typography>
            <Typography variant="body2" gutterBottom>
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
            justify="flex-end"
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
    </Card>
  );
};
