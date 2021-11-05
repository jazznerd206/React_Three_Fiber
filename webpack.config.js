const path = require('path');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");  
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: {
    'bundle': './index.jsx',
    'bundle.min': '/index.jsx'
  },
  devtool: 'inline-source-map',
  mode: 'development',
  devServer: {
    host: '0.0.0.0',
    port: 3000,
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
      }
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js', '.jsx'],
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: "[name].js"
  },
  plugins: [
    new HtmlWebpackPlugin({ template: path.join(__dirname, 'public', 'index.html' )}),
    new MiniCssExtractPlugin()
  ]
};