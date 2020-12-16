export interface VideoItem {
  id: VideoId;
  snippet: VideoSippet[];
}

export interface VideoId {
  kind: string;
  videoId: string;
}

export interface VideoSippet {
  publishedAt: string;
  channelId: string;
  title: string;
  description: string;
  channelTitle: string;
  thumbnails: videoThumbnails;
}

export interface videoThumbnails {
  default: videoThumbnail;
  medium: videoThumbnail;
  high: videoThumbnail;
}

export interface videoThumbnail {
  url: string;
  width: number;
  height: number;
}
