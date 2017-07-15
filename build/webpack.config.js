const path = require('path');
const config = require('config');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  resolve: {
    extensions: ['.js','.ts']
  },
  entry: [
    `webpack-dev-server/client?http://localhost:${config.get('devServer.port')}`,
    path.resolve(__dirname, '../client/index')
  ],
  output: {
    filename: '[name]-[hash].js',
    path: path.resolve(__dirname, '../dist'),
    publicPath: ''
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.DefinePlugin({
      API_KEY: JSON.stringify(config.get("openWeatherAPI.key")),
      BASE_URL: JSON.stringify(config.get("openWeatherAPI.baseURL"))
    }),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, './index.html'),
      inject: {
        body: true
      }
    })
  ],
  module: {
    rules: [
      {
        test: /\.js$/,
        use: ['babel-loader'],
        exclude: /node_modules/
      }
    ]
  },
  devServer: {
    port: 4000
  }
}
