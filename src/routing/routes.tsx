import Search from "features/search";
import Video from "features/videoDetails";
import { RouteProps } from "shared/types/routes.d";

export const routes: RouteProps[] = [
  {
    path: "/video/:videoId",
    component: Video,
  },
  {
    path: "/",
    component: Search,
  },
];
