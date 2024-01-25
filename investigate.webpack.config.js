const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const TerserPlugin = require("terser-webpack-plugin");

module.exports = {
  entry: './Investigate/index.js',
  resolve: {extensions: ['*','.js','.jsx']},
  output: {
    path:path.resolve(__dirname, "dist_investigate"),
    filename: '[contenthash].js',
    publicPath: '/dist/',
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
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.(png|jp(e*)g|svg|gif)$/,
        use: ['file-loader'],
      },
      {
        test: /\.svg$/,
        use: ['@svgr/webpack'],
      },
    ]
  },
  devServer:{
        static:{
            directory: path.join(__dirname, 'dist_investigate/')
        },
        port:3000,
        devMiddleware:{
            publicPath: 'http://localhost:3000/dist'
        },
        hot: 'only'
  },
  plugins: [new HtmlWebpackPlugin({title: "Investigate", template: path.join(__dirname, "Investigate", "index-template.html"),}),
    new webpack.HotModuleReplacementPlugin()],
  optimization: {
    minimize:true,
    minimizer: [
        new TerserPlugin({
            extractComments: false
        })
    ]
  }
}