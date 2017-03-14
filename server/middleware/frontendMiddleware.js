/* eslint-disable global-require */
const express = require('express');
const path = require('path');
const morgan = require('morgan');
const winston = require('winston');

// Dev middleware
const addDevMiddlewares = (app, webpackConfig) => {
  const webpack = require('webpack');
  const webpackDevMiddleware = require('webpack-dev-middleware');
  const webpackHotMiddleware = require('webpack-hot-middleware');
  const compiler = webpack(webpackConfig);
  const middleware = webpackDevMiddleware(compiler, {
    noInfo: true,
    publicPath: webpackConfig.output.publicPath,
    silent: true,
    stats: 'errors-only',
    hot: true,
  });

  app.use(middleware);
  app.use(webpackHotMiddleware(compiler));
  app.set('wds-fs', middleware.fileSystem);
  app.use(morgan('dev'));
};

// Production middlewares
const addProdMiddlewares = (app, options) => {
  const compression = require('compression');
  const helmet = require('helmet');
  const outputPath = options.outputPath || path.resolve(process.cwd(), 'build');

  app.use(morgan('common'));
  app.use(helmet());
  // compression middleware compresses your server responses which makes them
  // smaller (applies also to assets). You can read more about that technique
  // and other good practices on official Express.js docs http://mxs.is/googmy
  app.use(compression());
  app.use(express.static(outputPath));
};

/**
 * Front-end middleware
 */
module.exports = (app, options) => {
  const isProd = process.env.NODE_ENV === 'production';

  if (isProd) {
    addProdMiddlewares(app, options);
  } else {
    const webpackConfig = require('../../internals/webpack/webpack.dev.babel');
    addDevMiddlewares(app, webpackConfig);
  }
  return app;
};
