const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const webpack = require("webpack");
const ImageminPlugin = require("imagemin-webpack-plugin").default;
const CopyPlugin = require('copy-webpack-plugin');


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
      './src/scripts/main.ts'
    ],
    output: {
      path: path.resolve(__dirname, './dist'),
      filename: '[name].js'
    },
    module: {
      rules: [
        {
          test: [/.ts$/],
          exclude: /(node_modules)/,
          use: 'babel-loader'
        },
        {
          test: /\.s[ac]ss$/i,
          use: [
            MiniCssExtractPlugin.loader,
            'css-loader',
            'sass-loader'
          ],
        },
        {
          test: /\.(png|jpe?g|gif|svg)$/,
          use: 
          [
              {
                  loader: 'file-loader',
                  options: {
                      publicPath: './src/img',
                      outputPath: 'img',
                      name: '[name].[ext]'
                  },
              },
              {
                  loader: 'image-webpack-loader',
                  options: {
                      // This loader will be disabled when in development mode. (Images cannot be compressed and optimized)
                      disable: !isProduction,
                      mozjpeg: {
                          progressive: true,
                          quality: 70
                      },
                      optipng: {
                          enabled: true,
                      },
                      pngquant: {
                          quality: [0.7, 0.9],
                          speed: 4
                      },
                      gifsicle: {
                          interlaced: false,
                      },
                      webp: {
                          quality: 80
                      },
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
                publicPath: isProduction ? "./fonts/" : ""
              },
            },
          ],
        },
      ],
    },
    plugins: [
      new MiniCssExtractPlugin({
        filename: '[name].css',
        minify: true
      }),
      new HtmlWebpackPlugin({
        template: './src/index.html',
        minify: true
      }),
      new ImageminPlugin({
        test: /\.(jpe?g|png|gif|svg)$/i,
        disable: !isProduction, // Disable during development
        pngquant: {
          quality: "80-100"
        },
      }),
      new CopyPlugin({
        patterns: [
          {
            from: 'src/icons/**/*',
            to: 'icons/'
          }
        ],
      }),      
      new CleanWebpackPlugin()
    ],
    optimization: {
      minimizer: [
        new UglifyJsPlugin({
          cache: true,
          parallel: true,
          uglifyOptions: {
            keep_classnames: true,
            warnings: false
          },
        }),
        new OptimizeCSSAssetsPlugin({})
      ],
    },
    resolve: {
      extensions: ['.js', '.jsx', '.scss', '.gif', '.png', '.jpg', '.jpeg', '.svg']
    }    
  }
};
