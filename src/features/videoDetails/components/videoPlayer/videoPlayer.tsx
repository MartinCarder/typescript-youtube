import React from "react";
import ReactPlayer from "react-player/youtube";

export const VideoPlayer: React.FC<any> = ({
  videoId,
  publishedAt,
  title,
  viewCount,
  likeCount,
  dislikeCount,
}) => (
  <div>
    <ReactPlayer url={`https://www.youtube.com/watch?v=${videoId}`} />
    {title}
    <div>likes {likeCount}</div>
    <div>dislikes {dislikeCount}</div>
    <div>view count {viewCount}</div>
    <div>published {publishedAt}</div>
  </div>
);
