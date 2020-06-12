const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const webpack = require("webpack");
const ImageminPlugin = require("imagemin-webpack-plugin").default;

module.exports = (env) => {
  const isProduction = env.production ? true : false;
  const envType = isProduction ? "production" : "development";

  return {
    mode: envType,
    devtool: 'source-map',
    devServer: {
      contentBase: path.join(__dirname, './dist'),
      compress: true,
      port: 9000,
    },
    entry: [
      './src/styles/main.scss',
      './src/scripts/main.ts',
    ],
    output: {
      path: path.resolve(__dirname, './dist'),
      filename: '[name].js',
    },
    plugins: [
      new MiniCssExtractPlugin({
        filename: '[name].css',
        minify: true,
      }),
      new HtmlWebpackPlugin({
        template: './src/index.html',
        minify: true,
      }),
      new CleanWebpackPlugin(),
    ],
    module: {
      rules: [
        {
          test: [/.ts$/],
          exclude: /(node_modules)/,
          use: 'babel-loader',
        },
        {
          test: /\.s[ac]ss$/i,
          use: [
            MiniCssExtractPlugin.loader,
            'css-loader',
            'sass-loader',
          ],
        },
        {
          test: /\.(png|svg|jpg|gif)$/,
          use: [
            {
              loader: "file-loader",
              options: {
                name: "[name].[ext]?[hash]",
                outputPath: "img/",
                publicPath: isProduction ? "./img/" : "",
              },
            },
          ],
        },
        {
          test: /\.(woff|woff2|eot|ttf|otf)$/,
          use: [
            {
              loader: "file-loader",
              options: {
                name: "[name].[ext]?[hash]",
                outputPath: "fonts/",
                publicPath: isProduction ? "./fonts/" : "",
              },
            },
          ],
        },
      ],
    }
  }
};
