import { FC } from 'react';
import { Route } from 'react-router-dom';
import {
  MainPage,
  StartPage,
  SearchPage,
  AboutWellPage,
  BoresPage,
  DepthDayPage,
  WcsPage,
  Responses403Page,
  Responses404Page,
} from 'pages';

type RouteItem = {
  path: string | string[],
  component: FC<any>,
  getLinkTo?: (id: number | string) => string,
  pageName: string,
};

const routes: { [key: string]: RouteItem } = {
  MAIN_PAGE: {
    path: '/',
    component: MainPage,
    pageName: '',
  },
  HOME_PAGE: {
    path: '/:subsidiaryId',
    component: StartPage,
    pageName: '',
  },
  SEARCH_PAGE: {
    path: '/:subsidiaryId/search',
    component: SearchPage,
    pageName: '',
  },
  BORES_PAGE: {
    path: ['/:subsidiaryId/wells/:pageId?', '/:subsidiaryId/search/:searchText/:pageId?'],
    component: BoresPage,
    pageName: 'Скважины',
  },
  ABOUT_WELL_PAGE: {
    path: '/:subsidiaryId/about/:wellId',
    component: AboutWellPage,
    pageName: 'Скважина',
  },
  DEPTH_DAY_PAGE: {
    path: '/:subsidiaryId/depthday/:wellId?',
    component: DepthDayPage,
    pageName: 'Глубина день',
  },
  WSC_PAGE: {
    path: '/:subsidiaryId/chart',
    component: WcsPage,
    pageName: 'График сдачи в освоение',
  },
  ERROR_403: {
    path: '/error/403',
    component: Responses403Page,
    pageName: 'Ошибка 403',
  },
  ERROR_404: {
    path: '/error/404',
    component: Responses404Page,
    pageName: 'Ошибка 404',
  },
};

const appRoutes = Object.keys(routes).map((key: string) => (
  <Route
    exact
    path={routes[key].path}
    component={routes[key].component}
    key={key}
  />
));

export { routes, appRoutes };
