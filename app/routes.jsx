import React from 'react';
import { browserHistory, Router, IndexRoute, Route, Redirect } from 'react-router';

import App from './views/app';
import Meatball from './views/meatball';
import Spaghetti from './views/spaghetti';

const Routes = () => (
  <Router history={browserHistory}>
    <Route path="/" component={App}>
      <IndexRoute component={Meatball} />
      <Route path="/spaghetti" component={Spaghetti} />
      <Redirect from="*" to="/" />
    </Route>
  </Router>
);

export default Routes;
