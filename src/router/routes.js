import ErrorPage from '../pages/ErrorPage';
import Home from '../pages/Home';

const routes = [
    {
        path: '/',
        layout: Home,
        component: Home,
        exact: true,
    }, 
    {
        path: '/404',
        layout: ErrorPage,
        component: ErrorPage,
        exact: true,
    }, 
]
export default routes;