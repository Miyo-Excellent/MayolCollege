//  Dependencies
import React from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';

//  Components
import {
  Students,
  Login,
  Page404
} from './views';

const routes = [
  {path: '/', component: Students, exact: true},
  {path: '/login', component: Login, exact: true},
  {component: Page404},
];

const routesMap = routes.map((route, i) => <Route key={i} {...route} />);

export default () => (
  <BrowserRouter>
    <Switch>
      {routesMap}
    </Switch>
  </BrowserRouter>
);
