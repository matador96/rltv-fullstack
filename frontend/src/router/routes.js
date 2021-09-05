import ErrorPage from "../pages/ErrorPage";
import Main from "../pages/Main";
import PlayerPage from "../pages/PlayerPage";
import AboutMePage from "./../pages/AboutMePage";
import FavoritesPage from "../pages/Favorites";
import RoadmapPage from "../pages/RoadmapPage";
import BugReportPage from "../pages/BugReportPage";
import DonatePage from "../pages/DonatePage";
import DistributionPage from "../pages/DistributionPage";

const routes = [
  {
    path: "/",
    layout: Main,
    component: Main,
    exact: true,
  },
  {
    path: "/404",
    layout: ErrorPage,
    component: ErrorPage,
    exact: true,
  },
  {
    path: "/player/:platform/:gameId",
    layout: PlayerPage,
    component: PlayerPage,
    exact: true,
  },
  {
    path: "/roadmap",
    layout: RoadmapPage,
    component: RoadmapPage,
    exact: true,
  },
  {
    path: "/bugreport",
    layout: BugReportPage,
    component: BugReportPage,
    exact: true,
  },
  {
    path: "/donate",
    layout: DonatePage,
    component: DonatePage,
    exact: true,
  },
  {
    path: "/aboutme",
    layout: AboutMePage,
    component: AboutMePage,
    exact: true,
  },

  {
    path: "/favorites",
    layout: FavoritesPage,
    component: FavoritesPage,
    exact: true,
  },
  // {
  //   path: "/leaderboards",
  //   layout: LeaderboardsPage,
  //   component: LeaderboardsPage,
  //   exact: true,
  // },
  // {
  //   path: "/help",
  //   layout: HelpPage,
  //   component: HelpPage,
  //   exact: true,
  // },

  {
    path: "/aboutme",
    layout: AboutMePage,
    component: AboutMePage,
    exact: true,
  },
  {
    path: "/distribution",
    layout: DistributionPage,
    component: DistributionPage,
    exact: true,
  },

  // {
  //   path: "/obs",
  //   layout: OBSPage,
  //   component: OBSPage,
  //   exact: true,
  // },
];
export default routes;
