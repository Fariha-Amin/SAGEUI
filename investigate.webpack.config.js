const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const TerserPlugin = require("terser-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const devMode = process.env.NODE_ENV == "development ";

module.exports = {
  entry: './app/investigate/index.js',
  resolve: {
    alias: {
      _shared: path.resolve(__dirname, "libs/shared"),
      _investigate: path.resolve(__dirname, "libs/app/investigate"),
      _root: path.resolve(__dirname, "")
    },
    extensions: ['*','.js','.jsx']
  },
  output: {
    path:path.resolve(__dirname, "dist/Investigate"),
    filename: '[contenthash].js',
    publicPath: devMode ? '/' : '/app/Investigate/',
    clean: true
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        loader: "babel-loader",
        options: {presets: ['@babel/preset-env', '@babel/preset-react']}
      },
      {
        test: /\.(png|jp(e*)g|svg|gif)$/,
        use: ['file-loader'],
      },
      {
        test: /\.svg$/,
        use: ['@svgr/webpack'],
      },
      {
        test: /\.(sa|sc|c)ss$/,
        use: [
          devMode ? "style-loader" : MiniCssExtractPlugin.loader,
          "css-loader",
          "postcss-loader",
          "sass-loader",
        ],
      },
    ]
  },
  devServer:{
        static:{
            directory: path.join(__dirname, 'dist/Investigate/')
        },
        port:3000,
        devMiddleware:{
            publicPath: 'http://localhost:3000'
        }
  },
  performance: {
    hints: false,
    maxEntrypointSize: 512000,
    maxAssetSize: 512000
  },
  plugins: [
    new HtmlWebpackPlugin({title: "Investigate", template: path.join(__dirname, "index.html"),})
  ].concat(devMode ? [] : [new MiniCssExtractPlugin()]),
  optimization: {
    minimize:true,
    minimizer: [
        new TerserPlugin({
            extractComments: false
        })
    ]
  }
}