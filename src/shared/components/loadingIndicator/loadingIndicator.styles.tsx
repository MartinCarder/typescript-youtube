import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";

export const useLoadingIndicatorStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      minHeight: "92vh",
    },
  })
);
