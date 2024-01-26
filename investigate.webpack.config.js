const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const TerserPlugin = require("terser-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const devMode = process.env.NODE_ENV !== "production";

module.exports = {
  entry: './app/Investigate/index.js',
  resolve: {extensions: ['*','.js','.jsx']},
  output: {
    path:path.resolve(__dirname, "dist/investigate"),
    filename: '[contenthash].js',
    publicPath: '/',
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
        },
        hot: 'only'
  },
  plugins: [
    new HtmlWebpackPlugin({title: "Investigate", template: path.join(__dirname, "libs/pages/", "index-template.html"),}),
    new webpack.HotModuleReplacementPlugin()
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