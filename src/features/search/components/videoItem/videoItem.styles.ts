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
      overflowWrap: "break-word",
      wordWrap: "break-word",
      wordBreak: "break-word",
    },
    date: {
      flex: 1,
      marginTop: 20,
    },
    action: {
      flex: 1,
      display: "flex",
      flexDirection: "column",
      height: "100%",
    },
  })
);
