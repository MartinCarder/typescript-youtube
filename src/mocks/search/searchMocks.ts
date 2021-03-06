export const videoThumb = {
  url: "/test1.jpg",
  width: 100,
  height: 200,
};

export const videoThumbs = {
  default: videoThumb,
  medium: videoThumb,
  high: videoThumb,
};

export const videoSnipt1 = {
  publishedAt: "2020-12-31T11:30:00Z",
  channelId: "1",
  title: "Test video 1",
  description: "Video one description",
  channelTitle: "Channel 1",
  thumbnails: videoThumbs,
};

export const videoSnipt2 = {
  publishedAt: "2021-01-04T11:30:00Z",
  channelId: "1",
  title: "Test video 2",
  description: "Video two description",
  channelTitle: "Channel 1",
  thumbnails: videoThumbs,
};

export const SearchVideoItem1 = {
  id: {
    kind: "video",
    videoId: "11111",
  },
  snippet: videoSnipt1,
};

export const SearchVideoItem2 = {
  id: {
    kind: "video",
    videoId: "222222",
  },
  snippet: videoSnipt2,
};
