// @flow
import { lazy } from "react";
import { USER_ROLES } from "constants/user";

export default [
  {
    path: "/",
    exact: true,
    auth: true,
    roles: [USER_ROLES.ADMIN],
    component: lazy(() => import("modules/scriptAnalysis")),
  },
  {
    path: "/review",
    exact: true,
    auth: true,
    roles: [USER_ROLES.ADMIN],
    component: lazy(() => import("modules/scriptReview")),
  },
  {
    path: "/whether",
    exact: true,
    auth: true,
    roles: [USER_ROLES.ADMIN],
    component: lazy(() => import("modules/whetherPrediction")),
  },
  {
    path: "/success-rate",
    exact: true,
    auth: true,
    roles: [USER_ROLES.ADMIN],
    component: lazy(() => import("modules/successRate")),
  },
];
