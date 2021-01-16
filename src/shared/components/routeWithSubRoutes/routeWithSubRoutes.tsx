import { Route } from "react-router-dom";
import { RouteProps } from "shared/types/routes.d";

export const RouteWithSubRoutes: React.FC<RouteProps> = (route) => (
  <Route
    path={route.path}
    render={(props) => <route.component {...props} routes={route.routes} />}
  />
);
