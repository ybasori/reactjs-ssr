const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
let nodeExternals = require("webpack-node-externals");
const webpack = require("webpack");

let config = {
  mode: "development",
  devtool: "eval-source-map",
  plugins: [new webpack.HotModuleReplacementPlugin()],

  resolve: {
    extensions: [".tsx", ".ts", ".js", ".css", ".scss", ".sass"],
    modules: ["node_modules"],
  },
};

const client = {
  ...config,
  entry: "./client/src/index.tsx",
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/,
        include: [path.resolve(__dirname, "client/src")],
        exclude: [
          path.resolve(__dirname, "node_modules"),
          path.resolve(__dirname, "server"),
        ],
        use: ["ts-loader"],
      },
      {
        include: [path.resolve(__dirname, "client/src")],
        exclude: [
          path.resolve(__dirname, "node_modules"),
          path.resolve(__dirname, "server"),
        ],
        test: /\.s[ac]ss$/i,
        use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"],
      },
    ],
  },
  plugins: [
    ...config.plugins,
    new MiniCssExtractPlugin({
      filename: "css/styles.css",
    }),
  ],
  output: {
    path: __dirname + "/public",
    filename: "js/bundle.js",
  },
};

const server = {
  ...config,
  entry: "./server/src/index.tsx",
  target: "node",
  externals: [nodeExternals()],
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/,
        include: [path.resolve(__dirname, "server/src")],
        exclude: [path.resolve(__dirname, "node_modules")],
        use: ["ts-loader"],
      },
    ],
  },
  output: {
    path: __dirname + "/dist",
    filename: "js/server.js",
  },
};

module.exports = [client, server];
