const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const nodeExternals = require("webpack-node-externals");
const webpack = require("webpack");
const Dotenv = require("dotenv-webpack");

const config = {
  mode: "development",
  devtool: "eval-source-map",
};

const server = {
  ...config,
  resolve: {
    extensions: [".ts", ".tsx", ".js"],
  },
  entry: "./src/server/index.ts",
  target: "node",
  externals: [nodeExternals()],
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/,
        exclude: [path.resolve("node_modules")],
        use: ["ts-loader"],
      },
      { test: /\.(css|scss)$/, loader: "ignore-loader" },
    ],
  },
  output: {
    path: path.resolve("dist"),
    filename: "server.js",
  },
  plugins: [new Dotenv(), new webpack.HotModuleReplacementPlugin()],
};
const client = {
  ...config,
  resolve: {
    extensions: [".ts", ".tsx", ".js", ".css", ".scss"],
  },
  entry: "./src/client/index.tsx",
  target: "web",
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/,
        exclude: [path.resolve("node_modules")],
        use: ["ts-loader"],
      },
      {
        test: /\.(scss|sass|css)$/i,
        exclude: [path.resolve("node_modules")],
        use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"],
      },
    ],
  },
  plugins: [
    new Dotenv(),
    new webpack.HotModuleReplacementPlugin(),
    new MiniCssExtractPlugin({
      filename: "styles.css",
    }),
  ],
  output: {
    path: path.resolve("dist"),
    filename: "bundle.js",
  },
};

module.exports = [server, client];
