import React from "react";

export interface VideoItemProps {
  videoTitle: string;
  videoImage: string;
}

export const VideoItem: React.FC<VideoItemProps> = ({
  videoTitle,
  videoImage,
}) => (
  <div>
    <div data-testid="videoItemTitle">{videoTitle}</div>
    <img data-testid="videoItemImage" src={videoImage} alt={videoTitle} />
  </div>
);
