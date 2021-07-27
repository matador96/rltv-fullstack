import ErrorPage from '../pages/ErrorPage';
import Main from '../pages/Main';
import LeaderboardsPage from '../pages/LeaderboardsPage';
import PlayerPage  from '../pages/PlayerPage'
import AboutMePage from './../pages/AboutMePage'
import HelpPage from './../pages/HelpPage'
import OBSPage from '../pages/OBSPage';
import FavoritesPage from '../pages/Favorites';

const routes = [
    {
        path: '/',
        layout: Main,
        component: Main,
        exact: true,
    }, 
    {
        path: '/404',
        layout: ErrorPage,
        component: ErrorPage,
        exact: true,
    }, 
    {
        path: '/player',
        layout: PlayerPage,
        component: PlayerPage,
        exact: true,
    }, 
    {
        path: '/aboutme',
        layout: AboutMePage,
        component: AboutMePage,
        exact: true,
    },   

    {
        path: '/favorites',
        layout: FavoritesPage,
        component: FavoritesPage,
        exact: true,
    },   
    {
        path: '/leaderboards',
        layout: LeaderboardsPage,
        component: LeaderboardsPage,
        exact: true,
    }, 
    {
        path: '/help',
        layout: HelpPage,
        component: HelpPage,
        exact: true,
    }, 
    {
        path: '/aboutme',
        layout: AboutMePage,
        component: AboutMePage,
        exact: true,
    },  
    {
        path: '/obs',
        layout: OBSPage,
        component: OBSPage,
        exact: true,
    },  
]
export default routes;