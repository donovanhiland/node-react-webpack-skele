import React from 'react';
import ReactDOM from 'react-dom';
import { AppContainer as HotReloader } from 'react-hot-loader';

import './assets/stylesheets/imports.scss';
import Root from './routes';

ReactDOM.render(
  <HotReloader>
    <Root />
  </HotReloader>,
  document.getElementById('root')
);

// HMR
if (module.hot) {
  /* hack to remove non important console.error with react router */
  const isString = require('util').isString;

  const orgError = console.error;
  console.error = (...args) => {
    if (args && args.length === 1 && isString(args[0]) && args[0].indexOf('You cannot change <Router routes>;') > -1) {
      // React route changed
    } else {
      // Log the error as normally
      orgError.apply(console, args);
    }
  };
  /* end hack */

  module.hot.accept('./routes', () => {
    const NewRoot = require('./routes').default;
    ReactDOM.render(
      <HotReloader>
        <NewRoot />
      </HotReloader>,
      document.getElementById('root')
    );
  });
}
