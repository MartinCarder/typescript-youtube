import React from "react";
import CircularProgress from "@material-ui/core/CircularProgress";
import Alert from "@material-ui/lab/Alert";
import Grid from "@material-ui/core/Grid";
import { ApiStatus } from "shared/types/api.d";
import { useLoadingIndicatorStyles } from "./loadingIndicator.styles";

export interface LoadingIndicatorProps {
  status: ApiStatus;
  errorMessage?: string;
}

export const LoadingIndicator: React.FC<LoadingIndicatorProps> = ({
  status,
  children,
  errorMessage = "Error",
}) => {
  const classes = useLoadingIndicatorStyles();
  const isLoading =
    status === ApiStatus.STATUS_INIT || status === ApiStatus.STATUS_LOADING;
  const isError = status === ApiStatus.STATUS_ERROR;

  let display = children;
  if (isError)
    display = (
      <Grid
        container
        justify="center"
        alignItems="center"
        direction="row"
        className={classes.root}
      >
        <Grid item xs={12}>
          <Alert variant="filled" severity="error" data-testid="error-message">
            {errorMessage}
          </Alert>
        </Grid>
      </Grid>
    );

  if (isLoading)
    display = (
      <Grid
        container
        justify="center"
        alignItems="center"
        direction="row"
        className={classes.root}
      >
        <CircularProgress data-testid="loading-indicator" />
      </Grid>
    );

  return <>{display}</>;
};
