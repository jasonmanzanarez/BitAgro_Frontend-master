import React from "react";
import $ from "jquery";
import binnacleList from "./App/screens/binnacle/binnacleList";

window.jQuery = $;
window.$ = $;
global.jQuery = $;

const Dashboard = React.lazy(() =>
  import("../src/App/screens/dashboard/index")
);

const HumanResources = React.lazy(() =>
  import("../src/App/screens/humanResources/index")
);

const Lots = React.lazy(() => import("../src/App/screens/lots"));

const Cycles = React.lazy(() => import("../src/App/screens/cycles/index"));

const Sowings = React.lazy(() => import("../src/App/screens/sowings/index"));

const SowingsList = React.lazy(() =>
  import("../src/App/screens/sowings/sowingsList")
);

const LotsBinnacle = React.lazy(() =>
  import("../src/App/screens/binnacle/lots")
);

const SowingsBinnacle = React.lazy(() =>
  import("../src/App/screens/binnacle/sowingsList")
);

const BinnacleList = React.lazy(() =>
  import("../src/App/screens/binnacle/binnacleList")
);

const ActivitiesList = React.lazy(() =>
  import("../src/App/screens/activities/activitiesList")
);

const LotsFinances = React.lazy(() =>
  import("../src/App/screens/finances/lots")
);

const SowingsFinances = React.lazy(() =>
  import("../src/App/screens/finances/listSowings")
);

const LotsHarvests = React.lazy(() =>
  import("../src/App/screens/harvest/lots")
);

const SowingsHarvest = React.lazy(() =>
  import("../src/App/screens/harvest/listSowings")
);

const routes = [
  {
    path: "/dashboard",
    exact: true,
    name: "Dashboard",
    component: Dashboard,
  },
  {
    path: "/human_resources",
    exact: true,
    name: "HumanResources",
    component: HumanResources,
  },
  {
    path: "/lots",
    exact: true,
    name: "Lots",
    component: Lots,
  },
  {
    path: "/cycles",
    exact: true,
    name: "Cycles",
    component: Cycles,
  },
  {
    path: "/sowings",
    exact: true,
    name: "Sowings",
    component: Sowings,
  },
  {
    path: "/sowings/lote/:lotId",
    exact: true,
    name: "SowingsList",
    component: SowingsList,
  },
  {
    path: "/binnacle",
    exact: true,
    name: "LotsBinnacle",
    component: LotsBinnacle,
  },
  {
    path: "/binnacle/sowings/:lotId",
    exact: true,
    name: "SowingsBinnacle",
    component: SowingsBinnacle,
  },
  {
    path: "/binnacle/list/:sowingId",
    exact: true,
    name: "BinnacleList",
    component: BinnacleList,
  },
  {
    path: "/binnacle/activities/:binnacleId",
    exact: true,
    name: "ActivitiesList",
    component: ActivitiesList,
  },
  {
    path: "/finances",
    exact: true,
    name: "LotsFinances",
    component: LotsFinances,
  },
  {
    path: "/finances/sowings/:lotId",
    exact: true,
    name: "SowingsFinances",
    component: SowingsFinances,
  },
  {
    path: "/harvests",
    exact: true,
    name: "LotsHarvests",
    component: LotsHarvests,
  },
  {
    path: "/harvest/sowings/:lotId",
    exact: true,
    name: "SowingsHarvest",
    component: SowingsHarvest,
  },
];

export default routes;
