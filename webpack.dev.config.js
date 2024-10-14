const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const CopyPlugin = require("copy-webpack-plugin");

module.exports = {
  mode: 'development',
  entry: './src/index.ts',
  output: {
    filename: 'build.js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: "/",
    clean: true,
  },

  resolve: {
    extensions: ['.ts', '.tsx', '.js'],
    fallback: {
      "fs": false,
      "tls": false,
      "net": false,
      "path": false,
      "zlib": false,
      "http": false,
      "https": false,
      "stream": false,
      "crypto": false,
      "os": false,
    }
  },

  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.(png|jpg|jpeg)$/i,
        type: "asset/resource"
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',
    }),
    new webpack.ProvidePlugin({
      process: 'process/browser'
    }),
    new CopyPlugin({
      patterns: [
        { from:  './src/assets/', to: 'assets'},
      ],
    }),
  ],

  devServer: {
    static: {
      directory: path.join(__dirname, 'assets'), // Folder with your images
    },
    port: 3000,
    open: true,
    hot: true,
  },

  devtool: 'inline-source-map',
};