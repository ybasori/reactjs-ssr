const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
module.exports = {
  mode: "development",
  entry: "./client/src/index.tsx",
  resolve: {
    extensions: [".ts", ".tsx", ".js", ".css", ".scss", ".sass"],
  },
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
    new MiniCssExtractPlugin({
      filename: "css/styles.css",
    }),
  ],
  output: {
    path: __dirname + "/public",
    filename: "js/bundle.js",
  },
  devtool: "eval-source-map",
};
