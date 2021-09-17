import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { videoSearchActions } from "../redux/videoDetailsSlice";
import { VideoPlayer } from "./videoPlayer/videoPlayer";
import { getVideoDetails } from "../redux/selectors/videoDetailsSelectors";

export const VideoDetails: React.FC = () => {
  const dispatch = useDispatch();
  const details = useSelector(getVideoDetails);
  const { videoId } = useParams<{ videoId: string }>();

  useEffect(() => {
    dispatch(videoSearchActions.request(videoId));
  }, [videoId, dispatch]);

  return <VideoPlayer {...details} videoId={videoId} />;
};
