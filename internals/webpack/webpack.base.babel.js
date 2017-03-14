const path = require('path');
const webpack = require('webpack');
const autoprefixer = require('autoprefixer');
const precss = require('precss');

module.exports = options => ({
  entry: options.entry,
  output: Object.assign({
    path: path.resolve(process.cwd(), 'build'), // check this
    publicPath: '/',
  }, options.output),
  module: {
    preLoaders: options.preLoaders || null,
    loaders: [{
      test: /\.jsx?$/,
      loaders: process.env.NODE_ENV === 'production' ? ['babel'] : ['react-hot-loader/webpack', 'babel'],
      exclude: /node_modules/,
    }, {
      test: /\.css$/,
      include: /node_modules/,
      loaders: ['style-loader', 'css-loader'],
    }, {
      test: /\.scss$/,
      exclude: /node_modules/,
      loaders: ['style', 'css', 'sass'],
    }, {
      test: /\.(eot|svg|ttf|woff|woff2)$/,
      loader: 'file-loader',
      query: {
        name: 'assets/fonts/[name].[ext]',
      },
    }, {
      test: /\.(jpg|png|gif)$/,
      loader: 'file-loader',
      query: {
        name: 'assets/images/[name]-[hash].[ext]',
      },
    }, {
      test: /\.pdf$/,
      loader: 'file-loader',
      query: {
        name: 'assets/pdfs/[name]-[hash].pdf',
      },
    }, {
      test: /\.json$/,
      loader: 'json-loader',
    }, {
      test: /\.(mp4|webm)$/,
      loader: 'url-loader',
      query: {
        limit: 10000,
      },
    }],
  },
  resolve: {
    extensions: ['', '.js', '.jsx'],
  },
  postcss: () => [precss, autoprefixer],
  plugins: options.plugins.concat([
    // Always expose NODE_ENV to webpack, in order to use `process.env.NODE_ENV`
    // inside your code for any environment checks; UglifyJS will automatically
    // drop any unreachable code.
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(process.env.NODE_ENV),
      },
    }),
    new webpack.ProvidePlugin({
      _: 'underscore',
      axios: 'axios',
    }),
    new webpack.NamedModulesPlugin(),
  ]),
  devServer: {
    hot: true,
    contentBase: './',
  },
});
