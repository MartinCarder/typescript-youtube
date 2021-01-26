import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { onRequestVideo } from "../redux/videoDetailsSlice";
import ReactPlayer from "react-player/youtube";

export const VideoDetails: React.FC = () => {
  const dispatch = useDispatch();
  const { videoId } = useParams<{ videoId: string }>();

  useEffect(() => {
    dispatch(onRequestVideo.request(videoId));
  }, [videoId, dispatch]);

  return (
    <div>
      <ReactPlayer url={`https://www.youtube.com/watch?v=${videoId}`} />
    </div>
  );
};
