const path = require("path");
module.exports = {
  mode: "development",
  entry: "./src/index.js",
  resolve: {
    extensions: [".js"],
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        include: [path.resolve(__dirname, "src")],
        exclude: [path.resolve(__dirname, "node_modules")],
        use: ["babel-loader"],
      },
    ],
  },
  output: {
    path: __dirname + "/public",
    filename: "js/bundle.js",
  },
  devtool: "eval-source-map",
};
