var webpack = require('webpack');
var UglifyJsPlugin = webpack.optimize.UglifyJsPlugin;

var plugins = [
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.UglifyJsPlugin({
      compress: { warnings: false },
      comments: false,
      sourceMap: false,
      mangle: true,
      minimize: true
    }),
    new webpack.DefinePlugin({'process.env':{'NODE_ENV':'"production"'}})
];

module.exports = {
  entry: './main.js',
  output: { path: __dirname, publicPath: '/', filename: 'bundle.js' },
  watch: true,
  module: {
    loaders: [
      {
        test: /.jsx?$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        query: {
          presets: ['stage-2','es2015', 'react']
        }
      }
    ]
  },
  plugins: plugins
};