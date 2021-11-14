const path = require('path');
const NodePolyfillPlugin = require("node-polyfill-webpack-plugin")
const MiniCssExtractPlugin = require("mini-css-extract-plugin");  
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: 'development',
  entry: {
    'bundle': './index.jsx',
    'bundle.min': '/index.jsx'
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: "[name].js",
    clean: true,
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(__dirname, 'public', 'index.html' ),
      filename: 'index.html',
      title: 'Webpack Development'
    }),
    new MiniCssExtractPlugin(),
    new NodePolyfillPlugin(),
  ],
  devtool: 'inline-source-map',
  devServer: {
    host: '0.0.0.0',
    port: 3000,
    open: true,
    hot: true,
    proxy: {
      '/access': {
        target: 'http://localhost:8080',
      },
      '/token': {
        target: 'http://localhost:8080',
      }
    },
  },
  module: {
    rules: [
      // {
      //   test: /\bjson\b/,
      //   loader: 'json-loader',
      //   exclude: /node_modules/,
      // },
      {
        test: /\.(js|ts)x?$/,
        use: 'babel-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, "css-loader"],
      },
      {
        test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
              outputPath: 'fonts/'
            }
          }
        ]
      },
      {
        test: /\.(pdf|gif|png|jpe?g|svg)$/,
        use: 'file-loader?name=[path][name].[ext]',
      },
      
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js', '.jsx'],
  },
  
};