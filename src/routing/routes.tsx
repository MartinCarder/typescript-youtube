import Search from "features/search";
import Video from "features/video";
import { RouteProps } from "shared/types/routes.d";

export const routes: RouteProps[] = [
  {
    path: "/video",
    component: Video,
  },
  {
    path: "/",
    component: Search,
  },
];
