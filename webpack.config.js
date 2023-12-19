<<<<<<< HEAD
process.env.NODE_ENV = process.env.NODE_ENV || "development";
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebPackPlugin = require("html-webpack-plugin");
const path = require("path");

let config = {
  context: path.join(__dirname, "/src"), // Директория с исходным кодом приложения
  entry: "index.js", // Главный файл приложения
  output: {
    path: path.join(__dirname, "dist"), // Куда делать оброку
    filename: "[name].js", // Шаблон для названия файлов
=======
process.env.NODE_ENV = process.env.NODE_ENV || 'development';
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebPackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const path = require('path');

let config = {
  context: path.join(__dirname, '/src'), // Директория с исходным кодом приложения
  entry: 'index.js', // Главный файл приложения
  output: {
    path: path.join(__dirname, 'dist'), // Куда делать оброку
    filename: '[name].js', // Шаблон для названия файлов
>>>>>>> 7ce52deda52efb25705213c983ac6c6f511ec300
    clean: true, // Очистить ./dist перед сборкой
  },
  mode: process.env.NODE_ENV,
  resolve: {
<<<<<<< HEAD
    extensions: [".js", ".jsx"], // расширения по умолчанию если не указаны в import
    modules: ["./", "node_modules"], // Где искать файлы подключаемых модулей (пакетов)
=======
    extensions: ['.js', '.jsx'], // расширения по умолчанию если не указаны в import
    modules: ['./', 'node_modules'], // Где искать файлы подключаемых модулей (пакетов)
>>>>>>> 7ce52deda52efb25705213c983ac6c6f511ec300
  },
  module: {
    rules: [
      // Транспиляция JS/JSX
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
<<<<<<< HEAD
        use: [{ loader: "babel-loader" }],
=======
        use: [{loader: 'babel-loader'}],
>>>>>>> 7ce52deda52efb25705213c983ac6c6f511ec300
      },
      // Правила обработки подключаемых файлов
      {
        test: /\.css$/,
        use: [
<<<<<<< HEAD
          { loader: MiniCssExtractPlugin.loader, options: {} },
          { loader: "css-loader", options: { url: true, import: true } },
        ],
      },
    ],
=======
          {loader: MiniCssExtractPlugin.loader, options: {}},
          {loader: 'css-loader', options: {url: true, import: true}},
        ]
      },
    ]
>>>>>>> 7ce52deda52efb25705213c983ac6c6f511ec300
  },
  plugins: [
    new MiniCssExtractPlugin(), // Плагин для вытаскивания собранных стилей в отдельный файл
    new HtmlWebPackPlugin({
<<<<<<< HEAD
      template: "./index.html",
      filename: "./index.html",
      title: "Simple SPA",
      base: "/",
    }),
  ],
};

if (process.env.NODE_ENV === "development") {
  config.devtool = "inline-source-map";
  config.devServer = {
    static: path.join(__dirname, "dist"),
    port: 8010,
    historyApiFallback: true,
    proxy: {
      "/api/**": {
        target: "http://example.front.ylab.io",
        secure: false,
        changeOrigin: true,
      },
    },
=======
      template: './index.html',
      filename: './index.html',
      title: 'Simple SPA',
      base: '/',
    }),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(process.env.NODE_ENV),
      },
    }),
  ],
}

if (process.env.NODE_ENV === 'development') {
  config.devtool = 'inline-source-map';
  config.devServer = {
    static: path.join(__dirname, 'dist'),
    port: 8010,
    historyApiFallback: true,
    proxy: {
      '/api/**': {
        target: 'http://example.front.ylab.io',
        secure: false,
        changeOrigin: true,
      }
    }
>>>>>>> 7ce52deda52efb25705213c983ac6c6f511ec300
  };
}

module.exports = config;
