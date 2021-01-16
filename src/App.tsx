import React from "react";
import { Switch } from "react-router-dom";
import { routes } from "routing/routes";
import { RouteWithSubRoutes } from "shared/components/routeWithSubRoutes/routeWithSubRoutes";

function App() {
  return (
    <Switch>
      {routes.map((route, i) => (
        <RouteWithSubRoutes key={route.path} {...route} />
      ))}
    </Switch>
  );
}

export default App;
