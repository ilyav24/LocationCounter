import React from "react";

const Dashboard = React.lazy(() => import("./views/Dashboard"));
const Buildings = React.lazy(() => import("./containers/Buildings"));
const Locations = React.lazy(() => import("./containers/Locations"));
const Sensors = React.lazy(() => import("./containers/Sensors"));
// https://github.com/ReactTraining/react-router/tree/master/packages/react-router-config
const routes = [
  { path: "/", exact: true, name: "Home" },
  { path: "/dashboard", name: "Dashboard", component: Dashboard },
  { path: "/buildings", exact: true, name: "Buildings", component: Buildings },
  { path: "/locations", exact: true, name: "Locations", component: Locations },
  { path: "/sensors", exact: true, name: "Sensors", component: Sensors },
];

export default routes;
