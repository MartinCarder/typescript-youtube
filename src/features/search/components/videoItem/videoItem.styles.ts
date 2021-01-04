import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";

export const useVideoItemStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flex: 1,
      display: "flex",
      flexDirection: "column",
    },
    content: {
      flex: 1,
      display: "flex",
    },
    date: {
      flex: 1,
      marginTop: 20,
    },
  })
);
